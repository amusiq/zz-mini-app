import Taro from '@tarojs/taro'
import {config , api} from '@/constants';

const CODE_SUCCESS = 0
const CODE_AUTH_EXPIRED = '600'

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
  ])
}

function showLoadingFun () {
    if (this.showLoading || this.loadingInter) return;
    this.loadingInter = setTimeout( ()=> {
        if (!this.showLoading) {
            Taro.hideLoading();
            Taro.showLoading();
            this.showLoading = true;
            this.request_time = new Date().getTime();
            const j = this.request_time;
            if (!this.longTimeLoadingInter) {
                this.longTimeLoadingInter = setTimeout(()=> {
                    if (this.request_time == j) {
                        Taro.hideLoading();
                        this.longTimeLoadingInter = null;
                    } 
                }, 5000);
            }
        }
        this.loadingInter = null
    }, 1000);
}

function hideLoadingFun () {
    if (this.showLoading) {
        Taro.hideLoading();
        this.showLoading = false;
    }
    if (this.longTimeLoadingInter) {
        clearInterval(this.longTimeLoadingInter);
        this.longTimeLoadingInter = null;
    }
    if (this.loadingInter) {
        clearInterval(this.loadingInter);
        this.loadingInter = null;
    }
}

async function httpPost (url, data = {}, header = {}) {
    if (!header['content-type']) {
        header['content-type'] = 'application/x-www-form-urlencoded'
    }
    header['language'] = await config.language;
    header['platform'] = config.platformName;
    this.showLoadingFun();
    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'POST',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun();
        if (res.statusCode === 200) {
            return { code: 0, data: res.data }
        } else {
            console.log(data)
            console.log(res.data)
            return Taro.showToast({
                icon: 'none',
                title: res.data.message + ''
            }).then(() => {
                return res.data
            })
        }
    })
}

async function httpGet (url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun()
    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'GET',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun()
        if (res.statusCode == 200) {
            console.log(typeof res.statusCode,'res.statusCode TYPe')
            return { code: 0, data: res.data }
        } else {
            console.log(data)
            console.log(res.data)
            console.log(res)
            return Taro.showToast({
                icon: 'none',
                title: res.data.message || '服务器异常'
            }).then(() => {
                return res.data
            })
        }
    })
}

async function loginHttpGet (url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun()
    const loginInfo = Taro.getStorageSync('loginInfo')
    if (!loginInfo['authToken']) {
        header['authToken'] = data['authToken'] = ''
    } else {
        header['authToken'] = data['authToken'] = loginInfo['authToken']
    }

    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'GET',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun()
        if (res.statusCode == 200) {
            return { code: 0, data: res.data }
        } else {
            if (res.data.code == '3000017' || res.data.code == '3000025' || res.statusCode == '400') {
                return this.notLogin().then(res => {
                    if (res) {
                        return this.loginHttpGet(url, data, header)
                    } else {
                        return false
                    }
                })
            } else if (res.data.code == '3000040') {
                return Taro.showModal({
                    title: '提示',
                    content: res.data.message,
                    confirmText: '确定',
                    confirmColor: '#006d82'
                })
            } else {
                return Taro.showToast({
                    icon: 'none',
                    title: res.data.message || '服务器异常'
                }).then(() => {
                    return res.data
                })
            }
        }
    })
}

async function loginHttpPut (url, data = {}, header = {}, isNeedTokenInBody = true) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun()
    const loginInfo = Taro.getStorageSync('loginInfo')
    if (!loginInfo['authToken']) {
        header['authToken'] = data['authToken'] = ''
    } else {
        if (isNeedTokenInBody) {
            header['authToken'] = data['authToken'] = loginInfo['authToken']
        } else {
            header['authToken'] = loginInfo['authToken']
        }
    }
    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'PUT',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun()
        if (res.statusCode == 200) {
            return { code: 0, data: res.data }
        } else {
            console.log(data)
            console.log(res.data)
            if (res.data.code == '3000017' || res.data.code == '3000025') {
                return this.notLogin().then(res => {
                    if (res) {
                        return this.loginHttpPut(url, data, header)
                    } else {
                        return false
                    }
                })
            } else {
                return Taro.showToast({
                    icon: 'none',
                    title: res.data.message + ''
                }).then(() => {
                    return res.data
                })
            }

        }
    })
}

async function loginHttpPost (url, data = {}, header = {}, isNeedTokenInBody = true) {
    header = await this.getRequestHeader(header);
    if (!header['content-type']) {
        header['content-type'] = 'application/x-www-form-urlencoded'
    }
    this.showLoadingFun()
    const loginInfo = Taro.getStorageSync('loginInfo')
    if (!loginInfo['authToken']) {
        // 领券&feedback接口单独处理
        // return this.notLogin(url.indexOf('activities/group') != -1 || url.indexOf('feedback') != -1 ? 'activeGetTicket' : undefined).then(res => {
        //     if (res) {
        //         return this.loginHttpPost(url, data, header);
        //     } else {
        //         return false;
        //     }
        // });
        header['authToken'] = data['authToken'] = ''
    } else {
        if (isNeedTokenInBody) {
            header['authToken'] = data['authToken'] = loginInfo['authToken']
        } else {
            header['authToken'] = loginInfo['authToken']
        }
    }

    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'POST',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun()
        if (res.statusCode == 200) {
            return { code: 0, data: res.data }
        } else {
            if (res.data.code == '3000017' || res.data.code == '3000025') {
                return this.notLogin(url.indexOf('activities/group') != -1 || url.indexOf('feedback') != -1 ? 'activeGetTicket' : undefined).then(res => {
                    if (res) {
                        return this.loginHttpPost(url, data, header)
                    } else {
                        return false
                    }
                })
            } else if (res.data.code == '3000040') {
                Taro.hideLoading()
                return res.data
            } else {
                return Taro.showToast({
                    icon: 'none',
                    title: res.data.message + ''
                }).then(() => {
                    return res.data
                })
            }
        }
    })
}

async function loginHttpDelete (url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun()
    const loginInfo = Taro.getStorageSync('loginInfo')
    if (!loginInfo['authToken']) {
        header['authToken'] = ''
    } else {
        header['authToken'] = loginInfo['authToken']
        url += '?authToken=' + loginInfo['authToken']
    }
    return Taro.request({
        url: url,
        data: data,
        header: header,
        method: 'DELETE',
        dataType: 'json',
    }).then(res => {
        this.hideLoadingFun()
        if (res.statusCode == 200) {
            return { code: 0, data: res.data }
        } else {
            console.log(data)
            console.log(res.data)
            if (res.data.code == '3000017' || res.data.code == '3000025') {
                return this.notLogin().then(res => {
                    if (res) {
                        return this.loginHttpDelete(url, data, header)
                    } else {
                        return false
                    }
                })
            } else {
                return Taro.showToast({
                    icon: 'none',
                    title: res.data.message + ''
                }).then(() => {
                    return res.data
                })
            }

        }
    })
}

async function loginUpload (filePath, url, name, header = {}) {
    header = await this.getRequestHeader(header);
    return Taro.uploadFile({
        url: url,
        filePath: filePath,
        header: header,
        name: name
    }).then(res => {
        if (res.statusCode == 200) {
            return { code: 0, data: res.data }
        } else {
            console.log(data)
            console.log(res.data)
            return Taro.showToast({
                icon: 'none',
                title: res.data.message + ''
            }).then(() => {
                return res.data
            })
        }
    })
}

async function notLogin() {
    // 每一个接口尝试静默自动登录四次，防止后台authToken错误，导致前端无限循环自动登录。
    this.loginNumber++;
    if(this.loginNumber === 5) {
        this.loginNumber = 0;
        return false;
    }

    const autoLoginRes = await userAutoLogin.autoLogin();
    if(autoLoginRes.code === 0) {
        if(autoLoginRes.data) {
            // 用户存在，记得放开
            return autoLoginRes;
        } else {
            // 用户不存在，去授权注册，记得放开
            Taro.navigateTo({
                url: '/pages/authorize'
            })
        }
    } else {
        throw new Error(`鉴权失败-自动登录失败${autoLoginRes}-${new Date.getTime()}`);
    }
}

async function getRequestHeader(header){
    const language = await config.getLanguage();
    const newHeader = {
        ...header,
        platform: AppConfig.app,
        app: AppConfig.app,
        client: AppConfig.client,
        clientVersion: AppConfig.clientVersion,
        language: language
    }
    return newHeader;
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const token = await getStorage('token')
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

//   return Taro.request({
//     url,
//     method,
//     data: payload,
//     header
//   }).then(async (res) => {
//     const { code, data } = res.data
//     if (code !== CODE_SUCCESS) {
//       if (code === CODE_AUTH_EXPIRED) {
//         await updateStorage({})
//       }
//       return Promise.reject(res.data)
//     }

//     if (url === API_USER_LOGIN) {
//       await updateStorage(data)
//     }

//     // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
//     if (url === API_USER) {
//       const uid = await getStorage('uid')
//       return { ...data, uid }
//     }

//     return data
//   }).catch((err) => {
//     const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
//     if (showToast) {
//       Taro.showToast({
//         title: err && err.errorMsg || defaultMsg,
//         icon: 'none'
//       })
//     }

//     if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
//       Taro.navigateTo({
//         url: '/pages/user-login/user-login'
//       })
//     }

//     return Promise.reject({ message: defaultMsg, ...err })
//   })
}
