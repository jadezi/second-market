<template>
  <div>
    <div class="main" v-for="(infos, index) in info" :key="index">
      <div class="header" @click="showPopup(info)">
        <div class="title">
          <div class="avatar">
            <img :src="infos.author.avatar" />
          </div>
          <div class="desc">
            <div class="name">{{ infos.author.setting.name }}</div>
            <div class="time">{{ infos.createAt | timeFilter }}</div>
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
            fit="none"
            @click="showImage(index, infos.content.imgGroup)"
          />
        </div>
      </div>
      <div class="footer">
        <div class="features">
          <div class="like">
            <span class="iconfont icon-zan"></span>
            <div class="count">{{ infos.like.amount | featuresFilter }}</div>
          </div>
          <div class="review">
            <span class="iconfont icon-pinglun"></span>
            <div class="count">{{ infos.review.amount | featuresFilter }}</div>
          </div>
          <div class="forward" @click="showForwardPopup(infos.summary)">
            <span
              class="iconfont icon-fenxiangzhuanfafasongzhijiantouyuanxingshar"
            ></span>
            <div class="count">{{ infos.forward | featuresFilter }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 举报，收藏功能弹窗 -->
    <div class="title-function-zone">
      <van-popup v-model="show">
        <div class="wrapper">
          <div class="block">
            <van-cell title="收藏" @click="favorite" />
            <van-cell title="举报" is-link @click="report" />
          </div>
        </div>
      </van-popup>
    </div>

    <!-- 转发弹窗 -->
    <div class="forward-function-zone">
      <van-popup
        v-model="forwardShow"
        round
        position="bottom"
        :close-on-popstate="true"
        overlay-class="forwardClass"
        :style="{ height: '45%' }"
        :safe-area-inset-bottom="true"
      >
        <div class="forward-body">
          <div class="title">
            <div>转发</div>
            <div class="push" @click="push">发布</div>
          </div>
          <div class="forward-content">
            <van-field
              v-model="forwardValue"
              :formatter="formatter"
              type="textarea"
              placeholder="转发动态"
              rows="4"
            />
          </div>
          <div class="forward-footer" v-if="this.summary !== null">
            <a :href="summary.url" class="forward-summary">
              <div class="cover">
                <van-image width="50" height="50" :src="summary.cover" />
              </div>
              <div class="right-main">
                <div class="author">@{{ summary.author }}</div>
                <div class="desc">
                  {{ summary.description }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { Notify } from 'vant'
Vue.use(Notify)
Vue.use(ImagePreview)
import { differDateFormat } from '@/assets/js/date.js'
export default {
  name: '',
  components: {},
  props: ['info'],
  data() {
    return {
      show: false,
      forwardShow: false,
      uid: '',
      forwardValue: '',
      summary: {
        description: '',
        cover: '',
        url: '',
        author: ''
      }
    }
  },
  filters: {
    featuresFilter(amount) {
      if (amount == 0) {
        return
      }
      return amount
    },
    timeFilter(time) {
      const now = Date.parse(new Date())
      const differ = differDateFormat(parseInt(time), now)
      if (differ.day === 0) {
        if (differ.hour === 0) {
          return differ.minute + '分钟前发布'
        } else {
          return differ.hour + '小时前发布'
        }
      } else {
        return differ.day + '天前发布'
      }
    }
  },
  computed: {},
  watch: {
    info(val) {
      this.infos = val
      console.log(this.info)
    }
  },
  created() {},
  mounted() {},
  methods: {
    showImage(pos, imgGroup) {
      ImagePreview({
        images: imgGroup,
        startPosition: pos
      })
    },
    showPopup(info) {
      this.show = true
      this.uid = info._id
    },
    showForwardPopup(summary) {
      this.forwardShow = true
      this.summary = summary
    },
    report() {
      console.log('测试')
    },
    favorite() {
      // 异步请求 添加收藏
      console.log('收藏成功')
      this.show = false
      Notify({
        message: '收藏成功',
        color: '#67c23a',
        background: '#f0f9eb'
      })
    },
    push() {
      console.log('success')
    },
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, '')
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
    .desc {
      .name {
        margin-bottom: 8px;
        color: #929292;
      }
      .time {
        font-size: 14px;
        color: #bbbbbb;
      }
    }
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
  padding: 6px 0 10px;
  .text {
    margin-bottom: 6px;
    font-size: 14px;
    padding: 0 12px;
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
    width: 33%;
    justify-content: center;
  }
  .like:active {
    background-color: #f2f2f2;
    border-radius: 0 0 0 7px;
  }
  .review:active {
    background-color: #f2f2f2;
  }
  .forward:active {
    background-color: #f2f2f2;
    border-radius: 0 0 7px 0;
  }
  .count {
    font-size: 16px;
    margin-left: 4px;
  }
}
.overlay-style {
  opacity: 0;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.title-function-zone .van-popup {
  width: 70%;
}
.block {
  width: 100%;
  background-color: #fff;
}
.forward-function-zone .van-popup {
  width: 100%;
}
.forward-body {
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    .push {
      color: #07c160;
      font-size: 1rem;
    }
  }
  .forward-footer {
    .forward-summary {
      display: flex;
      color: #000;
      padding: 6px 8px;
      background-color: #f2f2f2f2;
      border-radius: 7px;
      .cover {
        display: flex;
      }
      .right-main {
        overflow: hidden;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 60%;
        }
      }
    }
  }
}
</style>
