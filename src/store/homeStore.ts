import { observable } from "mobx";
import { api, imagesConfig } from "@/constants";
import request from "@/utils/request";

const homeStore = observable({
  banners: [],
  cityId: "",

  async getBanners() {
    const data = { module: "home", cityId: this.cityId }; // 城市id非必填
    const defaultBanner = [
      {
        id: "default",
        picture: imagesConfig.DISTINCT_INDEX_BANNER_DEFAULT,
        extraData: {}
      }
    ];
    const res = await request.httpGet({ url: api.API_HOME_BANNER, data });
    if (res.code === 0) {
      this.banners = res.data.length > 0 ? res.data : defaultBanner;
      this.indicatorDots = res.data.length > 1;
    } else {
      this.banners = defaultBanner;
    }
  }
});

export default homeStore;
