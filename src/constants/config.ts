export default {
  platformName: "distinct_healthcare",
  payAmount: 3000,
  language: "CN",
  host: "https://test.distinctclinic.com",
  imgHost: "https://file-storage.distinctclinic.com/miniapp/static",
  shareConfig: {
    title: "卓正医疗",
    path: "/pages/index",
    success: function() {
      // 转发成功
    },
    fail: function() {
      // 转发失败
    }
  },
  changeLanguageAsstistCount: 0,
  scaleX: 1,
  scaleY: 1,
  pixelRatio: 2,
  isIpx: false,
  screenWidth: 375.0,
  screenHeight: 667.0,
  wxSdkVer: "",
  diagnoseType: {
    // 线上问诊类型
    consulting: "consulting", // 进行中的咨询
    followup: "followup", // 随访
    recommend: "recommend" // 推荐医生
  },
  system: {
    appointmentPhone: "4008220909"
  },
  aes: {
    key: "0f607264fc6318a8",
    iv: "0f607264fc6318a8"
  },
  otherAppIds: {
    course: "wx7864b595f4f293a2",
    shop: "wxde8636d5b813ee8a"
  }
};
