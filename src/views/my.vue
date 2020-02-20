<template>
  <div>
    <div class="title" v-if="titelAutoHide()">
      <van-nav-bar :title="title" right-text="设置" @click-right="setup">
        <van-icon name="search" slot="right" />
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
          <van-grid :gutter="10" :column-num="2">
            <van-grid-item v-for="value in 8" :key="value">
              <div slot="default">
                <div class="shopImg">
                  <img src="http://pic.wangez.cn/second-market/userbg.jpeg" @load="resizeImg($event, 80, 150)">
                </div>
                <div class="desc"></div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-tab>
        <van-tab title="已卖出">
          <van-grid :gutter="10">
            <div slot="default">123</div>
            <div slot="default">123</div>
            <div slot="default">123</div>
            <div slot="default">123</div>
            <div slot="default">123</div>
          </van-grid>
        </van-tab>
      </van-tabs>
    </div>
    <tar></tar>
  </div>
</template>

<script>
import tar from "@/components/tar.vue";
export default {
  name: "my",
  components: { tar },
  data() {
    return {
      title: "个人中心",
      bgimg: "",
      userImg: ""
    };
  },
  mounted() {
    this.bgimg = this.$store.state.userInfo.uidBgUrl;
    this.userImg = this.$store.state.userInfo.uidImgUrl;
    console.log(this.bgimg);
  },
  methods: {
    setup() {
      console.log("设置");
    },
    titelAutoHide() {
      return false;
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
* {
  padding: 0px;
  margin: 0px;
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
  z-index: 99;
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
  .shopImg {
    overflow: hidden;
    width: 150px;
    height: 200px;
  }
}
</style>
