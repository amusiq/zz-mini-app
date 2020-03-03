/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = "https://dev.distinctclinic.com";
/* eslint-enable */

// pic
export const CDN = "https://file-storage.distinctclinic.com/miniapp/static/";

// index
export const API_HOME_BANNER = `${host}/app-web2/advertisements/v2/banners`;
export const API_AUTO_LOGIN = `${host}/auth-api/auth/v2/auto_login`;
export const API_UPDATE_WX_USER_INFO = `${host}/auth-api/auth/v2/update_wx_user_info`;
