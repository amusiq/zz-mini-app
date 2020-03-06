import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Block,
  Text,
  Image,
  Swiper,
  SwiperItem,
  WebView,
  Button
} from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { config, imagesConfig, routeConfig } from "@/constants";
import { ConsultItem, FollowupItem, RecommendDoctor } from "@/components";
import { commonTool } from "@/tools";

import "./consultOnline.scss";

type PageStateProps = {
  userStore: {
    isLogin: boolean;
  };
  consultOnlineStore: {
    tabList: [];
    selectedSubList: [];
    departmentsList: [];
    selectType: string;
    currentSelectedIndex: number;
    loadLoginData: Function;
    getAvailableServices: Function;
  };
};

interface ConsultOnline {
  props: PageStateProps;
}

@inject("consultOnlineStore", "userStore")
@observer
class ConsultOnline extends Component {
  config: Config = {
    navigationBarTitleText: "问诊"
  };

  state = {
    isDuringServiceTime: true as boolean | string,
    isShowMenu: false,
    isShowPop: false,
    currentScrollIndex: 0
  };

  componentDidMount() {
    const { consultOnlineStore } = this.props;
    consultOnlineStore.getAvailableServices();
  }

  componentDidShow() {
    const {
      userStore: { isLogin },
      consultOnlineStore
    } = this.props;
    this.resetPopStatus();
    if (isLogin) {
      // 重置swiper状态：
      this.setState({ currentScrollIndex: 0 });
      consultOnlineStore.loadLoginData();
    }
  }

  // 处理弹框状态
  resetPopStatus() {
    this.setState({ isShowPop: false, isShowMenu: false });
  }

  onShareAppMessage() {
    return {
      title: "卓正医疗线上问诊",
      path: routeConfig.consultOnline,
      success: res => {
        console.log("转发成功", res);
      },
      fail: res => {
        console.log("转发失败", res);
      }
    };
  }

  consultNoticeClick = () => {};
  handleContact = () => {};
  contactServicer = () => {};
  navigateTabItemDetail = () => {};
  switchTab = () => {};
  scrollChangeAction = e => {
    this.setState({ currentScrollIndex: e.detail.current });
  };
  questionAction = async () => {
    const { isShowMenu } = this.state;
    let { isDuringServiceTime } = this.state;
    if (!isShowMenu) {
      isDuringServiceTime = await commonTool._isDuringServiceTime();
    }
    this.setState({
      isShowMenu: !isShowMenu,
      isDuringServiceTime
    });
  };

  render() {
    const {
      userStore: { isLogin },
      consultOnlineStore: {
        tabList,
        currentSelectedIndex,
        selectedSubList,
        selectType,
        departmentsList
      }
    } = this.props;
    const { language } = config;
    const { currentScrollIndex, isDuringServiceTime, isShowMenu } = this.state;
    const aboutUrl = "https://mp.weixin.qq.com/s/9iIFqLqtk0oKwYWv-W1h1w";
    const bannerUrl =
      "https://file-storage.distinctclinic.com/miniapp/static/icon_consultation.png";
    const isEn = ["EN", "en"].includes(language);
    return (
      <Block>
        {isEn ? (
          <WebView src={aboutUrl} />
        ) : (
          <View>
            <View className="imageContainer">
              <View
                className="justify-align-center searchFloateContainer"
                onClick={this.onClickSearch}
              >
                <Image
                  className="searchFloateImage"
                  src={imagesConfig.ICON_SEARCH}
                />
                <Text className="searchFloateText">搜索您想咨询的医生姓名</Text>
              </View>
              <Image
                style={{ width: "100%" }}
                src={bannerUrl}
                mode="widthFix"
              />
              {isLogin && selectedSubList.length > 0 && (
                <View className="bottomFloatBg">
                  <View className="tabContainer">
                    {tabList.map((item, index) => (
                      <View
                        key={item.id}
                        className={
                          selectType === "recommend"
                            ? "tab-item-normal-recommend"
                            : currentSelectedIndex === index
                            ? "tab-item-active"
                            : "tab-item-normal"
                        }
                        onClick={this.switchTab(index)}
                      >
                        {item.title}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
            {isLogin && selectedSubList.length > 0 && (
              <View className="consultingBlock">
                <Swiper
                  indicatorColor="rgba(255,255,255,.5)"
                  indicatorActiveColor="#fff"
                  current={currentScrollIndex}
                  nextMargin={
                    selectType === "consulting" || selectType === "followup"
                      ? "218rpx"
                      : "218rpx"
                  }
                  onChange={this.scrollChangeAction}
                  className={`weui-flex ${
                    selectType === "recommend"
                      ? "swiper-box-recommend"
                      : "swiper-box"
                  }`}
                >
                  {selectedSubList.map((item, index) => (
                    <SwiperItem key={String(index)}>
                      {selectType === "consulting" && (
                        <ConsultItem
                          item={item}
                          navigateToUrl={this.navigateTabItemDetail}
                        />
                      )}
                      {selectType === "followup" && (
                        <FollowupItem
                          item={item}
                          navigateToUrl={this.navigateTabItemDetail}
                        />
                      )}
                      {selectType === "recommend" && (
                        <RecommendDoctor
                          item={item}
                          navigateToUrl={this.navigateTabItemDetail}
                        />
                      )}
                    </SwiperItem>
                  ))}
                </Swiper>
              </View>
            )}
            {departmentsList.map(item => (
              <View className="departmentBlock" key={item.departmentIdx}>
                <View className="weui-flex departmentItem">
                  <Text className="topTitle">{item.title}</Text>
                  <View className="gridView">
                    {item.data.map(departItem => (
                      <View
                        key={departItem.gridIdx}
                        className="grid-item weui-flex"
                        onClick={() =>
                          this.Text(departItem.id, departItem.name)
                        }
                      >
                        <View className="grid-icon-container">
                          <Image
                            className="grid-icon"
                            src={departItem.imageUrl}
                          />
                        </View>
                        <Text className="departmentName">
                          {departItem.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
            <View className="white-spance-20" />
            <View
              className="questionButton"
              style={{
                height: isShowMenu
                  ? Taro.pxTransform(320)
                  : Taro.pxTransform(90)
              }}
            >
              <View
                className="weui-flex weui-flex-center consultation"
                onClick={this.questionAction}
              >
                <Image
                  src={imagesConfig.ICON_CUSTOMER_SERVICE}
                  style={{
                    width: Taro.pxTransform(80),
                    height: Taro.pxTransform(80)
                  }}
                />
              </View>
              <View
                className="weui-flex weui-flex-center"
                style={{
                  opacity: isShowMenu ? 1 : 0,
                  marginTop: Taro.pxTransform(20)
                }}
                onClick={this.consultNoticeClick}
              >
                <Text>咨询\n须知</Text>
              </View>
              {isDuringServiceTime && isDuringServiceTime !== "error" ? (
                <View
                  className="weui-flex weui-flex-center"
                  style={{
                    opacity: isShowMenu ? 1 : 0,
                    marginTop: Taro.pxTransform(20)
                  }}
                >
                  <Text>线上\n客服</Text>
                  <Button openType="contact" onContact={this.handleContact} />
                </View>
              ) : (
                <View
                  className="weui-flex weui-flex-center"
                  style={{
                    opacity: isShowMenu ? 1 : 0,
                    marginTop: Taro.pxTransform(20)
                  }}
                  onClick={this.contactServicer}
                >
                  <Text>线上\n客服</Text>
                </View>
              )}
            </View>
            <View className="ripple rippleStyler" />
          </View>
        )}
      </Block>
    );
  }
}

export default ConsultOnline as ComponentType;
