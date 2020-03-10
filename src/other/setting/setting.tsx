import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { config, imagesConfig } from "@/constants";
import { IconFont } from "@/components";

import "./setting.scss";

class Setting extends Component {
  componentDidMount() {}

  changeLanguage = language => {
    console.log(language);
  };

  clearStorage = () => {};

  render() {
    const { language } = config;
    return (
      <View>
        <View
          className="menuContainer weui-flex"
          hoverClass="hoverView"
          onClick={() => this.changeLanguage("CN")}
        >
          <Text className="menuTitle">中文</Text>
          <View className="rightBlock weui-flex">
            {language === "CN" && (
              <IconFont color="#006d82" size={40} type="check" />
            )}
          </View>
          <View className="seperateLine" />
        </View>
        <View
          className="menuContainer weui-flex"
          hoverClass="hoverView"
          onClick={() => this.changeLanguage("EN")}
        >
          <Text className="menuTitle">英文</Text>
          <View className="rightBlock weui-flex">
            {language === "EN" && (
              <IconFont color="#006d82" size={40} type="check" />
            )}
          </View>
        </View>
        <View
          className="menuContainer weui-flex"
          style={{ marginTop: Taro.pxTransform(20) }}
          hoverClass="hoverView"
          onClick={this.clearStorage}
        >
          <Text className="menuTitle">清除缓存</Text>
          <View className="rightBlock weui-flex">
            <Image className="arrow" src={imagesConfig.RIGHT_ARROW} />
          </View>
        </View>
      </View>
    );
  }
}

export default Setting;
