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
          <img src="../assets/img/th.jpg" href="#" />
        </div>
        <div>
          <div class="userName">123</div>
          <div class="pushTime">2020-1-1</div>
        </div>
        <div class="identity">
          <van-icon name="award-o" size="1.7em" color="#40E0D0" />
          <van-button plain type="info" size="mini" color="#40E0D0"
            >实名认证</van-button
          >
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
          <img @click="showImage(1)" src="../assets/img/th.jpg" href="#" />
          <img @click="showImage(2)" src="../assets/img/th.jpg" href="#" />
          <img @click="showImage(3)" src="../assets/img/th.jpg" href="#" />
        </div>
      </div>
    </div>
    <div class="juli"></div>
    <cmtParent></cmtParent>
    <div class="bottom-menu">
      <transition name="van-fade">
        <div class="menu" v-if="isReply">
          <div class="replyMsg" @click="replyBtn">
            <van-icon name="chat-o" size="1.8em" />
            <div class="leaveNote">留言</div>
          </div>
          <div class="iwant">
            <van-button
              size="normal"
              style="height:40px"
              round
              color="linear-gradient(to right, #fc9114, #ff2222)"
              >想&nbsp;要</van-button
            >
          </div>
        </div>
        <!-- </transition>
       <transition name="van-fade"> -->
        <div class="menu" v-else-if="isKeyBroad">
          <div class="KeyBroad">
            <van-icon name="smile-comment-o" size="1.8em" @click="replyBtn" />
            <van-cell-group>
              <van-field
                :autofocus="1 > 0"
                v-model="replyContent"
                placeholder="给ta捎句话吧"
              />
            </van-cell-group>
          </div>
          <div>
            <van-button
              size="normal"
              style="height:40px"
              v-bind:disabled="replyContent.length == 0"
              round
              type="primary"
              >留&nbsp;言</van-button
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import cmtParent from "@/views/cmtParent.vue";
import axios from "axios";
export default {
  name: "ShopDetail",
  data() {
    return {
      replyContent: "",
      isReply: true,
      isKeyBroad: false,
      replyMessage: ""
    };
  },
  components: {
    cmtParent
  },
  methods: {
    sendReplyContent() {
      axios.post("http://localhost:3000");
    },
    onClickLeft() {
      console.log("ok");
    },
    replyBtn() {
      this.isReply = !this.isReply;
      this.isKeyBroad = !this.isKeyBroad;
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
    .identity {
      display: flex;
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
.bottom-menu {
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #e2e2e2;
  .menu {
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .replyMsg {
      display: flex;
      flex-direction: column;
      .leaveNote {
        font-size: 14px;
        color: #c2c0c0cb;
      }
    }
    .iwant {
      display: flex;
      align-items: center;
    }
    .KeyBroad {
      display: flex;
      align-items: center;
    }
  }
}
</style>
