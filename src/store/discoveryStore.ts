import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { api } from "@/constants";
import request from "@/utils/request";

const discoveryStore = observable({
  counter: 0,
  banners: [],

  async getBanners() {
    const data = { module: "discovery" };
    const defaultBanner = [
      {
        id: "default",
        picture:
          "https://file-storage.distinctclinic.com/distinct-wxmp/static/img/default_banner.png",
        extraData: {}
      }
    ];
    const res = await request.httpGet({
      url: api.API_ADVERTISEMENTS_BANNERS,
      data
    });
    if (res.code === 0) {
      this.banners = res.data.length > 0 ? res.data : defaultBanner;
      this.indicatorDots = res.data.length > 1;
    } else {
      this.banners = defaultBanner;
      Taro.showToast({
        title: res.message,
        icon: "none"
      });
    }
  }
});
export default discoveryStore;
