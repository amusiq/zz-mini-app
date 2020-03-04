import Taro from "@tarojs/taro";
import { config } from "@/constants";
import request from "@/utils/request";
import language from "../language";

export default {
  mtext: language.index,
  /**
   * 默认城市
   */
  defaultCity: {
    cityId: 1,
    cityName: "深圳"
  },
  /**
   * 位置定位相关
   */
  getLocation(callBack) {
    Taro.getLocation({
      type: "wgs84" //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于Taro.openLocation的坐标,
    })
      .then(res => {
        console.log("成功获取定位信息", res);
        if (callBack && typeof callBack === "function") {
          callBack(res);
        }
      })
      .catch(err => {
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
            Taro.openSetting().then(res => {
              if (res.authSetting && res.authSetting["scope.userLocation"]) {
                this.getLocation(callBack);
              } else {
                if (callBack && typeof callBack === "function") {
                  callBack();
                }
              }
            });
          } else {
            if (callBack && typeof callBack === "function") {
              callBack();
            }
          }
        });
      });
  },
  /**
   * 通过城市id，遍历城市列表，获取item
   */
  getCityItem(cityId, cityList) {
    for (let i = 0; i < cityList.length; i++) {
      if (cityId == cityList[i].value) {
        return cityList[i];
      }
    }
  },
  /**
   * 通过城市id，遍历城市列表，获取下标
   */
  getCityIndex(cityId, cityList) {
    for (let i = 0; i < cityList.length; i++) {
      if (cityId == cityList[i].value) {
        return i;
      }
    }
    return 0;
  },

  // 获取当前当前城市定位
  async getCurrentCityData(locationRes, cityList, callBack) {
    console.log("城市定位结果", locationRes);
    if (locationRes) {
      let city_id = ""; // 实时定位城市id
      let city_name = ""; // 实时定位城市名称
      const selectCityTime = Taro.getStorageSync("selectCityTimeV2");
      let needLocation = false;
      if (selectCityTime < new Date().getTime() - 86400000) {
        // 86400000
        needLocation = true;
      }
      if (needLocation && locationRes) {
        const latitude = locationRes.latitude;
        const longitude = locationRes.longitude;
        const requestBody = { latitude: latitude, longitude: longitude };
        const near_citys_res = await request.httpGet(
          config.getApi("get_by_geo_coder"),
          requestBody
        );
        if (near_citys_res.code === 0) {
          const cityData = near_citys_res.data;
          city_id = cityData.id;
          city_name = cityData.name;
          let cityItem = wepy.getStorageSync("cityItem");
          if (cityItem && city_id && city_id != cityItem.value) {
            const language = await config.getLanguage();
            const confirm_res = await wepy.showModal({
              title: this.mtext["reminder"][language],
              content:
                language == "CN"
                  ? "系统定位你在" + city_name + "，是否切换到" + city_name
                  : "Would you like to be switched to your current city based on auto-locate?",
              confirmText: this.mtext["yes"][language],
              cancelText: this.mtext["no"][language],
              confirmColor: "#006d82"
            });
            if (confirm_res.confirm) {
              cityItem = this.getCityItem(city_id, cityList);
              Taro.setStorageSync("cityItem", cityItem);
            }
            // 确认回调
            if (callBack && typeof callBack === "function") {
              callBack({ cityId: cityItem.value, cityName: cityItem.text });
            }
          } else {
            this.renderLocation(city_id, cityList, callBack);
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
    let cityItem = Taro.getStorageSync("cityItem");
    if (!cityItem || !cityItem.value) {
      cityItem = this.getCityItem(cityId, cityList);
      Taro.setStorageSync("cityItem", cityItem);
    }
    if (callBack && typeof callBack === "function") {
      callBack({ cityId: cityItem.value, cityName: cityItem.text });
    }
  },
  /**
   * parameter：cityList
   * return：{cityId：'', cityName: ''}
   */
  async getCityMessage(callBack, cityList = []) {
    let cityListTemp = [];
    if (!cityList || cityList.length === 0) {
      const cityListRes = await request.httpGet(config.getApi("cities"), {});
      const data = cityListRes.data || [];
      if (cityListRes.code === 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          cityListTemp.push({
            value: item.id,
            text: item.name,
            specialDepartmentDesc: item.specialDepartmentDesc,
            packageUrl: item.packageUrl
          });
        }
      }
    } else {
      cityListTemp = cityList;
    }
    this.getLocation(res =>
      this.getCurrentCityData(res, cityListTemp, callBack)
    );
  }
};
