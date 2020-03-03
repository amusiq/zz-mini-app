import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image, Text } from "@tarojs/components";

import "./index.scss";

type ISource = {
  picture: string;
  title: string;
};

type propsType = {
  source: ISource[];
  indicatorDots: boolean;
  autoplay: boolean;
  interval: number;
  duration: number;
  circular: boolean;
  onInput: Function;
  onFocus: Function;
  onBlur: Function;
  onConfirm: Function;
  onClick: Function;
};

type stateType = {};

interface SwiperComponent {
  props: propsType;
  state: stateType;
}

class SwiperComponent extends Component {
  static defaultProps = {
    source: []
  };

  render() {
    const {
      source,
      indicatorDots,
      autoplay,
      interval,
      duration,
      circular
    } = this.props;
    return (
      <View>
        <Swiper
          current={0}
          indicatorDots={indicatorDots}
          autoplay={autoplay}
          interval={interval}
          duration={duration}
          circular={circular}
          indicatorColor="rgba(255,255,255,.5)"
          indicatorActiveColor="#fff"
        >
          {source.map(item => (
            <SwiperItem key={item.picture}>
              <Image
                className="swiper__slide-image"
                src={item.picture}
                mode="aspectFill"
                lazy-load
              />
              {!!item.title && (
                <View className="swiper__text-box">
                  <Text>{item.title}</Text>
                </View>
              )}
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}

export default SwiperComponent;
