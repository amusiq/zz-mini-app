import Taro from "@tarojs/taro";
import { observable } from "mobx";
import userAutoLogin from "@/utils/userAutoLogin";
import request from "@/utils/request";
import { api } from "@/constants";
import { qnUploader } from "@/tools";

const userStore = observable({
  loginInfo: {},
  isLogin: false,

  // 用户静默登录，更新微信用户信息
  async userAutoLogin() {
    const autoLoginRes = await userAutoLogin.autoLogin();
    if (autoLoginRes.data) {
      this.loginInfo = autoLoginRes.data;
      this.isLogin = true;
      await userAutoLogin.updateUserInfo(autoLoginRes.data);
    }
  },

  // 修改用户信息
  async editUserInfo(params) {
    if (!params.nickname) {
      Taro.showToast({
        duration: 2000,
        title: "请完善必要信息",
        icon: "none"
      });
      return;
    }
    const data = {
      photoLink: params.photoLink,
      photo: params.photo,
      nickname: params.nickname
    };
    Taro.showLoading({ title: "保存中...", mask: true });
    const res = await request.loginHttpPut({
      url: `${api.API_USER}/${this.loginInfo.id}/info`,
      data
    });
    if (res.code === 0) {
      this.loginInfo = res.data;
      Taro.showToast({
        mask: true,
        duration: 2000,
        title: "操作成功"
      }).then(() => {
        setTimeout(() => {
          Taro.navigateBack({
            delta: 1
          });
        }, 1000);
      });
    } else {
      Taro.showToast({
        mask: true,
        duration: 2000,
        title: res.message + "",
        icon: "none"
      });
    }
    Taro.hideLoading();
  },

  // 上传用户头像
  async selectImages({ uploadToken, success, fail }) {
    try {
      const res = await Taro.chooseImage({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        count: 1
      });
      Taro.showLoading({
        title: "图片上传中",
        mask: true
      });
      const filePath = res.tempFiles.length === 1 ? res.tempFiles[0] : "";
      if (filePath) {
        const result = await qnUploader.upload(filePath, uploadToken);
        Taro.hideLoading();
        if (!result.error) {
          success && success(result.resourceURL);
          return result.resourceURL;
        } else if (result.error.indexOf("token") !== -1) {
          fail && fail("No Token");
          Taro.showToast({
            title: "图片上传失败,请稍后再试",
            icon: "none"
          });
          throw new Error(
            "upload headImg error",
            result.error,
            JSON.stringify(filePath)
          );
        } else {
          Taro.showToast({
            title: "图片上传失败,请稍后再试",
            icon: "none"
          });
          throw new Error(
            "upload headImg error",
            result.error,
            JSON.stringify(filePath)
          );
        }
      }
    } catch (e) {
      Taro.hideLoading();
      if (e.errMsg.indexOf("fail") !== -1) {
        if (e.errMsg.indexOf("choose") !== -1) {
          Taro.showToast({
            title: "未选择图片",
            icon: "none"
          });
        } else {
          Taro.showToast({
            title: "图片上传失败,请稍后再试",
            icon: "none"
          });
        }
      }
    }
  },

  // 获取UploadToken
  async getUploadToken() {
    const res = await request.loginHttpGet({ url: api.API_UPLOAD_TOKEN });
    if (res.code === 0) {
      return res.data.token;
    } else {
      return "";
    }
  }
});
export default userStore;
