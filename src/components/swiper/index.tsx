import Taro, { Component } from '@tarojs/taro';
import { Button, Text } from '@tarojs/components';

import './index.scss';

export default class SwiperComponent extends Component{
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
        const {
          compStyle, textStyle, openType, loading, disabled, text,
          onClick, onGetUserInfo
        } = this.props;
        return (
          <Button
            className={this.getCls('comp-button')}
            style={postcss(compStyle)}
            loading={loading}
            disabled={disabled}
            openType={openType}
            onClick={onClick}
            onGetUserInfo={onGetUserInfo}
          >
            <Text
              className={this.getCls('comp-button__txt')}
              style={textStyle}
            >
              {text}
            </Text>
          </Button>
        )
      }
}