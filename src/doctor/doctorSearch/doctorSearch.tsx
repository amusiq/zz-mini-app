import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { imagesConfig } from "@/constants";
import { SearchDoctorItem, EmptyView } from "@/components";
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
    showAlert: false
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

  onReachBottom() {
    const { searchValue } = this.state;
    const { doctorSearchStore } = this.props;
    if (doctorSearchStore.doctorData.hasNext) {
      doctorSearchStore.getDoctors(searchValue);
    }
  }

  navigateToUrl = data => {
    if (Taro.getStorageSync("ignoreAppointTip")) {
      navTo({ target: "doctorDetail", params: { id: data.id } });
    } else {
      this.setState({ showAlert: true, tempId: data.id });
    }
  };

  render() {
    const {
      doctorSearchStore: {
        doctorData: { hasNext },
        doctorList,
        isDidLoadData
      }
    } = this.props;
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
      </View>
    );
  }
}

export default DoctorSearch;
