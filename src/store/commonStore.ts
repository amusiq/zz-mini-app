import Taro from "@tarojs/taro";
import { observable } from "mobx";
import { api, appConfig } from "@/constants";
import request from "@/utils/request";
import { commonTool, locationTool } from "@/tools";

const commonStore = observable({
  systemInfo: {}, // 系统信息
  language: "CN",
  isIpx: false,
  cityList: [],
  location: { longitude: 0, latitude: 0 },

  // 获取城市列表
  async getCityList() {
    this.cityList = await locationTool.getCityList();
  },

  // 获取当前城市定位信息
  async getCurrentCityInfo() {
    locationTool.getCurrentCity(this.cityList);
  },

  // 获取系统信息
  async getSystemInfo() {
    const systemInfo = Taro.getSystemInfoSync();
    this.systemInfo = systemInfo;
    if (systemInfo.model.indexOf("iPhone X") > -1) {
      this.isIpx = true;
    }
  },

  // 更新appConfig
  async updateAppConfig() {
    await this.getSystemInfo();
    const { SDKVersion } = this.systemInfo;
    appConfig.isUpperVersionForNavBar = commonTool._isUpperVersion(
      SDKVersion,
      "2.5.2"
    );
    appConfig.isUpperVersionForCoverView =
      commonTool._compareVersion(SDKVersion, "2.6.6") >= 0;
    appConfig.isUpperVersionForSubscribeMessage = commonTool._isUpperVersion(
      SDKVersion,
      "2.8.2"
    );
  }
});
export default commonStore;
