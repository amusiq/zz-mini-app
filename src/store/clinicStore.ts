import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { api } from "@/constants";
import request from "@/utils/request";
import commonStore from "./commonStore";

const clinicStore = observable({
  clinicData: {
    list: [],
    hasNext: true,
    limit: 20
  },
  clinicListGlobal: [],

  async getClinicList(params, fresh = false) {
    if (fresh) {
      this.clinicData = { hasNext: true, list: [], limit: 5 };
      this.clinicListGlobal = [];
    }
    const { hasNext, limit, list } = this.clinicData;
    if (!hasNext) return;
    const { searchKey } = params;
    const { location } = commonStore;
    const cityInfo = Taro.getStorageSync("cityInfo");
    Taro.showLoading({ mask: true });
    const data = {
      city: cityInfo.value,
      start: list.length,
      limit,
      searchKey: searchKey,
      latitude: location.latitude,
      longitude: location.longitude
    };
    const resData = await request.loginHttpGet({
      url: api.API_STORES,
      data
    });
    if (resData.code === 0) {
      this.newest.hasNext = resData.data.hasNext;
      this.clinicData.list = list.concat(resData.data.data);
    }
    this.clinicListGlobal = this.clinicListGlobal.concat(resData.data.data);
    this.getMarkerList(resData.data.data);
    Taro.hideLoading();
  }

  // getSameClinicList(marKerId) {
  //   this.clinicList = clinicTool.getSameClinicList(
  //     this.clinicListGlobal,
  //     marKerId
  //   );
  // }

  // // 网点标注列表
  // getMarkerList(tempList = []) {
  //   if (tempList.length > 0) {
  //     const tempMarkes = [];
  //     for (let i = 0; i < tempList.length; i++) {
  //       const item = tempList[i];
  //       const marker = {};
  //       marker.id = item.id;
  //       marker.latitude = item.latitude;
  //       marker.longitude = item.longitude;
  //       //marker.title = item.name;
  //       marker.iconPath = imageConfig.distinct_clinic_pin;
  //       marker.width = 50;
  //       marker.height = 50;
  //       tempMarkes.push(marker);
  //     }
  //     this.markers = this.markers.concat(tempMarkes);
  //     // 第一个诊所为中心点
  //     if (this.markers.length > 0) {
  //       const firstLocation = this.markers[0];
  //       this.latitude = firstLocation.latitude;
  //       this.longitude = firstLocation.longitude;
  //     } else {
  //       this.latitude = this.currentLatitude;
  //       this.longitude = this.currentLongitude;
  //     }
  //   } else {
  //     this.latitude = this.currentLatitude;
  //     this.longitude = this.currentLongitude;
  //   }
  // }
});
export default clinicStore;
