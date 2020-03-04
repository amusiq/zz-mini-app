import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { imagesConfig } from "@/constants";

import "./index.scss";

type IItemInfo = {
  key: string;
  title: string;
  subTitle: string;
  isShowSubTitle: boolean;
  isHideBottomLine: boolean;
  icon: string;
  rightIcon: string;
  isShowRedCircle: boolean;
};

type propsType = {
  itemInfo: IItemInfo;
  rightIcon: string;
  menuClick: Function;
};

type stateType = {};

interface CustomMenu {
  props: propsType;
  state: stateType;
}

class CustomMenu extends Component {
  static defaultProps = {
    itemInfo: {
      key: "",
      title: "",
      subTitle: "",
      isShowSubTitle: false,
      isHideBottomLine: false,
      icon: "",
      rightIcon: imagesConfig.RIGHT_ARROW,
      isShowRedCircle: false
    },
    rightIcon: imagesConfig.RIGHT_ARROW,
    menuClick: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { itemInfo, rightIcon, menuClick } = this.props;
    return (
      <View
        className="menuContainer weui-flex"
        hoverClass="hoverView"
        onClick={() => menuClick(itemInfo.key)}
      >
        {!!itemInfo.icon && <Image className="menuIcon" src={itemInfo.icon} />}

        <Text className="menuTitle">{itemInfo.title}</Text>
        <View className="rightBlock weui-flex">
          {!!itemInfo.isShowSubTitle && (
            <Text className="subTitle">{itemInfo.subTitle}</Text>
          )}
          {!!itemInfo.isShowRedCircle && <View className="redPoint"></View>}
          <Image
            className="arrow"
            src={itemInfo.rightIcon ? itemInfo.rightIcon : rightIcon}
          />
        </View>
        {!itemInfo.isHideBottomLine && (
          <View
            className="seperateLine"
            style={{
              left: itemInfo.icon ? Taro.pxTransform(102) : Taro.pxTransform(30)
            }}
          />
        )}
      </View>
    );
  }
}

export default CustomMenu as ComponentType;
