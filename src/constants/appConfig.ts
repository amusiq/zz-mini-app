import imagesConfig from "./imagesConfig";
import language from "./language";

/**
 * navBarBackType:
 * NormalBack 常规返回（只有箭头返回按钮）
 * OnlyHomeBack 只展示小房子快捷按钮
 * BothBack 返回和小房子按钮
 * CustomBack 自定义
 */
/*  自定义menu配置  */
/**
 * title: 主标题,
 * subTitle: 右侧副标题,
 * icon: 左侧小图标，如果不传此字段则不展示左侧小图标,
 * isShowSubTitle: 是否展示副标题,
 * isHideBottomLine: 是否隐藏底部分割线,
 * key: menu的key值（唯一），可用来做跳转
 */
export default {
  systemInfo: {}, // 系统信息
  customerServicePhone: "400-822-0909",
  app: "distinct_healthcare",
  client: "mini_app",
  clientVersion: "2.11.0",
  navBarBackType: {
    normalBack: "NormalBack",
    onlyHomeBack: "OnlyHomeBack",
    bothBack: "BothBack",
    customBack: "CustomBack"
  },
  isUpperVersionForNavBar: true, // 自定义导航栏需要的版本兼容
  isUpperVersionForCoverView: true, // cover-view需要兼容的版本
  isUpperVersionForSubscribeMessage: false, // 订阅消息版本兼容（基础库2.8.2开始支持）
  myOrderCategoryList: [
    {
      title: "门诊预约",
      icon: imagesConfig.DISTINCT_APPOINTMENT,
      key: "appointment"
    },
    {
      title: "线上问诊",
      icon: imagesConfig.DISTINCT_CONSULTATION,
      key: "consultation"
    }
  ],
  myOrderCategoryFullList: [
    {
      title: "门诊预约",
      icon: imagesConfig.DISTINCT_APPOINTMENT,
      key: "appointment"
    },
    {
      title: "诊后随访",
      icon: imagesConfig.DISTINCT_FOLLOWUP,
      key: "followup"
    },
    {
      title: "线上问诊",
      icon: imagesConfig.DISTINCT_CONSULTATION,
      key: "consultation"
    }
  ],
  userRelationConfigs_CN: [
    [
      {
        title: language["peopleMtext"]["health_record"]["CN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_HEALTH_RECORD,
        isShowSubTitle: true,
        key: "healthRecord"
      },
      {
        title: language["peopleMtext"]["asq"]["CN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_ASQ,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "asqAsking"
      }
    ],
    [
      {
        title: "卓正会员卡",
        subTitle: "",
        icon: imagesConfig.DISTINCT_CARD,
        isShowSubTitle: true,
        key: "distinctCard"
      },
      {
        title: "代金券",
        subTitle: "",
        icon: imagesConfig.DISTINCT_TICKET,
        isShowSubTitle: true,
        isHideBottomLine: true,
        key: "distinctTicket"
      }
    ],
    [
      {
        title: language["peopleMtext"]["contact_customer"]["CN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_CONTACT,
        isShowSubTitle: false,
        key: "contact"
      },
      {
        title: language["peopleMtext"]["feed_back"]["CN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_FEEDBACK,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "feedback"
      }
    ],
    [
      {
        title: language["peopleMtext"]["setting"]["CN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_SETTING,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "setting"
      }
    ]
  ],
  userRelationConfigs_EN: [
    [
      {
        title: language["peopleMtext"]["health_record"]["EN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_HEALTH_RECORD,
        isShowSubTitle: true,
        isHideBottomLine: true,
        key: "healthRecord"
      }
    ],
    [
      {
        title: language["peopleMtext"]["my_appointment"]["EN"],
        icon: imagesConfig.DISTINCT_APPOINTMENT,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "appointment"
      }
    ],
    [
      {
        title: language["peopleMtext"]["contact_customer"]["EN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_CONTACT,
        isShowSubTitle: false,
        key: "contact"
      },
      {
        title: language["peopleMtext"]["feed_back"]["EN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_FEEDBACK,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "feedback"
      }
    ],
    [
      {
        title: language["peopleMtext"]["setting"]["EN"],
        subTitle: "",
        icon: imagesConfig.DISTINCT_SETTING,
        isShowSubTitle: false,
        isHideBottomLine: true,
        key: "setting"
      }
    ]
  ],
  /**  用户关系配置  **/
  familyMemberRelationShipConfig: {
    self: {
      CN: "本人",
      EN: "Self"
    },
    child: {
      CN: "子女",
      EN: "Child"
    },
    parent: {
      CN: "父母",
      EN: "Parent"
    },
    spouse: {
      CN: "夫妻",
      EN: "Spouse"
    },
    sibling: {
      CN: "兄弟姐妹",
      EN: "Sibling"
    },
    other: {
      CN: "其他",
      EN: "Other"
    }
  },
  healthyRecordConfigs: [
    {
      title: "就诊记录",
      isShowSubTitle: false,
      key: "medicalRecords"
    },
    {
      title: "检查报告",
      isShowSubTitle: false,
      key: "checkReport"
    },
    {
      title: "线上问诊",
      isShowSubTitle: false,
      key: "consultation"
    }
    // {
    //     title: '诊后随访',
    //     isShowSubTitle: false,
    //     key: 'followup'
    // }
  ]
};
