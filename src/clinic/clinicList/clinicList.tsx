import Taro, { Component, Config, pxTransform } from "@tarojs/taro";
import { observer, inject } from "@tarojs/mobx";
import { View, Text, Map, Image, Input, ScrollView } from "@tarojs/components";
import { imagesConfig } from "@/constants";
import { ClinicItem } from "@/components";

import "./clinicList.scss";

type PageStateProps = {
  commonStore: {
    location: object;
    getCurrentCityInfo: Function;
  };
  clinicStore: {
    clinicData: object;
    getSameClinicList: Function;
  };
};

interface ClinicList {
  props: PageStateProps;
}

@inject("commonStore", "clinicStore")
@observer
class ClinicList extends Component {
  config: Config = {
    navigationBarTitleText: "诊所网点"
  };

  state = {
    scale: 10,
    searchKey: ""
  };

  onInput = () => {};

  searchEvent = () => {
    const { clinicStore } = this.props;
    this.start = 0; // 初始下标
    this.hasNext = true; // 是否继续加载
    this.markers = [];
    this.clinicList = [];
    this.clinicListGlobal = [];
    this.getClinicList();
  };

  selectCityEvent = () => {};

  onScrollToLower = () => {};

  onMarkerTap = e => {
    const { clinicStore } = this.props;
    Taro.showLoading({ mask: true });
    clinicStore.getSameClinicList(e.detail.markerId);
    // 重新渲染中心点
    if (clinicStore.clinicList.length > 0) {
      const firstLocation = clinicStore.clinicList[0];
      this.latitude = firstLocation.latitude;
      this.longitude = firstLocation.longitude;
    }
    Taro.hideLoading();
    this.setState({ scale: 16 });
  };

  onRegionChange = () => {
    const { scale } = this.state;
    if (!scale) return;
    this.setState({ scale: "" });
  };

  render() {
    const {
      commonStore: { location },
      clinicStore: { clinicData }
    } = this.props;
    const { scale } = this.state;
    const markers = "";
    const clinicNumber = clinicData.list.length;
    const cityName = "";
    return (
      <View className="clinicListContainer">
        {/* 占比45 */}
        <View className="topContainer">
          {/*  上部分地图  */}
          <Map
            className="mapStyle"
            id="distinctMap"
            latitude={location.latitude}
            longitude={location.longitude}
            markers={markers}
            scale={scale}
            showScale
            showLocation
            onMarkerTap={this.onMarkerTap}
            onRegionChange={this.onRegionChange}
          ></Map>
          <View className="searchContainer">
            <Image src={imagesConfig.ICON_SEARCH} className="searchIcon" />
            <Input
              onInput={this.onInput}
              onConfirm={this.searchEvent}
              className="searchInput"
              confirm-type="search"
              placeholder="搜索网点"
            />
          </View>
          {/* 诊所定位和数量  */}
          <View className="containerTitle">
            <View className="containerLocation" onClick={this.selectCityEvent}>
              <Image
                src={imagesConfig.ICON_LOCATION_BLUE}
                style={{ width: Taro.pxTransform(35), height: pxTransform(38) }}
              />
              <Text className="textLocation">{cityName}</Text>
            </View>
            <Text className="clinicNumber">共 {clinicNumber} 家诊所</Text>
          </View>
        </View>
        {/* 诊所列表 占比55 */}
        <ScrollView
          scrollY
          className="bottomContainer"
          onScrollToLower={this.onScrollToLower}
          lowerThreshold={30}
        >
          {clinicData.list.map((item, index) => (
            <ClinicItem
              key={String(index)}
              item={item}
              index={index}
              clinicDetailEvent="clinicDetailEvent"
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ClinicList;
