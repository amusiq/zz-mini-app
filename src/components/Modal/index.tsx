import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { Button } from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";

import "./index.scss";

type propsType = {
  isOpened: boolean;
  title: any;
  content: any;
  renderTitle: any;
  renderContent: any;
  cancelText: string;
  confirmText: string;
  onCancel: Function;
  onConfirm: Function;
};

interface Modal {
  props: propsType;
}

class Modal extends Component {
  static defaultProps = {
    isOpened: false,
    renderTitle: "",
    renderContent: "",
    cancelText: "取消",
    confirmText: "确定",
    onCancel: () => {},
    onConfirm: () => {}
  };

  render() {
    const {
      isOpened,
      cancelText,
      confirmText,
      onCancel,
      onConfirm
    } = this.props;
    return (
      <AtModal isOpened={isOpened}>
        <AtModalHeader>{this.props.renderTitle}</AtModalHeader>
        <AtModalContent>{this.props.renderContent}</AtModalContent>
        <AtModalAction>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </AtModalAction>
      </AtModal>
    );
  }
}

export default Modal as ComponentType;
