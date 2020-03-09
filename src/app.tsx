import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import store from "@/store";
import Index from "./pages/index/index";
import "./app.scss";

const { commonStore, userStore } = store;
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // eslint-disable-next-line react/sort-comp
  config: Config = {
    pages: [
      "pages/index/index",
      "pages/consultOnline/consultOnline",
      "pages/discovery/discovery",
      "pages/user/user"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "卓正医疗",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#888888",
      selectedColor: "#006d82",
      backgroundColor: "#ffffff",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "卓正服务",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png"
        },
        {
          pagePath: "pages/consultOnline/consultOnline",
          text: "线上问诊",
          iconPath: "./assets/tab-bar/consult.png",
          selectedIconPath: "./assets/tab-bar/consult-active.png"
        },
        {
          pagePath: "pages/discovery/discovery",
          text: "发现",
          iconPath: "./assets/tab-bar/discovery.png",
          selectedIconPath: "./assets/tab-bar/discovery-active.png"
        },
        {
          pagePath: "pages/user/user",
          text: "我的",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png"
        }
      ]
    },
    subPackages: [
      {
        root: "doctor",
        pages: ["doctorSearch/doctorSearch"]
      },
      {
        root: "clinic",
        pages: ["clinicList/clinicList"]
      },
      {
        root: "other",
        pages: ["webView/webView"]
      }
    ],
    permission: {
      "scope.userLocation": {
        desc: "为您匹配对应城市的卓正服务。"
      }
    }
  };

  async componentDidMount() {
    userStore.userAutoLogin();
    await commonStore.getCityList();
    commonStore.getCurrentCityInfo();
    commonStore.updateAppConfig();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
