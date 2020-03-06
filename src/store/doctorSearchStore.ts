import { observable } from "mobx";
import Taro from "@tarojs/taro";
import request from "@/utils/request";
import { api } from "@/constants";

const doctorSearchStore = observable({
  doctorData: {
    list: [],
    hasNext: true,
    limit: 10
  },
  isDidLoadData: false,

  get doctorList() {
    return this.doctorData.list.map(item => {
      return {
        ...item,
        tagsList: item.tags ? item.tags.split("|") : []
      };
    });
  },

  // 初始化
  init() {
    this.doctorData = {
      list: [],
      hasNext: true,
      limit: 10
    };
    this.isDidLoadData = true;
  },

  // 获取医生列表
  async getDoctors(searchValue: string, fresh = false) {
    if (fresh) this.doctorData = { hasNext: true, list: [], limit: 10 };
    const { hasNext, limit, list } = this.doctorData;
    if (!hasNext) return;
    const cityInfo = Taro.getStorageSync("cityInfo");
    const data = {
      city: cityInfo.value,
      q: searchValue,
      start: list.length,
      limit: limit
    };
    const res = await request.httpGet({ url: api.API_DOCTORS, data });
    if (res.code === 0) {
      this.doctorData.hasNext = res.data.hasNext;
      this.doctorData.list = list.concat(res.data.data);
      this.isDidLoadData = true;
    } else {
      Taro.showToast({
        title: res.message,
        icon: "none"
      });
    }
  }
});
export default doctorSearchStore;
