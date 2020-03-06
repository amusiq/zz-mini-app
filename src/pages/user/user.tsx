import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Block, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { CustomMenu } from "@/components";
import { config, appConfig, imagesConfig } from "@/constants";

import "./user.scss";

type PageStateProps = {
  userStore: {
    loginInfo: object;
    incrementAsync: Function;
  };
};

interface User {
  props: PageStateProps;
}

@inject("userStore")
@observer
class User extends Component {
  config: Config = {
    navigationBarTitleText: "我的"
  };

  state = {};

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {}

  editUserInfo = () => {};

  menuClick = key => {
    console.log(key);
  };

  render() {
    const {
      userStore: { loginInfo }
    } = this.props;
    const { language } = config;
    const {
      myOrderCategoryList,
      userRelationConfigs_CN,
      userRelationConfigs_EN
    } = appConfig;
    const userRelationConfigs =
      language === "CN" ? userRelationConfigs_CN : userRelationConfigs_EN;
    const followUpPeddingNumbers = 0;
    const totalCount = 0;
    console.log(myOrderCategoryList, "myOrderCategoryList");
    return (
      <Block>
        <View className="user-container">
          <View className="weui-flex userInfoBlock" onClick={this.editUserInfo}>
            <Image
              className="userImage"
              src={
                loginInfo.photoLink
                  ? loginInfo.photoLink
                  : imagesConfig.DISTINCT_USER_COMMON
              }
            />
            <Text
              className={
                loginInfo.nickname ? "zz-text__bigger_title" : "zz-input__tips"
              }
            >
              {loginInfo.nickname ? loginInfo.nickname : "请填写昵称"}
            </Text>
            <View className="rightView weui-flex">
              <Image className="arrow" src={imagesConfig.RIGHT_ARROW} />
            </View>
          </View>
          {language === "CN" && (
            <View className="myOrderBlock">
              <View className="zz-common-title zz-main__text">
                <View className="zz-vertical-line" />
                我的订单
              </View>
              <View className="weui-flex categoryBlock">
                {myOrderCategoryList.map((item, index) => (
                  <View key={`${index}`}>
                    <View
                      className={`orderCategoryItem weui-flex ${
                        totalCount > 0 ? "" : "noFollowUpItem"
                      }`}
                      onClick={() => this.menuClick(item.key)}
                    >
                      <Image className="categoryIcon" src={item.icon} />
                      <Text className="zz-text__second_title">
                        {item.title}
                      </Text>
                      {item.key === "followup" &&
                        followUpPeddingNumbers > 0 && (
                          <Text className="redNumber">
                            {followUpPeddingNumbers}
                          </Text>
                        )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        <View className="personalFileBlock">
          {userRelationConfigs.map((sectionItem, idx) => (
            <View key={`${idx}`} className="section">
              {sectionItem.length > 0 &&
                sectionItem.map(menuItem => (
                  <CustomMenu
                    key={menuItem.key}
                    itemInfo={menuItem}
                    menuClick={this.menuClick}
                  />
                ))}
            </View>
          ))}
        </View>
      </Block>
    );
  }
}

export default User;
