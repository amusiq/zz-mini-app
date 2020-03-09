// tab页
const TAB_PAGE = {
  home: "pages/index/index", // 首页
  consultOnline: "pages/consultOnline/consultOnline", // 线上咨询
  discovery: "pages/discovery/discovery", // 发现
  user: "pages/user/user" // 我的
};

const route = {
  // 主包
  ...TAB_PAGE,
  // 分包 : 医生
  doctorSearch: "doctor/doctorSearch/doctorSearch", // 医生搜索页
  // 分包 : 诊所
  clinicList: "clinic/clinicList/clinicList", // 医生搜索页
  // 分包 : 其他
  webView: "other/webView/webView" // webView
};

export { TAB_PAGE };
export default route;
