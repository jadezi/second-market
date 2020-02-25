<template>
  <div ref="box">
    <div class="title" v-show="titelAutoHide">
      <van-nav-bar
        :title="title"
        right-text="设置"
        @click-right="setup"
        left-arrow
        fixed
        :z-index = 99
      >
      </van-nav-bar>
    </div>
    <div class="head">
      <div class="bg">
        <img :src="bgimg" @load="resizeImg($event, getClientWidth(), 150)" />
      </div>
      <div class="user">
        <div class="userImg">
          <img :src="userImg" @load="resizeImg($event, 100, 100)" />
        </div>
        <div class="username">玩个字</div>
        <div class="label">困难总会过去</div>
        <div class="tags">
          <van-tag type="warning" size="large">浙江 宁波</van-tag>
        </div>
      </div>
    </div>
    <div class="history">
      <van-tabs>
        <van-tab title="在售中">
          <div v-for="(item, index) in items" :key="index">
            <showBlock :item="item" :index="index"></showBlock>
          </div>
        </van-tab>
        <van-tab title="已卖出">
          <div v-for="(item, index) in items" :key="index">
            <showBlock :item="item" :index="index"></showBlock>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import showBlock from "@/components/showblock.vue";
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  name: "my",
  components: { showBlock },
  data() {
    return {
      title: "个人中心",
      bgimg: "",
      userImg: "",
      titelAutoHide: false,
      items: [
        {
          img: "http://pic.wangez.cn/second-market/userbg.jpeg",
          desc: "123",
          price: "12"
        },
        {
          img: "http://pic.wangez.cn/second-market/userbg.jpeg",
          desc: "234",
          price: "13"
        },
        {
          img: "http://pic.wangez.cn/second-market/shop-logo.jpg",
          desc: "412",
          price: "14"
        },
        {
          img: "http://pic.wangez.cn/second-market/userbg.jpeg",
          desc: "123",
          price: "16"
        }
      ]
    };
  },
  mounted() {
    this.bgimg = this.$store.state.userInfo.uidBgUrl;
    this.userImg = this.$store.state.userInfo.uidImgUrl;
    window.addEventListener("scroll", this.scrollHandle);
    this.imgCache();
  },
  methods: {
    scrollHandle(e) {
      var top = e.srcElement.scrollingElement.scrollTop;
      if (top == 0) {
        return (this.titelAutoHide = false);
      }
      return (this.titelAutoHide = true);
    },
    imgCache() {
      //let timestamp = Date.parse(new Date());
      let imgMd5 = md5("wange" + 123);
      console.log(imgMd5);
    },
    setup() {
      console.log("设置");
    },
    getClientWidth() {
      return document.body.clientWidth;
    },
    resizeImg(ev, w, h) {
      console.log(w);
      var img = ev.target;
      var scalebox = w / h,
        shifting = 0;
      var scaleImg = img.width / img.height;
      if (scalebox > scaleImg) {
        img.width = w;
        shifting = parseInt((img.height - h) / 2);
        img.style.marginTop = 0 - shifting + "px";
      } else {
        img.height = h;
        shifting = parseInt((img.width - w) / 2);
        img.style.marginLeft = 0 - shifting + "px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.hehe-enter,
.hehe-leave-to {
  opacity: 0;
}
.hehe-enter-to,
.hehe-leave {
  opacity: 1;
}
.hehe-enter-active,
.hehe-leave-active {
  transition: all 3s;
}
.bg {
  height: 200px;
  width: 100%;
  overflow: hidden;
}
.head {
  height: 340px;
}
.user {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw - 60px);
  top: -70px;
  left: 30px;
  z-index: 1;
  .userImg {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
  }
  .username {
    width: calc(100vw - 60px);
    font-size: 20px;
    font-weight: bolder;
    margin: 10px 0 10px;
  }
  .tags {
    margin: 6px 2px 4px 0px;
  }
}
.history {
  .van-tab__pane {
    margin-top: 10px;
    margin-bottom: 15px;
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }
  .shopImg {
    overflow: hidden;
    width: 150px;
    height: 200px;
  }
}
</style>
