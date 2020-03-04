import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { api } from "@/constants";
import request from "@/utils/request";

const discoveryStore = observable({
  counter: 0,
  banners: [],
  newest: {
    hasNext: true,
    list: [],
    limit: 5
  },

  // 获取轮播图
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
  },

  // 获取最新文章
  async getArticleInfo(fresh) {
    if (fresh) this.newest = { hasNext: true, list: [], limit: 5 };
    const { hasNext, limit, list } = this.newest;
    if (!hasNext) return;
    const data = { start: list.length, limit };
    const res = await request.httpGet({
      url: api.API_POPULAR_SCIENCE_LATEST,
      data
    });
    if (res.code === 0) {
      this.newest.hasNext = res.data.hasNext;
      this.newest.list = list.concat(res.data.data);
    } else {
      Taro.showToast({
        title: res.message,
        icon: "none"
      });
    }
  }
});
export default discoveryStore;
