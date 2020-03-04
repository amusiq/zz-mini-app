import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { consultTools } from "@/tools";

import "./index.scss";

type propsType = {
  item: object;
  navigateTo: Function;
};

type stateType = {};

interface RecommendDoctor {
  props: propsType;
  state: stateType;
}

class RecommendDoctor extends Component {
  static defaultProps = {
    item: {},
    navigateTo: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { item, navigateTo } = this.props;
    return (
      <View onClick={() => navigateTo(item)} className="weui-flex consult-item">
        <Image className="doctorImg" src="{{item.imageUrl}}" />
        <View className="weui-flex doctorInfoContainer">
          <View className="weui-flex doctorInfoNameService">
            <Text className="doctorName">{item.name}</Text>
            <Text className="serviceContainer">{item.serviceName}</Text>
          </View>
          <Text className="consultType">{item.note}</Text>
        </View>
        <Image
          className="consultStatus"
          src={consultTools.getDoctorStatusImage(item.recommendType)}
        />
      </View>
    );
  }
}

export default RecommendDoctor as ComponentType;
