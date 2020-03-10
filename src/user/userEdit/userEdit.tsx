import Taro, { Component } from "@tarojs/taro";
import { observer, inject } from "@tarojs/mobx";
import { View, Text, Form, Image, Input, Button } from "@tarojs/components";
import { config, imagesConfig, api } from "@/constants";

import "./userEdit.scss";

type PageStateProps = {
  commonStore: {
    isIpx: boolean;
    getBanners: Function;
  };
  userStore: {
    loginInfo: object;
    editUserInfo: Function;
    getUploadToken: Function;
    selectImages: Function;
  };
};

interface UserEdit {
  props: PageStateProps;
}

@inject("commonStore", "userStore")
@observer
class UserEdit extends Component {
  state = {
    uploadToken: "",
    userInfo: {}
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { userStore } = this.props;
    this.updateUploadToken();
    this.setState({ userInfo: userStore.loginInfo });
  };

  updateUploadToken = async () => {
    const { userStore } = this.props;
    const uploadToken = await userStore.getUploadToken();
    this.setState({ uploadToken });
  };

  onShareAppMessage() {
    return config.shareConfig;
  }

  nickNameInputEvent = e => {
    const { userInfo } = this.state;
    userInfo.nickname = e.detail.value;
    this.setState({ userInfo });
  };

  selectImages = async () => {
    const { userStore } = this.props;
    const { userInfo, uploadToken } = this.state;
    userStore.selectImages({
      uploadToken,
      success: photoLink => {
        userInfo.photoLink = photoLink;
        this.setState({ userInfo });
      },
      fail: err => {
        if (err === "No Token") {
          this.updateUploadToken();
        }
      }
    });
  };

  submitEvent = () => {
    const { userStore } = this.props;
    const { userInfo } = this.state;
    userStore.editUserInfo(userInfo);
  };

  render() {
    const {
      commonStore: { isIpx },
      userStore: { loginInfo }
    } = this.props;
    return (
      <View
        style={{
          paddingBottom: isIpx ? Taro.pxTransform(170) : Taro.pxTransform(130)
        }}
      >
        <Form onSubmit={this.submitEvent}>
          <View className="topInfoBlock">
            <View
              className="userPhotoView weui-flex"
              onClick={this.selectImages}
            >
              <Text className="zz-main__text">头像</Text>
              <Image
                className="photo"
                src={
                  loginInfo.photoLink
                    ? loginInfo.photoLink
                    : imagesConfig.DISTINCT_USER_COMMON
                }
              />
              <View
                className="zz-horizontal-line"
                style={{ bottom: 0, marginLeft: Taro.pxTransform(30) }}
              />
            </View>
            <View className="nickNameView weui-flex zz-main__text">
              <Text className="leftTitle">昵称</Text>
              <Input
                onInput={this.nickNameInputEvent}
                value={loginInfo.nickname}
                type="text"
                placeholder="请输入昵称"
                style="flex: 1"
                className="zz-main__text"
              />
            </View>
          </View>
          <View className="phoneInfoBlock weui-flex zz-main__text">
            <Text className="leftTitle">手机号</Text>
            {loginInfo.phone}
          </View>
          {/* 固定底部按钮 */}
          <View
            className="zz-fixed-bottom-view"
            style={{ paddingBottom: isIpx ? Taro.pxTransform(38) : 0 }}
          >
            <View className="zz-horizontal-line" style={{ top: 0 }} />
            <Button
              formType="submit"
              className="zz-fixed-bottom-button confirmButton"
            >
              保存
            </Button>
          </View>
        </Form>
      </View>
    );
  }
}

export default UserEdit;
