import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text,Image, Swiper, SwiperItem, WebView, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import {config, imagesConfig} from '@/constants';
import {ConsultItem,FollowupItem,RecommendDoctor} from '@/components'

import "./consultOnline.scss";

type PageStateProps = {
  consultOnlineStore: {
    counter: number;
    increment: Function;
  };
};

interface ConsultOnline {
  props: PageStateProps;
}

@inject("consultOnlineStore")
@observer
class ConsultOnline extends Component {
  config: Config = {
    navigationBarTitleText: "问诊"
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  navigateTabItemDetail=()=>{}

  render() {
    const {
      consultOnlineStore: { counter }
    } = this.props;
    const {language}=config;
    const tabList =[];
    const isShowConsultingBlock = false;
    const selectedSublist = [];
    const aboutUrl = 'https://mp.weixin.qq.com/s/9iIFqLqtk0oKwYWv-W1h1w';
    const bannerUrl = 'https://file-storage.distinctclinic.com/miniapp/static/icon_consultation.png';
    const selectType= '';
    const currentScrollIndex= 0;
    const departmentsList =[];
    const isShowMenu =false;
    const isDuringServiceTime ='';
    return <Block>
      {(language === 'EN' || language === 'en')?<WebView src={aboutUrl} />:(
      <View>
        <View className="imageContainer">
            <View className="justify-align-center searchFloateContainer" onClick={this.onClickSearch}>
                <Image className="searchFloateImage" src={imagesConfig.ICON_SEARCH}/>
                <Text className="searchFloateText">搜索您想咨询的医生姓名</Text>
            </View>
            <Image style={{width:'100%'}} src={bannerUrl} mode="widthFix" />
            {isShowConsultingBlock && selectedSublist.length > 0&&<View className="bottomFloatBg">
                <View className="tabContainer">
                  {tabList.map((item,index)=><View key={item.id} className={selectType === 'recommend' ? 'tab-item-normal-recommend' : currentSelectedIndex === index ? 'tab-item-active' : 'tab-item-normal'} onClick={this.switchTab(index)}>{item.title}</View>)}
                </View>
            </View>}
        </View>
        {isShowConsultingBlock && selectedSublist.length > 0 &&(<View className="consultingBlock">
            <Swiper
                indicatorColor="rgba(255,255,255,.5)"
                indicatorActiveColor="#fff"
                current={currentScrollIndex}
                nextMargin={(selectType === 'consulting' || selectType === 'followup') ? '218rpx' : '218rpx'}
                onChange={this.scrollChangeAction}
                className={`weui-flex ${selectType === 'recommend' ? 'swiper-box-recommend' : 'swiper-box'}`}>
                  {selectedSublist.map((item,index)=>( <SwiperItem key={String(index)}>
                      {selectType === 'consulting' &&
                            <ConsultItem index={index} item={item} navigateToUrl={this.navigateTabItemDetail} />
                        }
                        {selectType === 'followup'&&
                            <FollowupItem index={index} item={item} navigateToUrl={this.navigateTabItemDetail} />
                        }
                        {selectType === 'recommend' && 
                            <RecommendDoctor index={index} item={item} navigateToUrl={this.navigateTabItemDetail} />
                        }
                    </SwiperItem>))}
            </Swiper>
        </View>)}
        {departmentsList.map(item=>(<View className="departmentBlock"  key={item.departmentIdx}>
            <View className="weui-flex departmentItem">
              <Text className="topTitle">{item.title}</Text>
              <View className="gridView">
                {item.data.map((departItem)=>(<View key={departItem.gridIdx} className="grid-item weui-flex" onClick={()=>this.Text(departItem.id,departItem.name)}>
                          <View className="grid-icon-container">
                              <Image className="grid-icon" src={departItem.imageUrl} />
                          </View>
                          <Text className="departmentName">{departItem.name}</Text>
                      </View>))}
              </View>
            </View>
        </View>))}
        <View className="white-spance-20" />
        <View className="questionButton" style="height:{{isShowMenu ? '320rpx' : '90rpx'}}">
            <View className="weui-flex weui-flex-center consultation" onClick={this.questionAction}>
                <Image src={ imagesConfig.ICON_CUSTOMER_SERVICE } style={{width:'80rpx',height:'80rpx'}} />
            </View>
            <View className="weui-flex weui-flex-center" style={{opacity:isShowMenu ? 1 :0, marginTop: '20rpx'}} onClick={this.consultNoticeClick}><Text>咨询\n须知</Text></View>
            {isDuringServiceTime && isDuringServiceTime !== 'error'?<View className="weui-flex weui-flex-center" style={{opacity:isShowMenu ? 1 :0,marginTop:'20px'}}><Text>线上\n客服</Text><Button openType="contact" onContact={this.handleContact} /></View>:<View className="weui-flex weui-flex-center" style={{opacity:isShowMenu ? 1 :0;marginTop:'20px'}} onClick={this.contactServicer}><Text>线上\n客服</Text></View>}
        </View>
        <View className="ripple rippleStyler" />
    </View>)}
</Block>;
  }
}

export default ConsultOnline as ComponentType;
