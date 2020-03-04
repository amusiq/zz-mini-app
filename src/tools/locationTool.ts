import Taro from "@tarojs/taro";
import { api, config } from "@/constants";
import request from "@/utils/request";

export default {
  /**
   * 默认城市
   */
  defaultCity: {
    cityId: 1,
    cityName: "深圳"
  },
  /**
   * 获取位置定位
   */
  getLocation(callBack) {
    Taro.getLocation({
      type: "wgs84"
    })
      .then(locationRes => {
        Taro.setStorageSync("location", locationRes);
        callBack && callBack(locationRes);
      })
      .catch(() => {
        Taro.showModal({
          title: "温馨提示",
          content: "若不打开授权，将无法获取定位信息",
          showCancel: true,
          cancelText: "暂不授权",
          cancelColor: "#666",
          confirmText: "去授权",
          confirmColor: "#006d82"
        }).then(res => {
          if (res.confirm) {
            Taro.openSetting().then(settingRes => {
              if (
                settingRes.authSetting &&
                settingRes.authSetting["scope.userLocation"]
              ) {
                this.getLocation(callBack);
              } else {
                callBack && callBack();
              }
            });
          } else {
            callBack && callBack();
          }
        });
      });
  },

  // 获取当前当前城市定位
  async getCurrentCityInfo(locationRes, cityList, callBack) {
    console.log("城市定位结果", locationRes);
    if (locationRes) {
      let cityId = ""; // 实时定位城市id
      let cityName = ""; // 实时定位城市名称
      const selectCityTime = Taro.getStorageSync("selectCityTimeV2");
      let needLocation = false;
      if (selectCityTime < new Date().getTime() - 86400000) {
        // 86400000
        needLocation = true;
      }
      if (needLocation && locationRes) {
        const { latitude, longitude } = locationRes;
        const requestBody = { latitude, longitude };
        const nearCityRes = await request.httpGet({
          url: api.API_GET_BY_GEO_CODER,
          data: requestBody
        });
        if (nearCityRes.code === 0) {
          const cityData = nearCityRes.data;
          cityId = cityData.id;
          cityName = cityData.name;
          let cityInfo = Taro.getStorageSync("cityInfo");
          if (cityInfo && cityId && cityId != cityInfo.value) {
            const language = config.language;
            const confirmRes = await Taro.showModal({
              title: "提示",
              content:
                language === "CN"
                  ? "系统定位你在" + cityName + "，是否切换到" + cityName
                  : "Would you like to be switched to your current city based on auto-locate?",
              confirmText: "切换",
              cancelText: "取消",
              confirmColor: "#006d82"
            });
            if (confirmRes.confirm) {
              cityInfo = this.getCityItem(cityId, cityList);
              Taro.setStorageSync("cityInfo", cityInfo);
            }
            // 确认回调
            callBack &&
              callBack({ cityId: cityInfo.value, cityName: cityInfo.text });
          } else {
            this.renderLocation(cityId, cityList, callBack);
          }
          Taro.setStorageSync("selectCityTimeV2", new Date().getTime());
        } else {
          this.renderLocation(this.defaultCity.cityId, cityList, callBack);
        }
      } else {
        this.renderLocation(this.defaultCity.cityId, cityList, callBack);
      }
    } else {
      this.renderLocation(this.defaultCity.cityId, cityList, callBack);
    }
  },

  // 异常处理：定位失败，拒绝定位授权、接口请求异常
  renderLocation(cityId, cityList, callBack) {
    let cityInfo = Taro.getStorageSync("cityInfo");
    if (!cityInfo || !cityInfo.value) {
      cityInfo = this.getCityItem(cityId, cityList);
      Taro.setStorageSync("cityInfo", cityInfo);
    }
    callBack && callBack({ cityId: cityInfo.value, cityName: cityInfo.text });
  },

  /**
   * 通过城市id，遍历城市列表，获取item
   */
  getCityItem(cityId, cityList) {
    for (let i = 0; i < cityList.length; i++) {
      if (cityId === cityList[i].value) {
        return cityList[i];
      }
    }
  },

  /**
   * 获取城市列表
   */
  async getCityList() {
    const cityListRes = await request.httpGet({
      url: api.API_CITIES,
      data: {}
    });
    let cityList = [];
    const data = cityListRes.data || [];
    if (cityListRes.code === 0) {
      cityList = data.map(item => {
        return {
          value: item.id,
          text: item.name,
          specialDepartmentDesc: item.specialDepartmentDesc,
          packageUrl: item.packageUrl
        };
      });
    }
    return cityList;
  },

  // 获取当前城市初始化函数
  async getCurrentCity(cityList = []) {
    this.getLocation(res => {
      this.getCurrentCityInfo(res, cityList);
    });
  }
};
