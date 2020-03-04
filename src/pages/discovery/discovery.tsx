import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, WebView, Block, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { config } from "@/constants";
import { SearchInput, SwiperComponent } from "@/components";

import "./discovery.scss";

type PageStateProps = {
  discoveryStore: {
    banners: [];
    getBanners: Function;
  };
};

interface Discovery {
  props: PageStateProps;
}

@inject("discoveryStore")
@observer
class Discovery extends Component {
  config: Config = {
    navigationBarTitleText: "发现"
  };

  componentWillMount() {
    const { discoveryStore } = this.props;
    discoveryStore.getBanners();
  }

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  turnToSearch = () => {};

  render() {
    const {
      discoveryStore: { banners }
    } = this.props;
    const guideUrl = "https://mp.weixin.qq.com/s/e-AJuZtAl9rr6-lU6F6GEQ";
    const { language } = config;
    const courses = [];
    const newest = {
      list: []
    };
    return (
      <Block>
        {language === "EN" || language === "en" ? (
          <WebView src={guideUrl} />
        ) : (
          <View className="discovery-container">
            <SearchInput
              placeholder="输入标题、症状、作者来搜索文章"
              disabled
              onClick={this.turnToSearch}
            />
            <SwiperComponent
              autoplay
              circular
              indicatorDots={banners.length > 1}
              source={banners}
              onClick={this.onClickAD}
              key="articleId"
            />
            <View>
              <View className="zz-title">健康课程</View>
              <View className="course-content">
                {courses.map(item => (
                  <View
                    key={item.title}
                    className="course-item"
                    onClick={() => this.onClickCourse(item.type)}
                  >
                    <Image
                      className="course-item__icon"
                      src={item.icon}
                      lazyLoad
                    />
                    <View className="course-item-info">
                      <View className="course-title">{item.title}</View>
                      <View className="course-subtitle">{item.subtitle}</View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <View className="zz-title" style={{ marginBottom: 0 }}>
                最新科普
              </View>
              <View className="newest-content">
                {newest.list.map(item => (
                  <View
                    className="newest-item"
                    onClick={() => this.onClickArticle(item)}
                    key={item.id}
                  >
                    <View className="newest-item-top row-stretch-between">
                      <View className="col-start-between">
                        <Text className="newest-item__title">{item.title}</Text>
                        <Text className="newest-item__author">
                          {item.author}
                        </Text>
                      </View>
                      <Image
                        className="newest-item__picture"
                        src={item.thumb}
                        mode="aspectFill"
                      />
                    </View>
                    <View className="newest-item-bottom row-stretch-between">
                      <View className="row-center-start">
                        {item.labels.map(label => (
                          <View
                            key={label.id}
                            className="newest-item__tag"
                            onClick={() => this.onClickTag(label)}
                          >
                            {label.name}
                          </View>
                        ))}
                      </View>
                      <View className="newest-item__time">
                        {item.published}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </Block>
    );
  }
}

export default Discovery as ComponentType;
