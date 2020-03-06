import { observable } from "mobx";
import userAutoLogin from "@/utils/userAutoLogin";

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

  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
});
export default userStore;
