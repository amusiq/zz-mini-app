import Taro from "@tarojs/taro";
import router, { TAB_PAGE } from "@/constants/routerConfig";

const NAV_TYPE = [
  "switchTab",
  "reLaunch",
  "redirectTo",
  "navigateTo",
  "navigateBack"
];

export default function navTo({
  target = "",
  params = {},
  navType = "navigateTo"
}) {
  if (!(target in router)) {
    throw new Error(`please define ${target} in routerConfig.ts`);
  }
  let url = `/${router[target]}`;
  if (target in TAB_PAGE && navType === "navigateTo") navType = "switchTab";
  if (NAV_TYPE.includes(navType)) {
    if (Object.keys(params).length !== 0) {
      let urlParams = "?";
      Object.keys(params).forEach((key, idx) => {
        urlParams += `${idx === 0 ? "" : "&"}${key}=${params[key]}`;
      });
      url += urlParams;
    }
    return Taro[navType]({ url });
  }
  throw new Error(`fail to ${navType}`);
}
