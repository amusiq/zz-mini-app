import { imagesConfig } from "@/constants";

// 咨询、随访、医生推荐 相关工具类
export default {
  getConsultStatusImage: function(status) {
    // 进行中的咨询、在线随访角标
    const { ICON_BEQUESTIONED, ICON_STARTED } = imagesConfig;
    if (status === "待追问") {
      return ICON_BEQUESTIONED;
    } else if (status === "待发起") {
      return ICON_STARTED;
    } else {
      return "";
    }
  },

  timeDifference: function(dateDiff) {
    // 在线随访剩余时间
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    const leave1 = dateDiff % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    const leave2 = leave1 % (3600 * 1000);
    const minutes = Math.floor(leave2 / (60 * 1000));
    if (dayDiff) {
      return dayDiff + "天";
    } else if (hours) {
      return hours + "小时";
    } else if (minutes) {
      return minutes + "分钟";
    } else {
      return "0分钟";
    }
  },

  // params:2019-07-18
  getFormatDate: function(params) {
    const currentYear = new Date().getFullYear();
    let resultDate = "";
    if (params && params.indexOf("-") !== -1) {
      const dateSplit = params.split("-") || [];
      if (dateSplit.length === 3) {
        const year = dateSplit[0];
        if (currentYear == year) {
          resultDate = dateSplit[1] + "月" + dateSplit[2] + "日";
        } else {
          resultDate =
            dateSplit[0] + "年" + dateSplit[1] + "月" + dateSplit[2] + "日";
        }
      } else {
        resultDate = params;
      }
    } else {
      resultDate = params;
    }
    return resultDate;
  },

  getDoctorStatusImage: function(recommendType) {
    // 获取医生角标
    const {
      ICON_CONSULTATION,
      ICON_APPOINTMENT,
      ICON_RECOMMEND,
      ICON_FOCUSED
    } = imagesConfig;
    const config = {
      consultation: ICON_CONSULTATION, // 曾问诊
      appointment: ICON_APPOINTMENT, // 曾就诊
      system: ICON_RECOMMEND, // 系统推荐
      following: ICON_FOCUSED // 已关注
    };
    if (!config[recommendType]) {
      return config.system;
    }
    return config[recommendType];
  },

  getConsultOrderStatus: function(status) {
    // 我的问诊订单状态文字颜色
    // ['待支付', '待回复', '带追问' , '待评价', '已退款', '已评价', '已取消']
    if (status === "待支付") {
      return "color: #BE3D3C";
    } else if (
      status === "待回复" ||
      status === "带追问" ||
      status === "待评价"
    ) {
      return "color: #006F83";
    } else if (
      status === "已退款" ||
      status === "已评价" ||
      status === "已取消"
    ) {
      return "color: #AAB5B6";
    } else {
      return "color: #006F83";
    }
  },

  // TODO： 两个方法重复
  // 随访落地页 咨询状态
  getConsultationImageByTypeOfLandingPage: function(consultationItem) {
    if (consultationItem && consultationItem.type === "text") {
      return consultationItem.status === "available"
        ? imagesConfig.ICON_CONSULTATION_TEXT
        : imagesConfig.ICON_CONSULTATION_TEXT_DISABLED;
    }
    if (consultationItem && consultationItem.type === "phone") {
      return consultationItem.status === "available"
        ? imagesConfig.ICON_CONSULTATION_PHONE
        : imagesConfig.ICON_CONSULTATION_PHONE_DISABLED;
    }
  },

  // 医生详情页 咨询状态
  getConsultationImageByType: function(consultationItem) {
    if (consultationItem && consultationItem.type === "text") {
      return consultationItem.status === "available"
        ? imagesConfig.ICON_CONSULTATION_TEXT
        : imagesConfig.ICON_CONSULTATION_TEXT_DISABLED;
    }
    if (consultationItem && consultationItem.type === "phone") {
      return consultationItem.status === "available"
        ? imagesConfig.ICON_CONSULTATION_PHONE
        : imagesConfig.ICON_CONSULTATION_PHONE_DISABLED;
    }
  },
  getConsultationTypeStringByType: function(type) {
    if (type === "text") {
      return "图文咨询";
    } else if (type === "phone") {
      return "电话咨询";
    } else {
      return "";
    }
  },
  getConsultationStatusStringByStatus: function(status) {
    if (status === "available") {
      return "可咨询";
    } else if (status === "full") {
      return "已满额";
    } else if (status === "close") {
      return "暂不提供咨询";
    } else {
      return "";
    }
  },

  handleEvaluateEmoticon: function(score) {
    const {
      ICON_EVALUATE_DISSATISFIED,
      ICON_EVALUATE_SATISFIED,
      ICON_EVALUATE_BEST
    } = imagesConfig;
    if (parseInt(score) <= 6) {
      return ICON_EVALUATE_DISSATISFIED;
    } else if (parseInt(score) <= 8) {
      return ICON_EVALUATE_SATISFIED;
    } else {
      return ICON_EVALUATE_BEST;
    }
  }
};
