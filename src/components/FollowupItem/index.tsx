import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { consultTool } from "@/tools";

import "./index.scss";

type propsType = {
  itemInfo: object;
  menuClick: Function;
};

type stateType = {};

interface FollowupItem {
  props: propsType;
  state: stateType;
}

class FollowupItem extends Component {
  static defaultProps = {
    item: {},
    menuClick: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  navigateTo = item => {};

  render() {
    const { item } = this.props;
    return (
      <View
        onClick={() => this.navigateTo(item)}
        className="weui-flex consult-item"
      >
        <Image
          className="doctorImg"
          src={item.doctor ? item.doctor.imageUrl : ""}
        />
        <View className="weui-flex doctorInfoContainer">
          <View className="weui-flex doctorInfoNameService">
            <Text className="doctorName">{item.doctor.name}</Text>
            <Text className="serviceContainer">{item.service.name}</Text>
          </View>
          {item.statusName === "待发起" ? (
            <Text className="consultType">
              有效期：{consultTool.getFormatDate(item.followUpExpiredDate)}
              （剩余
              <Text style={{ color: "#FFAF27" }}>
                {consultTool.timeDifference(item.followUpExpiredSurplusTime)}
              </Text>
              ）
            </Text>
          ) : (
            <Text className="consultType">线上随访</Text>
          )}
        </View>
        <Image
          className="consultStatus"
          src={consultTool.getConsultStatusImage(item.statusName)}
        />
      </View>
    );
  }
}

export default FollowupItem as ComponentType;
