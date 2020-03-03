import ICON_LOGO from "@/assets/images/icon_logo.png";
import BACK_BLACK_BG from "@/assets/images/back_black_bg.png";
import BACK_WHITE from "@/assets/images/back_white.png";
import BACK_BLACK from "@/assets/images/back_black.png";
import BACK_HOME from "@/assets/images/back_home.png";
import RIGHT_ARROW_WHITE from "@/assets/images/right_arrow_white.png";
import BACK_HOME_WHITE from "@/assets/images/back_home_white.png";
import RIGHT_ARROW_GREEN from "@/assets/images/right_arrow_green.png";
import SHARE_CODE from "@/assets/images/share_code.png";
import ICON_TIPS from "@/assets/images/tips_icon.png";
import ICON_LOCATION_BLUE from "@/assets/images/icon_location_blue.png";
import ICON_LOCATION_GRAY from "@/assets/images/icon_location_gray.png";
import ICON_PHONE from "@/assets/images/phone.png";
import ICON_CHECKED from "@/assets/images/icon_checked.png";
import ICON_UNCHECKED from "@/assets/images/icon_unchecked.png";
import ICON_FILTER from "@/assets/images/icon_filter.png";
import ICON_DOCTOR_EMPTY from "@/assets/images/icon_doctor_empty.png";
import ICON_ONLINE_SERVICE_EN from "@/assets/images/icon_online_service.png";
import ICON_TEL_EN from "@/assets/images/icon_tel_en.png";
import ICON_SHARE from "@/assets/images/icon_share.png";
import ICON_SHARE_GRAY from "@/assets/images/icon_share_gray.png";
import OPTION_NETWORKS from "@/assets/images/option1.png";
import OPTION_FILES from "@/assets/images/option2.png";
import OPTION_OFFER from "@/assets/images/option3.png";
import LISTEN_FREE from "@/assets/images/listen_free.png";
import ICON_BOOK from "@/assets/images/book.png";
import ICON_CONSULT from "@/assets/images/service1.png";
import ICON_VIDEO_CONSULT from "@/assets/images/service2.png";

const IMG_HOST = "https://file-storage.distinctclinic.com/miniapp/static";

const images = {
  /** ---------------全局组件--------------- **/
  ICON_LOGO,
  BACK_BLACK_BG,
  BACK_WHITE,
  BACK_BLACK,
  BACK_HOME,
  BACK_HOME_WHITE,
  RIGHT_ARROW: `${IMG_HOST}/right_arrow.png`,
  RIGHT_ARROW_BLUE: `${IMG_HOST}/right_arrow_blue.png`,
  ARROW_DOWN: `${IMG_HOST}/arrow_down.png`,
  RIGHT_ARROW_WHITE,
  RIGHT_ARROW_GREEN,
  SHARE_CODE,
  ICON_TIPS,
  ICON_LOCATION_BLUE,
  ICON_LOCATION_GRAY,
  ICON_PHONE,
  ICON_CHECKED,
  ICON_UNCHECKED,
  ICON_FILTER,
  ICON_DOCTOR_EMPTY,
  ICON_ONLINE_SERVICE_EN,
  ICON_TEL_EN,
  /** ---------------优惠券--------------- **/
  ICON_SHARE,
  ICON_SHARE_GRAY,

  /** ---------------通用人物形象--------------- **/
  DISTINCT_CHILDREN_MALE: `${IMG_HOST}/distinct_children_male.png`,
  DISTINCT_CHILDREN_FEMALE: `${IMG_HOST}/distinct_children_female.png`,
  DISTINCT_ADULT_MALE: `${IMG_HOST}/distinct_adult_male.png`,
  DISTINCT_ADULT_FEMALE: `${IMG_HOST}/distinct_adult_female.png`,
  DISTINCT_ELDERLY_MALE: `${IMG_HOST}/distinct_elderly_male.png`,
  DISTINCT_ELDERLY_FEMALE: `${IMG_HOST}/distinct_elderly_female.png`,
  DISTINCT_CHARACTER_OTHER: `${IMG_HOST}/distinct_character_other.png`,
  DISTINCT_DOCTOR_MALE: `${IMG_HOST}/distinct_doctor_male.png`,
  DISTINCT_DOCTOR_FEMALE: `${IMG_HOST}/distinct_doctor_female.png`,
  DISTINCT_DOCTOR_COMMON: `${IMG_HOST}/distinct_doctor_common.png`,
  DISTINCT_USER_COMMON: `${IMG_HOST}/distinct_user_common.png`,
  /** ---------------卓正服务--------------- **/
  OPTION_NETWORKS,
  OPTION_FILES,
  OPTION_OFFER,
  /** ---------------预约--------------- **/
  DISTINCT_DOCTOR_HOLIDAY: `${IMG_HOST}%2Fstatic%2Fdoctor_holiday.png`,
  /** ---------------医生------------------- **/
  /** ---------------线上问诊------------------- **/
  DOCTOR_DETAIL_TOP: "/assets/images/top_bg.png",
  LOCATION_BLUE: `${IMG_HOST}/icon_location_blue.png`,
  LOCATION_GRAY: `${IMG_HOST}/location_gray.png`,
  ICON_CUSTOMER_SERVICE: `${IMG_HOST}/icon_customer_service.png`,
  ICON_EVALUATE_DISSATISFIED: `${IMG_HOST}/icon_evaluate_dissatisfied.png`,
  ICON_EVALUATE_SATISFIED: `${IMG_HOST}/icon_evaluate_satisfied.png`,
  ICON_EVALUATE_BEST: `${IMG_HOST}/icon_evaluate_verysatisfied.png`,
  ICON_CONSULTATION_PHONE: `${IMG_HOST}/icon_phone.png`,
  ICON_CONSULTATION_PHONE_DISABLED: `${IMG_HOST}/icon_phone_disable.png`,
  ICON_CONSULTATION_TEXT: `${IMG_HOST}/icon_text.png`,
  ICON_CONSULTATION_TEXT_DISABLED: `${IMG_HOST}/icon_text_disable.png`,
  /** ---------------科普------------------- **/
  /** ---------------会员卡------------------- **/
  CARD_CANCEL: `${IMG_HOST}/card_cancel.png`,
  ICON_WXPAY: `${IMG_HOST}/icon_wxpay.png`,
  ICON_OFFLINE_PAY: `${IMG_HOST}/icon_offline_pay.png`,
  ICON_SELECTED: `${IMG_HOST}/icon_selected.png`,
  ICON_UNSELECTED: `${IMG_HOST}/icon_unselected.png`,
  /** ---------------我的------------------- **/
  DISTINCT_APPOINTMENT: `${IMG_HOST}/distinct_%20appointment.png`,
  DISTINCT_FOLLOWUP: `${IMG_HOST}/distinct_followup.png`,
  DISTINCT_CONSULTATION: `${IMG_HOST}/distinct_consultation.png`,
  DISTINCT_CARD: `${IMG_HOST}/distinct_card.png`,
  DISTINCT_SETTING: `${IMG_HOST}/distinct_setting.png`,
  DISTINCT_ASQ: `${IMG_HOST}/distinct_asq.png`,
  DISTINCT_CONTACT: `${IMG_HOST}/distinct_contact.png`,
  DISTINCT_HEALTH_RECORD: `${IMG_HOST}/distinct_healthrecord.png`,
  DISTINCT_TICKET: `${IMG_HOST}/distinct_ticket.png`,
  DISTINCT_FEEDBACK: `${IMG_HOST}/distinct_feedback.png`,
  DISTINCT_FAMILY_MEMBER: `${IMG_HOST}/icon_family.png`,
  DISTINCT_MEDICAL_RECORDS: `${IMG_HOST}/icon_medical_record.png`,
  DISTINCT_CHECK_REPORT: `${IMG_HOST}/icon_check_report.png`,
  /** ---------------门诊预约------------------- **/
  DISTINCT_CONTACT_FULL: `${IMG_HOST}/distinct_contact_full.png`,
  DISTINCT_APPOINTMENT_INDEX_BANNER: `${IMG_HOST}/appointment_index_banner.png`,
  DISTINCT_INDEX_BANNER_DEFAULT:
    "https://file-storage.distinctclinic.com/images/banner/index_banner_default.png",
  /** ---------------健康档案------------------- **/
  TOP_HEALTHY_RECORD: `${IMG_HOST}/healthy_record.png`,
  BG_HEALTHY_RECORD: `${IMG_HOST}/bg_healthy_record.png`,
  ICON_EDIT: `${IMG_HOST}/icon_edit.png`,
  ICON_DELETE: `${IMG_HOST}/icon_delete.png`,
  BG_REPORT_TIME: `${IMG_HOST}/report_time_bg.png`,
  DRUG_LABEL: `${IMG_HOST}/drug_label.png`,
  ICON_LOCK: `${IMG_HOST}/icon_lock.png`,
  /** ---------------发现------------------- **/
  LISTEN_FREE,
  ICON_BOOK,
  ICON_CONSULT,
  ICON_VIDEO_CONSULT,
  /**---------------卓正医疗服务号-------------**/
  DISTINCT_SERVICE_APPOINTMENT: `${IMG_HOST}/distinct_service_appointment.png`,
  DISTINCT_SERVICE_FOLLOWUP: `${IMG_HOST}/distinct_service_followup.png`,
  /**------------------诊所相关---------------------**/
  DISTINCT_CLINIC_PIN: `${IMG_HOST}/pin.png`,
  DISTINCT_SERVICE_CONSULT: `${IMG_HOST}/distinct_service_consult.png`
};
export default images;
