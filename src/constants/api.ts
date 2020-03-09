/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */

import config from "./config";

const { host } = config;

export default {
  API_HOME_BANNER: `${host}/app-web2/advertisements/v2/banners`, // 首页广告
  API_AUTO_LOGIN: `${host}/auth-api/auth/v2/auto_login`,
  API_UPDATE_WX_USER_INFO: `${host}/auth-api/auth/v2/update_wx_user_info`,
  API_ADVERTISEMENTS_BANNERS: `${host}/app-web2/advertisements/v2/banners`, // 科普轮播广告
  API_POPULAR_SCIENCE_LATEST: `${host}/app-web2/psa/latest`, // 科普最新文章
  API_CITIES: `${host}/app-web2/cities`, // 城市列表
  API_GET_BY_GEO_CODER: `${host}/app-web2/cities/get_by_geo_coder`, // 根据经纬度查城市
  API_DOCTOR_CONSULTING_FOLLOWUP: `${host}/app-web2/consultations/consultation_index`, // 医生推荐、进行中咨询、随访
  API_AVAILABLE_SERVICES: `${host}/app-web2/consultations/service_type/available_services`, // 科室
  API_CUSTOMER_SERVICES: `${host}/app-web2/customer_services/info`, // 获取客服服务信息
  API_GET_TIME: `${host}/auth-api/auth/get_time`,
  API_DOCTORS: `${host}/app-web2/doctors`, // 医生列表
  API_STORES: `${host}/app-web2/stores/v2`, // 诊所网点列表
  API_SCIENCE: `${host}/app-web2/psa` // 科普文章
};
