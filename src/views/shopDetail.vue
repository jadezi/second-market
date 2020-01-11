<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="info">
      <div class="userInfo">
        <div class="userImg">
          <img src="../assets/th.jpg" href="#" />
        </div>
        <div>
          <div class="userName">123</div>
          <div class="pushTime">123</div>
        </div>
      </div>
      <van-divider />
      <div class="priceInfo">
        <div class="salePrice">￥200</div>
        <div class="oldPrice">￥300</div>
        <div class="freeShipping"><van-tag type="danger">包邮</van-tag></div>
      </div>
      <div class="shopContent">
        <div class="shopText">1</div>
        <div class="shopImage">
          <img @click="showImage(1)" src="../assets/th.jpg" href="#" />
          <img @click="showImage(2)" src="../assets/th.jpg" href="#" />
          <img @click="showImage(3)" src="../assets/th.jpg" href="#" />
        </div>
      </div>
    </div>
    <div class="juli"></div>
    <cmtParent></cmtParent>
    <div class="menu">
      <div class="replyMsg"><van-icon name="chat-o" /></div>
      <div class="iwant">
        <van-button type="danger" size="small" color="linear-gradient(to right, #CC0000, #FF3333,)">想要</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import cmtParent from "@/views/cmtParent.vue";
export default {
  name: "ShopDetail",
  data() {
    return {};
  },
  components: {
    cmtParent
  },
  methods: {
    onClickLeft() {
      console.log("ok");
    },
    showImage(pos) {
      ImagePreview({
        images: [
          "http://pic.wangez.cn/markdown/2.jpg",
          "https://img.yzcdn.cn/2.jpg",
          "http://pic.wangez.cn/markdown/2.jpg"
        ],
        startPosition: pos,
        loop: false,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.info {
  width: 90%;
  margin: 10px auto;
  .userInfo {
    display: flex;
    justify-content: flex-start;
    .userImg img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .userName {
      font-size: 16px;
      font-weight: bolder;
    }
    .pushTime {
      color: #efefef;
      font-size: 14px;
    }
  }
  .priceInfo {
    display: flex;
    margin: 15px 0px;
    .salePrice {
      margin-right: 8px;
      color: #ff0000;
      font-size: 20px;
      font-weight: bolder;
    }
    .oldPrice {
      margin-right: 10px;
      font-size: 14px;
      color: #999999;
      text-decoration: line-through;
    }
  }
  .shopContent {
    display: flex;
    flex-direction: column;
    .shopText {
      margin: 15px 0;
    }
    .shopImage {
      border-radius: 7px;
      background-color: #ff0000;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
  }
}
.juli {
  height: 15px;
  width: 100%;
  background-color: #efefef;
}
.menu {
  width: 100%;
  height: 25px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  background-color: white;
}
</style>
