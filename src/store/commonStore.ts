import { observable } from "mobx";
import { api } from "@/constants";
import request from "@/utils/request";
import { locationTool } from "@/tools";

const commonStore = observable({
  language: "CN",
  cityList: [],
  location: { longitude: 0, latitude: 0 },

  // 获取城市列表
  async getCityList() {
    this.cityList = await locationTool.getCityList();
  },

  // 获取当前城市定位信息
  async getCurrentCityInfo() {
    locationTool.getCurrentCity(this.cityList);
  }
});
export default commonStore;
