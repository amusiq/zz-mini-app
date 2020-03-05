import Taro from "@tarojs/taro";
import querystring from "querystring";

class AdTool {
  // tab页
  tabRoute = [
    "/pages/index",
    "/pages/consultOnline",
    "/pages/discovery",
    "/pages/people"
  ];
  // 跳转
  navTo(params) {
    const { openType, extraData } = params;
    if (Object.keys(extraData).length === 0) return;
    switch (openType) {
      case "inner_mini_app": {
        const param = querystring.stringify(extraData.param);
        const url = `${extraData.path}${param ? `?${param}` : ""}`;
        const isTabRoute = this.tabRoute.includes(extraData.path);
        if (isTabRoute) {
          Taro.switchTab({ url });
        } else {
          Taro.navigateTo({ url });
        }
        break;
      }
      case "outer_mini_app": {
        Taro.navigateToMiniProgram({
          appId: extraData.miniAppId,
          path: extraData.path,
          envVersion: "release",
          success(res) {
            console.log(res, "跳转小程序成功");
          }
        });
        break;
      }
      case "link": {
        Taro.navigateTo({
          url: `/pages/webView?type=article&link=${encodeURIComponent(
            extraData.link
          )}`
        });
        break;
      }
      default:
        console.log("无此类跳转类型openType");
    }
  }
}

const adTool = new AdTool();
export default adTool;
