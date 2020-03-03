import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { imagesConfig } from "@/constants";
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

  menuEvent = index => {
    console.log(index);
  };

  render() {
    const {
      homeStore: { banners }
    } = this.props;
    const options = [
      {
        title: "就诊网点",
        icon: imagesConfig.OPTION_NETWORKS
      },
      {
        title: "家庭健康档案",
        icon: imagesConfig.OPTION_FILES
      },
      {
        title: "套餐及优惠",
        icon: imagesConfig.OPTION_OFFER
      }
    ];
    console.log(banners, "banners");
    return (
      <View className="zz-container home-container">
        <SearchInput
          placeholder="搜索您想就诊的医生或科室"
          disabled
          onClick={this.onClickSearchInput}
        />
        <SwiperComponent source={banners} />
        <View className="options">
          {options.map((item, index) => (
            <View
              className="options-item"
              onClick={() => this.menuEvent(index)}
              key="title"
            >
              <Image
                className="options-item__icon"
                src={item.icon}
                lazyLoad
                mode="scaleToFill"
              />
              <Text className="options-item__title">{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Index;
