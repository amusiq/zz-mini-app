import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { config, imagesConfig } from "@/constants";
import { SearchInput, SwiperComponent } from "@/components";
import { navTo } from "@/tools";

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
  config: Config = {
    navigationBarTitleText: "首页"
  };

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {
    this.init();
    console.log("componentDidMount");
  }

  onClickSearchInput = () => {
    navTo({ target: "doctorSearch" });
  };

  init = () => {
    const { homeStore } = this.props;
    homeStore.getBanners();
  };

  menuEvent = index => {
    if (index === 0) {
      // 就诊网点
      navTo({ target: "clinicList" });
    } else if (index === 1) {
      // 健康档案
      navTo({ target: "familyHealthyRecord" });
      // wepy.navigateTo({
      //   url: "/pages/healthyRecord/familyHealthyRecord"
      // });
    } else if (index === 2) {
      // 套餐及优惠
      Taro.navigateToMiniProgram({
        appId: config.otherAppIds.shop,
        envVersion: "release",
        success(res) {
          console.log(res, "跳转小程序成功");
        }
      });
    }
  };

  appointmentEvent = () => {
    console.log("appointmentEvent");
  };

  selectCityEvent = () => {
    console.log("selectCityEvent");
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
    const cityInfo = Taro.getStorageSync("cityInfo");
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
        <View className="service">
          <View className="service-item" onClick={this.appointmentEvent}>
            <View className="service-item-left">
              <Image
                className="service-item__icon"
                src={imagesConfig.ICON_CONSULT}
                lazyLoad
                mode="scaleToFill"
              />
              <View>
                <View className="service-item__title">预约门诊</View>
              </View>
            </View>
            <View className="location" onClick={this.selectCityEvent}>
              <Image
                className="location__icon"
                src={imagesConfig.ICON_LOCATION_BLUE}
                lazyLoad
                mode="widthFix"
              />
              <Text className="location__text">{cityInfo.text}</Text>
            </View>
          </View>
          {/* <View className="service-item" wx:if="{{showVideoConsultation}}">
                <View className="service-item-left">
                    <Image className="service-item__icon" src="/images/service2.png" lazy-load mode="scaleToFill"  />
                    <View>
                        <View className="service-item__title">{mtext['video_consultation'][language]}</View>
                        <View className="service-item__describe">{mtext['one_on_one'][language]}</View>
                    </View>
                </View>
            </View> */}
        </View>
      </View>
    );
  }
}

export default Index;
