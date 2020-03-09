import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Input, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { imagesConfig } from "@/constants";
import { SearchDoctorItem, EmptyView, Modal } from "@/components";
import { navTo } from "@/tools";

import "./doctorSearch.scss";

type PageStateProps = {
  doctorSearchStore: {
    doctorList: [];
    doctorData: { hasNext: boolean };
    isDidLoadData: boolean;
    init: Function;
    getDoctors: Function;
  };
};

interface DoctorSearch {
  props: PageStateProps;
}

@inject("doctorSearchStore")
@observer
class DoctorSearch extends Component {
  config: Config = {
    navigationBarTitleText: "搜索医生"
  };

  state = {
    searchValue: "",
    showAlert: false,
    tempId: ""
  };

  componentDidMount() {
    const { doctorSearchStore } = this.props;
    doctorSearchStore.init();
  }

  searchEvent = e => {
    const { doctorSearchStore } = this.props;
    doctorSearchStore.getDoctors(e.detail.value, true);
  };

  searchInputEvent = e => {
    this.setState({ searchValue: e.detail.value });
  };

  onReachBottom = () => {
    const { searchValue } = this.state;
    const { doctorSearchStore } = this.props;
    if (doctorSearchStore.doctorData.hasNext) {
      doctorSearchStore.getDoctors(searchValue);
    }
  };

  navigateToUrl = data => {
    if (Taro.getStorageSync("ignoreAppointTip")) {
      navTo({ target: "doctorDetail", params: { id: data.id } });
    } else {
      this.setState({ showAlert: true, tempId: data.id });
    }
  };

  ignozeBtnClick = () => {
    const { tempId } = this.state;
    this.setState({ showAlert: false });
    Taro.setStorageSync("ignoreAppointTip", true);
    navTo({ target: "doctorDetail", params: { id: tempId } });
  };

  goonBtnClick = () => {
    const { tempId } = this.state;
    this.setState({ showAlert: false });
    navTo({ target: "doctorDetail", params: { id: tempId } });
  };

  render() {
    const {
      doctorSearchStore: {
        doctorData: { hasNext },
        doctorList,
        isDidLoadData
      }
    } = this.props;
    const { showAlert } = this.state;
    return (
      <View className="doctor-search-container">
        <View className="weui-flex searchBlock">
          <View className="weui-flex searchContainerItem">
            <Image
              className="searchImageStyle"
              src={imagesConfig.ICON_SEARCH}
            />
            <Input
              type="text"
              confirmType="search"
              onConfirm={this.searchEvent}
              onInput={this.searchInputEvent}
              focus
              className="searchTextStyle"
              placeholderStyle="color: #AAB5B6"
              placeholder="搜索您想就诊的医生或科室"
            />
          </View>
        </View>
        <View className="doctorListBlock">
          {doctorList.map((item, idx) => (
            <SearchDoctorItem
              key={String(idx)}
              data={item}
              navigateToUrl={this.navigateToUrl}
            />
          ))}
        </View>
        {!hasNext && doctorList.length > 0 && (
          <View className="justify-align-center">
            <Image className="empty-logo-style" src={imagesConfig.ICON_LOGO} />
          </View>
        )}

        {doctorList.length === 0 && isDidLoadData && (
          <View className="emptyContainer">
            <EmptyView
              emptyTips={`没有找到符合要求的医生\n换个关键词试试`}
              imageUrl={imagesConfig.ICON_DOCTOR_EMPTY}
              emptyImageSize={{
                width: Taro.pxTransform(150),
                height: Taro.pxTransform(150)
              }}
            />
          </View>
        )}
        <Modal
          isOpened={showAlert}
          renderTitle={<Text>Tips</Text>}
          renderContent={
            <Text>
              医生可能在不同诊所、科室出诊，请您在提交预约前确认
              <Text style={{ color: "#006d82", fontWeight: 600 }}>
                诊所、时间及科室
              </Text>
            </Text>
          }
          cancelText="不再提醒"
          confirmText="继续"
          onConfirm={this.ignozeBtnClick}
          onCancel={this.goonBtnClick}
        />
      </View>
    );
  }
}

export default DoctorSearch;
