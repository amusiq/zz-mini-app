import Taro from "@tarojs/taro";
import { api, config, language } from "@/constants";
import request from "@/utils/request";
import locationTool from "@/tools";

export default {
  getDistinctMedicalCity() {
    console.log("公用方法");
    const tempPromise = new Promise((resolve, reject) => {
      let cityList = [];
      // 新版定位逻辑修改
      const cityInfo = Taro.getStorageSync("cityInfo");
      if (cityInfo && cityInfo.value) {
        const cityId = cityInfo.value;
        let cityPickerIndex;
        request.httpGet({ url: api.API_CITIES, data: {} }).then(res => {
          if (res.code === 0) {
            const cityListTemp = res.data.map(item => {
              return {
                value: item.id,
                text: item.name,
                specialDepartmentDesc: item.specialDepartmentDesc,
                packageUrl: item.packageUrl
              };
            });
            cityPickerIndex = locationTool.getCityIndex(cityId, cityListTemp);
            cityList = res.data;
            resolve(cityList[cityPickerIndex]);
          } else {
            reject(res.message);
          }
        });
      } else {
        this._getDistinctMedicalCityByGeoCoder()
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      }
    });
    return tempPromise;
  },
  _getDistinctMedicalCityByGeoCoder() {
    let cityId = 0;
    const tempPromise = new Promise((resolve, reject) => {
      this._getLocationByGeoCoder()
        .then(locationDetail => {
          const nearCity = locationDetail.currentCity;
          cityId = nearCity.id;
          return request.httpGet(config.getApi("cities"));
        })
        .then(res => {
          if (res.code === 0) {
            let cityPickerIndex = "";
            for (const i in res.data) {
              if (res.data[i].id === cityId) {
                cityPickerIndex = i;
              }
            }
            Taro.setStorage({
              key: "cityPickerIndex",
              data: cityPickerIndex
            });
            resolve(res.data[cityPickerIndex]);
          } else {
            reject(res.message);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
    return tempPromise;
  },
  _getLocationByGeoCoder() {
    const tempPromise = new Promise((resolve, reject) => {
      Taro.getLocation({
        type: "wgs84"
      })
        .then(getRes => {
          const latitude = getRes.latitude;
          const longitude = getRes.longitude;
          return request.httpGet(config.getApi("get_location_by_geo_coder"), {
            latitude: latitude,
            longitude: longitude
          });
        })
        .then(locationRes => {
          console.log("定位完整信息", locationRes);
          if (locationRes.code === 0) {
            resolve(locationRes.data);
          } else {
            reject(locationRes.message);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
    return tempPromise;
  },
  // 处理400或者诊所电话不在服务期的情况
  async _handleHotLineServiceTime(phoneNumber, lanua) {
    const isDuringServiceTime = await this._isDuringServiceTime();
    if (isDuringServiceTime === "error") {
      return;
    }
    if (isDuringServiceTime) {
      Taro.makePhoneCall({
        phoneNumber: phoneNumber
      });
    } else {
      Taro.showToast({
        duration: 3000,
        title: language.peopleMtext["service_out_time"][lanua],
        icon: "none"
      });
    }
  },
  // 处理线上客服点击小程序卡片跳转的问题
  handleWXContactPath(e) {
    const { path, query } = e.detail;
    let params = "";
    if (path) {
      for (const key in query) {
        params = key + "=" + query[key] + "&";
      }
      params = params.slice(0, params.length - 1);
      Taro.navigateTo({
        url: path + "?" + params
      });
    }
  },
  async _isDuringServiceTime() {
    try {
      const serviceResult = await request.httpGet({
        url: api.API_CUSTOMER_SERVICES
      });
      if (serviceResult.code === 0) {
        return serviceResult.data.workStatus === "online";
      } else {
        Taro.showToast({
          title: "请稍后重试",
          icon: "none"
        });
        return "error";
      }
    } catch (e) {
      Taro.showToast({
        title: "请稍后重试",
        icon: "none"
      });
      return "error";
    }
  },
  _getSeviceTime() {
    return new Promise((resolve, reject) => {
      request.httpGet({ url: api.API_GET_TIME }).then(res => {
        console.log(res);
        if (res.code === 0) {
          resolve(res.data);
        } else {
          throw res;
          //   reject("isGetServiceTimeError");
        }
      });
    });
  },
  // 版本号比较，兼容低版本
  _compareVersion(v1, v2) {
    v1 = v1.split(".");
    v2 = v2.split(".");
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push("0");
    }
    while (v2.length < len) {
      v2.push("0");
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  },
  // 是否为高版本
  _isUpperVersion(v1, v2) {
    return this._compareVersion(v1, v2) >= 0;
  },

  // 获取用户咨询的配置信息
  _getConsultConfigInfo() {
    return new Promise((resolve, reject) => {
      request.loginHttpGet(config.getApi("user_setting")).then(res => {
        console.log(res);
        if (res.code === 0) {
          resolve(res.data);
        } else {
          throw res;
          //   reject("isgetConsultConfigInfoError");
        }
      });
    });
  },
  // 分销码
  /* 将分销码切割为业务参数和分销码参数
   * params:   scene    页面传入的场景值
   * */
  codeSplitHandle(scene) {
    const sceneParamsArray = scene.split("_");
    const businessParam = [...sceneParamsArray];
    businessParam.pop();
    return {
      channelCode: sceneParamsArray[sceneParamsArray.length - 1].trim(),
      businessParam: businessParam
    };
  },
  // 绑定分销码
  _bindPromoteChannelCode(promoteCode) {
    return new Promise((resolve, reject) => {
      Taro.login()
        .then(res => {
          const params = {
            code: res.code,
            platform: config.platform_name,
            promoteCode: promoteCode
          };
          return request.loginHttpPost(
            config.getApi("bind_promote_channel_code"),
            params
          );
        })
        .then(res => {
          if (res.code === 0) {
            resolve(res.data);
          } else {
            reject(new Error("绑定失败"));
          }
        })
        .catch(e => {
          reject(new Error("绑定失败"));
        });
    });
  },
  // 绑定分销码(带重试)
  retryBindingPromoteChannelCode(promoteCode, retryCount = 3) {
    return new Promise((resolve, reject) => {
      this._bindPromoteChannelCode(promoteCode)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          if (retryCount) {
            --retryCount;
            this.retryBindingPromoteChannelCode(promoteCode, retryCount);
          } else {
            reject(new Error("绑定失败"));
          }
        });
    });
  },
  // 处理用户的年龄
  handleCardHolderAge(ageStr) {
    const cardHolderAge = ageStr.indexOf("岁") !== -1 ? parseInt(ageStr) : 0;
    return cardHolderAge;
  },

  // 获取用户信息
  getMemberInfo(id, isRequireMedicalBackground = 0) {
    return new Promise((resolve, reject) => {
      // 调用家庭成员接口
      request
        .loginHttpGet(config.getApi("family-members", "/" + id), {
          isRequireMedicalBackground: isRequireMedicalBackground
        })
        .then(res => {
          if (res.code === 0) {
            resolve(res.data);
          } else {
            reject("获取用户信息失败");
            Taro.showToast({
              mask: true,
              duration: 2000,
              title: res.message + "",
              icon: "none"
            });
          }
        })
        .catch(err => {
          reject("获取用户信息失败");
          Taro.showToast({
            mask: true,
            duration: 2000,
            title: "获取用户信息失败",
            icon: "none"
          });
        });
    });
  },
  /**
   * url：图片网络路径
   * content：弹窗描述
   * confirmText：按钮文案
   */
  async saveImageToPhotosAlbum(url, content, confirmText) {
    Taro.authorize({ scope: "scope.writePhotosAlbum" })
      .then(res => {
        Taro.showLoading({ title: "下载中...", mask: true });
        Taro.downloadFile({ url: url })
          .then(res => {
            Taro.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
              .then(res => {
                Taro.hideLoading();
                Taro.showModal({
                  title: "保存成功",
                  content:
                    content || "在微信扫一扫右上角进入相册，选择该图，即可关注",
                  showCancel: false,
                  confirmText: confirmText || "确认",
                  confirmColor: "#006d82"
                });
              })
              .catch(err => {
                Taro.hideLoading();
                Taro.showToast({
                  title: "保存失败,请重试",
                  duration: 2000,
                  mask: false,
                  icon: "none"
                });
              });
          })
          .catch(err => {
            Taro.hideLoading();
            Taro.showToast({
              title: "保存失败,请重试",
              duration: 2000,
              mask: false,
              icon: "none"
            });
          });
      })
      .catch(err => {
        Taro.showModal({
          title: "温馨提示",
          content: "若不打开授权，则无法将图片保存在相册中！",
          showCancel: true,
          cancelText: "暂不授权",
          cancelColor: "#666",
          confirmText: "去授权",
          confirmColor: "#006d82",
          success: res => {
            if (res.confirm) {
              Taro.openSetting().then(res => {
                if (
                  res.authSetting &&
                  res.authSetting["scope.writePhotosAlbum"]
                ) {
                  Taro.showToast({
                    title: "您已授权，赶紧将图片保存在相册中吧！",
                    icon: "none"
                  });
                }
              });
            }
          }
        });
      });
  },
  /**
   * des：防止点击事件快速重复点击，2秒内
   * return：true（可以点击） false（不可点击）
   */
  currentSeconds: 0,
  onClickEnable() {
    const date = new Date();
    const timeStamp = date.getTime();
    if (timeStamp - this.currentSeconds > 2000) {
      this.currentSeconds = timeStamp;
      return true;
    } else {
      return false;
    }
  },
  // 判断是否登录
  isLogin() {
    const loginInfo = Taro.getStorageSync("loginInfo");
    const isLogin = !!loginInfo["authToken"] || false;
    return isLogin;
  }
};
