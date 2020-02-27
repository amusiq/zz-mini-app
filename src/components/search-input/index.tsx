import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { SearchInput } from '@components';

import './index.scss';

type propsType = {
}

type stateType = {
}

interface SearchInput {
  props: propsType
  state: stateType
}

class SearchInput extends Component{
    static defaultProps = {
        compStyle: '',
        textStyle: '',
        openType: '',
        plain: false,
        loading: false,
        disabled: false,
        onClick: () => {},
        onGetUserInfo: () => {}
      }

      render () {
        const {} = this.props;
        return (
          <View className='search-input' >
            搜索
          </View>
        )
      }
}

export default SearchInput as ComponentType;