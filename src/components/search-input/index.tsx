import { ComponentType } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { SearchInput, IconFont } from "@components";

import "./index.scss";

type propsType = {
  value: string
  placeholder: string
  disabled: boolean
  maxLength: number
};

type stateType = {};

interface SearchInput {
  props: propsType
  state: stateType
}

class SearchInput extends Component {
  static defaultProps = {};

  onInput = () =>{
    console.log('onInput')
  }
  onConfirm = () =>{
    console.log('onInput')
  }
  onFocus = () =>{
    console.log('onInput')
  }

  render() {
    const { value, placeholder, disabled, maxLength } = this.props;
    return (
      <View className='search-input'>
        <IconFont type='search' />
        <Input className='search-input__input' value={value} type='text' placeholder={placeholder} placeholder-class='search-input__placeholder' onInput={this.onInput} onConfirm={this.onConfirm} onFocus={this.onFocus} disabled={disabled} maxLength={maxLength} />
        <IconFont type='roundclosefill' size='15' color='#D8D8D8' />
      </View>
    );
  }
}

export default SearchInput as ComponentType;
