import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";
import classnames from "classnames";

import "./index.scss";

type propsType = {
  type: string;
  color: string;
  size: number;
};

interface IconFont {
  props: propsType;
}

class IconFont extends Component {
  static defaultProps = {
    type: "",
    color: "#b2b2b2",
    size: 15
  };

  render() {
    const { type, color, size } = this.props;
    const cls = classnames("icon-font", type && `icon-${type}`);
    const style = { color, fontSize: Taro.pxTransform(size) };
    return <Text className={cls} style={style} />;
  }
}

export default IconFont as ComponentType;
