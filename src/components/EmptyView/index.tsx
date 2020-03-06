import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";

type propsType = {
  emptyImageSize: object;
  imageUrl: string;
  emptyTips: string;
};

interface EmptyView {
  props: propsType;
}

class EmptyView extends Component {
  static defaultProps = {
    emptyImageSize: {},
    imageUrl: "",
    emptyTips: ""
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { emptyImageSize, imageUrl, emptyTips } = this.props;
    return (
      <View className="weui-flex emptyView">
        <Image style={emptyImageSize} src={imageUrl} />
        <Text className="emptyTips">{emptyTips}</Text>
      </View>
    );
  }
}

export default EmptyView as ComponentType;
