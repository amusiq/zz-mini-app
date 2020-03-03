import Taro from "@tarojs/taro";
import { config, appConfig } from "@/constants";
import userAutoLogin from "@/utils/userAutoLogin";

class Request {
  CODE_SUCCESS = 0;
  CODE_AUTH_EXPIRED = "600";
  loginNumber = 0; // 尝试登录的次数
  showLoading = false;
  loadingInter;
  longTimeLoadingInter;

  showLoadingFun() {
    if (this.showLoading || this.loadingInter) return;
    this.loadingInter = setTimeout(() => {
      if (!this.showLoading) {
        Taro.hideLoading();
        Taro.showLoading();
        this.showLoading = true;
        const requestTime = new Date().getTime();
        const j = requestTime;
        if (!this.longTimeLoadingInter) {
          this.longTimeLoadingInter = setTimeout(() => {
            if (requestTime === j) {
              Taro.hideLoading();
              this.longTimeLoadingInter = null;
            }
          }, 5000);
        }
      }
      this.loadingInter = null;
    }, 1000);
  }

  hideLoadingFun() {
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

  async httpPost(url, data = {}, header = {}) {
    if (!header["content-type"]) {
      header["content-type"] = "application/x-www-form-urlencoded";
    }
    header["language"] = await config.language;
    header["platform"] = config.platformName;
    this.showLoadingFun();
    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "POST",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode === 200) {
        return { code: 0, data: res.data };
      } else {
        console.log(data);
        console.log(res.data);
        return Taro.showToast({
          icon: "none",
          title: res.data.message + ""
        }).then(() => {
          return res.data;
        });
      }
    });
  }

  async httpGet(url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun();
    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "GET",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode == 200) {
        return { code: 0, data: res.data };
      } else {
        console.log(data);
        console.log(res.data);
        console.log(res);
        return Taro.showToast({
          icon: "none",
          title: res.data.message || "服务器异常"
        }).then(() => {
          return res.data;
        });
      }
    });
  }

  async loginHttpGet(url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun();
    const loginInfo = Taro.getStorageSync("loginInfo");
    if (!loginInfo["authToken"]) {
      header["authToken"] = data["authToken"] = "";
    } else {
      header["authToken"] = data["authToken"] = loginInfo["authToken"];
    }

    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "GET",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode === 200) {
        return { code: 0, data: res.data };
      } else {
        if (
          res.data.code == "3000017" ||
          res.data.code == "3000025" ||
          res.statusCode === 400
        ) {
          return this.notLogin().then(notLoginRes => {
            if (notLoginRes) {
              return this.loginHttpGet(url, data, header);
            } else {
              return false;
            }
          });
        } else if (res.data.code == "3000040") {
          return Taro.showModal({
            title: "提示",
            content: res.data.message,
            confirmText: "确定",
            confirmColor: "#006d82"
          });
        } else {
          return Taro.showToast({
            icon: "none",
            title: res.data.message || "服务器异常"
          }).then(() => {
            return res.data;
          });
        }
      }
    });
  }

  async loginHttpPut(url, data = {}, header = {}, isNeedTokenInBody = true) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun();
    const loginInfo = Taro.getStorageSync("loginInfo");
    if (!loginInfo["authToken"]) {
      header["authToken"] = data["authToken"] = "";
    } else {
      if (isNeedTokenInBody) {
        header["authToken"] = data["authToken"] = loginInfo["authToken"];
      } else {
        header["authToken"] = loginInfo["authToken"];
      }
    }
    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "PUT",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode === 200) {
        return { code: 0, data: res.data };
      } else {
        console.log(data);
        console.log(res.data);
        if (res.data.code == "3000017" || res.data.code == "3000025") {
          return this.notLogin().then(notLoginRes => {
            if (notLoginRes) {
              return this.loginHttpPut(url, data, header);
            } else {
              return false;
            }
          });
        } else {
          return Taro.showToast({
            icon: "none",
            title: res.data.message + ""
          }).then(() => {
            return res.data;
          });
        }
      }
    });
  }

  async loginHttpPost(url, data = {}, header = {}, isNeedTokenInBody = true) {
    header = await this.getRequestHeader(header);
    if (!header["content-type"]) {
      header["content-type"] = "application/x-www-form-urlencoded";
    }
    this.showLoadingFun();
    const loginInfo = Taro.getStorageSync("loginInfo");
    if (!loginInfo["authToken"]) {
      // 领券&feedback接口单独处理
      // return this.notLogin(url.indexOf('activities/group') != -1 || url.indexOf('feedback') != -1 ? 'activeGetTicket' : undefined).then(res => {
      //     if (res) {
      //         return this.loginHttpPost(url, data, header);
      //     } else {
      //         return false;
      //     }
      // });
      header["authToken"] = data["authToken"] = "";
    } else {
      if (isNeedTokenInBody) {
        header["authToken"] = data["authToken"] = loginInfo["authToken"];
      } else {
        header["authToken"] = loginInfo["authToken"];
      }
    }

    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "POST",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode == 200) {
        return { code: 0, data: res.data };
      } else {
        if (res.data.code == "3000017" || res.data.code == "3000025") {
          return this.notLogin(
            url.indexOf("activities/group") !== -1 ||
              url.indexOf("feedback") !== -1
              ? "activeGetTicket"
              : undefined
          ).then(notLoginRes => {
            if (notLoginRes) {
              return this.loginHttpPost(url, data, header);
            } else {
              return false;
            }
          });
        } else if (res.data.code == "3000040") {
          Taro.hideLoading();
          return res.data;
        } else {
          return Taro.showToast({
            icon: "none",
            title: res.data.message + ""
          }).then(() => {
            return res.data;
          });
        }
      }
    });
  }

  async loginHttpDelete(url, data = {}, header = {}) {
    header = await this.getRequestHeader(header);
    this.showLoadingFun();
    const loginInfo = Taro.getStorageSync("loginInfo");
    if (!loginInfo["authToken"]) {
      header["authToken"] = "";
    } else {
      header["authToken"] = loginInfo["authToken"];
      url += "?authToken=" + loginInfo["authToken"];
    }
    return Taro.request({
      url: url,
      data: data,
      header: header,
      method: "DELETE",
      dataType: "json"
    }).then(res => {
      this.hideLoadingFun();
      if (res.statusCode == 200) {
        return { code: 0, data: res.data };
      } else {
        console.log(data);
        console.log(res.data);
        if (res.data.code == "3000017" || res.data.code == "3000025") {
          return this.notLogin().then(notLoginRes => {
            if (notLoginRes) {
              return this.loginHttpDelete(url, data, header);
            } else {
              return false;
            }
          });
        } else {
          return Taro.showToast({
            icon: "none",
            title: res.data.message + ""
          }).then(() => {
            return res.data;
          });
        }
      }
    });
  }

  async loginUpload(filePath, url, name, header = {}) {
    header = await this.getRequestHeader(header);
    return Taro.uploadFile({
      url: url,
      filePath: filePath,
      header: header,
      name: name
    }).then(res => {
      if (res.statusCode === 200) {
        return { code: 0, data: res.data };
      } else {
        console.log(res.data);
        return Taro.showToast({
          icon: "none",
          title: res.data.message + ""
        }).then(() => {
          return res.data;
        });
      }
    });
  }

  async notLogin() {
    // 每一个接口尝试静默自动登录四次，防止后台authToken错误，导致前端无限循环自动登录。
    this.loginNumber++;
    if (this.loginNumber === 5) {
      this.loginNumber = 0;
      return false;
    }
    const autoLoginRes = await userAutoLogin.autoLogin();
    if (autoLoginRes.code === 0) {
      if (autoLoginRes.data) {
        // 用户存在，记得放开
        return autoLoginRes;
      } else {
        // 用户不存在，去授权注册，记得放开
        Taro.navigateTo({
          url: "/pages/authorize"
        });
      }
    } else {
      throw new Error(
        `鉴权失败-自动登录失败${autoLoginRes}-${new Date().getTime()}`
      );
    }
  }

  async getRequestHeader(header) {
    const language = await config.getLanguage();
    const newHeader = {
      ...header,
      platform: appConfig.app,
      app: appConfig.app,
      client: appConfig.client,
      clientVersion: appConfig.clientVersion,
      language: language
    };
    return newHeader;
  }
}

const request = new Request();
export default request;
