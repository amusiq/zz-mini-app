import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './consultOnline.scss'

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface ConsultOnline {
  props: PageStateProps
}

@inject('counterStore')
@observer
class ConsultOnline extends Component {

  config: Config = {
    navigationBarTitleText: '问诊'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='consultOnline'>
        问诊
      </View>
    )
  }
}

export default ConsultOnline  as ComponentType
