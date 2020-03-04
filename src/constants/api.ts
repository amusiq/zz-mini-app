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
  API_POPULAR_SCIENCE_LATEST: `${host}/app-web2/psa/latest` // 科普最新文章
};
