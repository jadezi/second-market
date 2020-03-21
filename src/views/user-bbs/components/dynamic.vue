<template>
  <div class="main">
    <div class="header" @click="showPopup">
      <div class="title">
        <div class="avatar">
          <img :src="infos.author.avatar" />
        </div>
        <div class="desc">
          <div class="name">{{ infos.author.name }}</div>
          <div class="time">{{ infos.time }}</div>
        </div>
      </div>
      <div class="report">
        <van-icon name="arrow-down" />
      </div>
    </div>
    <div class="content">
      <div class="text">{{ infos.content.text }}</div>
      <div class="summary"></div>
      <div class="image">
        <van-image
          v-for="(img, index) in infos.content.imgGroup"
          :key="index"
          :src="img"
          @click="showImage(index)"
        />
      </div>
    </div>
    <div class="footer">
      <div class="features">
        <div class="like">
          <span class="iconfont icon-zan"></span>
          <div class="count">{{ infos.like | featuresFilter }}</div>
        </div>
        <div class="review">
          <span class="iconfont icon-pinglun"></span>
          <div class="count">{{ infos.review.amount | featuresFilter }}</div>
        </div>
        <div class="forward">
          <span
            class="iconfont icon-fenxiangzhuanfafasongzhijiantouyuanxingshar"
          ></span>
          <div class="count">{{ infos.forward | featuresFilter }}</div>
        </div>
      </div>
    </div>

    <div>
      <van-popup
        v-model="show"
        :close-on-popstate="true"
        :overlay-style="{ 'overlay-style': true }"
      >
        内容
      </van-popup>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  name: '',
  components: {},
  props: ['infos'],
  data() {
    return {
      show: false
    }
  },
  filters: {
    featuresFilter(amount) {
      if (amount == 0) {
        return
      }
      return amount
    }
  },
  computed: {},
  watch: {
    infos(val) {
      if (val) {
        this.infos = val
        console.log(this.infos)
        this.control = true
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    showImage(pos) {
      ImagePreview({
        images: this.infos.content.imgGroup,
        startPosition: pos
      })
    },
    showPopup() {
      this.show = true
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  border-radius: 7px;
  background-color: #fff;
  padding: 4px;
  box-shadow: 0px 1px 8px 0px #00000030;
  margin-top: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 3px 6px;
  // 按键反馈
  position: relative;
  overflow: hidden;

  .title {
    display: flex;
    align-items: center;
  }
  .report {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 30%;
  }
  .avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #f2f2f2f2;
    margin-right: 5px;
  }
}
.content {
  padding: 6px 8px 10px;
  .text {
    margin-bottom: 6px;
    font-size: 14px;
  }
  .image {
    text-align: center;
    .van-image {
      margin-right: 4px;
      width: 30%;
      height: 100px;
    }
  }
  .image-group {
    border-radius: 8px 0 0 0;
  }
}
.footer {
  .features {
    display: flex;
    justify-content: space-around;
    color: #a7a7a7;
    height: 35px;
  }
  .like,
  .review,
  .forward {
    display: flex;
    align-items: center;
  }
  .count {
    font-size: 16px;
    margin-left: 4px;
  }
}
.overlay-style {
  opacity: 0;
}
</style>
