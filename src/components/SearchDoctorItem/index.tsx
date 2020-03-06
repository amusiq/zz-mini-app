import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Block } from "@tarojs/components";
import { imagesConfig } from "@/constants";

import "./index.scss";

type propsType = {
  data: {
    name: string;
    imageUrl: string;
    visitIntro: string;
    service: [string];
    introduction: string;
    tagsList: [string];
  };
  navigateToUrl: Function;
};

interface SearchDoctorItem {
  props: propsType;
}

class SearchDoctorItem extends Component {
  static defaultProps = {
    data: {
      name: "",
      imageUrl: "",
      visitIntro: "",
      introduction: "",
      service: [],
      tagsList: []
    },
    navigateToUrl: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { data, navigateToUrl } = this.props;
    return (
      <View onClick={() => navigateToUrl(data)} className="seperateLine">
        <View className="weui-flex-col doctorItem">
          <View className="weui-flex doctorInfo">
            <Image className="doctorImage" src={data.imageUrl} />
            <Text className="zz-text__bigger_title doctorName">
              {data.name}
            </Text>
            {!!data.visitIntro && (
              <View className="cityView weui-flex">
                <Image
                  className="iconLocation"
                  src={imagesConfig.LOCATION_GRAY}
                />
                <Text className="zz-auxiliary__information">
                  {data.visitIntro}
                </Text>
              </View>
            )}
          </View>
          <View className="weui-flex serviceBlock" style={{ flexWrap: "wrap" }}>
            {data.service.map(serviceItem => (
              <Text key={serviceItem} className="serviceInfoText">
                {serviceItem}
              </Text>
            ))}
          </View>
          <View className="introductionBlock">
            <Text className="zz-auxiliary__information ellipse">
              {data.introduction}
            </Text>
          </View>
          <View className="weui-flex tagBlock" style={{ flexWrap: "wrap" }}>
            {data.tagsList.map(tag => (
              <Text key={tag} className="tagInfoText">
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default SearchDoctorItem as ComponentType;
