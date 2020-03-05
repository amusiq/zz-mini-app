/**
 * @Description: 自动登录、用户信息更新、短信注册、微信授权注册
 * @Date: 2019-12-11 15:27:54
 * @LastEditTime: 2019-12-13 11:53:21
 **/

import Taro from "@tarojs/taro";
import request from "@/utils/request";
import { api } from "@/constants";
// import userHook from '../hook/userHook';

export default {
  // 消息体共有信息
  async getCommonBody() {
    const loginRes = await Taro.login();
    const userInfoBody = await Taro.getUserInfo();
    const deviceInfo = await Taro.getSystemInfo();
    const network = await Taro.getNetworkType();

    const user = {
      userInfo: JSON.stringify(userInfoBody.userInfo),
      rawData: userInfoBody.rawData,
      signature: userInfoBody.signature,
      encryptedData: userInfoBody.encryptedData,
      iv: userInfoBody.iv
    };

    const data = {
      code: loginRes.code,
      user: user,
      deviceInfo: JSON.stringify(deviceInfo),
      networkType: network.networkType || ""
    };

    return data;
  },

  // 自动登录
  async autoLogin() {
    const body = { code: "", deviceInfo: {}, networkType: "" };

    const systemInfo = Taro.getSystemInfoSync();
    const wxLogin = await Taro.login();
    const network = await Taro.getNetworkType();
    const { brand, model, system, version, SDKVersion } = systemInfo;
    body.code = wxLogin.code || "";
    const deviceInfo = {
      brand: brand || "",
      model: model || "",
      system: system || "",
      version: version || "",
      SDKVersion: SDKVersion || ""
    };
    body.deviceInfo = JSON.stringify(deviceInfo);
    body.networkType = network.networkType || "";
    const autoLoginResult = await request.loginHttpPost({
      url: api.API_AUTO_LOGIN,
      data: body,
      header: { "content-type": "application/json", isNeedTokenInBody: false }
    });
    console.log("自动登录返回结果", autoLoginResult);
    if (autoLoginResult.data) {
      Taro.setStorageSync("loginInfo", autoLoginResult.data);
      //    userHook.emit('autoLogin', autoLoginResult.data);
    }
    return autoLoginResult;
  },

  // 更新微信用户信息
  async updateUserInfo() {
    const authSettingRes = await Taro.getSetting();
    const authSetting = authSettingRes.authSetting || {};
    const authUserInfo = authSetting["scope.userInfo"] || false;
    if (!authUserInfo) {
      return; // 没有相关权限，无法获取微信用户信息
    }

    const loginInfo = Taro.getStorageSync("loginInfo");
    const authToken = loginInfo.authToken || "";
    if (!authToken || authToken.length === 0) {
      return; // 未登录状态，无法获取微信用户信息
    }

    const userInfoBody = await Taro.getUserInfo();
    const body = {
      userInfo: JSON.stringify(userInfoBody.userInfo),
      rawData: userInfoBody.rawData,
      signature: userInfoBody.signature,
      encryptedData: userInfoBody.encryptedData,
      iv: userInfoBody.iv
    };

    const userInfoResult = await request.loginHttpPost({
      url: api.API_UPDATE_WX_USER_INFO,
      data: body,
      header: { "content-type": "application/json" }
    });
    console.log("更新微信用户信息", userInfoResult);
    return userInfoResult;
  }
};
