import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { SearchInput, SwiperComponent } from "@/components";

import "./index.scss";

type PageStateProps = {
  homeStore: {
    banners: [];
    getBanners: Function;
  };
};

interface Index {
  props: PageStateProps;
}

@inject("homeStore")
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {
    this.init();
    console.log("componentDidMount");
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClickSearchInput = () => {
    console.log("onClickSearchInput");
  };

  init = () => {
    const { homeStore } = this.props;
    homeStore.getBanners();
  };

  render() {
    const {
      homeStore: { banners }
    } = this.props;
    console.log(banners, "banners");
    return (
      <View className="zz-container">
        <SearchInput
          placeholder="搜索您想就诊的医生或科室"
          disabled
          onClick={this.onClickSearchInput}
        />
        <SwiperComponent source={banners} />
      </View>
    );
  }
}

export default Index;
