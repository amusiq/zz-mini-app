import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import "./doctorSearch.scss";

type PageStateProps = {
  homeStore: {
    banners: [];
    getBanners: Function;
  };
};

interface DoctorSearch {
  props: PageStateProps;
}

@inject("homeStore")
@observer
class DoctorSearch extends Component {
  config: Config = {
    navigationBarTitleText: "搜索医生"
  };

  render() {
    return <View>搜索医生</View>;
  }
}

export default DoctorSearch;
