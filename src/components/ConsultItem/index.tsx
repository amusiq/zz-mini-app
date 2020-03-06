import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { consultTool } from "@/tools";

import "./index.scss";

type propsType = {
  item: {
    doctor: {
      name: string;
      imageUrl: string;
    };
    service: {
      name: string;
    };
    consultType: string;
    statusName: string;
  };
  navigateTo: Function;
};

type stateType = {};

interface ConsultItem {
  props: propsType;
  state: stateType;
}

class ConsultItem extends Component {
  static defaultProps = {
    item: {
      doctor: {
        name: "",
        imageUrl: ""
      },
      service: {
        name: ""
      }
    },
    navigateTo: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { item, navigateTo } = this.props;
    return (
      <View onClick={() => navigateTo(item)} className="weui-flex consult-item">
        <Image
          className="doctorImg"
          src={item.doctor ? item.doctor.imageUrl : ""}
        />
        <View className="weui-flex doctorInfoContainer">
          <View className="weui-flex doctorInfoNameService">
            <Text className="doctorName">{item.doctor.name}</Text>
            <Text className="serviceContainer">{item.service.name}</Text>
          </View>
          <Text className="consultType">
            {item.consultType === "text" ? "图文咨询" : "电话咨询"}
          </Text>
        </View>
        <Image
          className="consultStatus"
          src={consultTool.getConsultStatusImage(item.statusName)}
        />
      </View>
    );
  }
}

export default ConsultItem as ComponentType;
