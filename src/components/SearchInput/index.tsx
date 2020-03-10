import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { SearchInput, IconFont } from "@/components";

import "./index.scss";

type propsType = {
  value: string;
  placeholder: string;
  disabled: boolean;
  maxLength: number;
  onInput: Function;
  onFocus: Function;
  onBlur: Function;
  onConfirm: Function;
  onClick: Function;
};

type stateType = {};

interface SearchInput {
  props: propsType;
  state: stateType;
}

class SearchInput extends Component {
  static defaultProps = {
    value: "",
    placeholder: "",
    disabled: false,
    maxLength: 500,
    onInput: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {},
    onClick: () => {}
  };

  handleInput = e => {
    this.props.onInput(e.detail.value);
  };
  handleClear = () => {
    this.props.onInput("");
  };

  render() {
    const {
      value,
      placeholder,
      disabled,
      maxLength,
      onClick,
      onConfirm,
      onFocus,
      onBlur
    } = this.props;
    return (
      <View className="search-input" onClick={onClick}>
        <IconFont type="search" />
        <Input
          className="search-input__input"
          value={value}
          type="text"
          placeholder={placeholder}
          placeholderClass="search-input__placeholder"
          onInput={this.handleInput}
          onConfirm={onConfirm}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
        />
        {!!value && (
          <View onClick={this.handleClear}>
            <IconFont type="roundclosefill" size={15} color="#D8D8D8" />
          </View>
        )}
      </View>
    );
  }
}

export default SearchInput as ComponentType;
