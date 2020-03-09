import Taro, { Component } from "@tarojs/taro";
import { View, WebView } from "@tarojs/components";
import { config } from "@/constants";

type PageStateProps = {
  discoveryStore: {
    banners: [];
    newest: {
      hasNext: boolean;
      list: [];
      limit: number;
    };
    getBanners: Function;
    getArticleInfo: Function;
  };
};

interface WebView {
  props: PageStateProps;
}

class WebViewPage extends Component {
  state = {
    url: ""
  };
  componentDidMount() {
    this.init();
  }

  init = () => {
    const { q, type, link } = this.$router.params;
    if (q) {
      const url =
        "https://" +
          decodeURIComponent(
            decodeURIComponent(q).split("app.distinctclinic.com/")[1]
          ) ||
        "https://" +
          decodeURIComponent(
            decodeURIComponent(q).split("distinctclinic.com/dmsapp/")[1]
          );
      this.setState({ url });
    } else if (type === "article") {
      this.setState({ url: decodeURIComponent(link) });
    } else {
      Taro.getStorage({
        key: "web-view-url"
      }).then(res => {
        this.setState({ url: res.data });
      });
    }
  };

  onShareAppMessage(e) {
    const { type } = this.$router.params;
    if (type === "article") {
      return {
        title: "卓正科普",
        path: `/other/webView/webView?type=article&link=${encodeURIComponent(
          e.webViewUrl
        )}`,
        success: function(res) {}, // 转发成功
        fail: function(res) {} // 转发失败
      };
    } else {
      return config.shareConfig;
    }
  }

  render() {
    const { url } = this.state;
    return (
      <View>
        <WebView src={url} />
      </View>
    );
  }
}

export default WebViewPage;
