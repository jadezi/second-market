<template>
  <div class="chat-bg">
    <div :class="isScroll">
      <div class="title">
        <span>消息</span>
      </div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :head-height="130"
      >
        <template #pulling="props">
          <img
            class="doge"
            src="../../../public/img/loadingindex.gif"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="../../../public/img/loadingindex.gif" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="doge" src="../../../public/img/loadingindex.gif" />
        </template>
        <div class="inform">
          <div
            v-for="(item, key) in systemImage"
            :key="key"
            class="inform-item"
          >
            <div :class="{ dot: true, 'dot-status': item.status }"></div>
            <img :src="item.img" @click="setDotStyle(key)" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <van-skeleton
          title
          avatar
          avatar-shape="square"
          :row="2"
          avatar-size="60px"
          row-width="80%"
          :loading="loading"
        >
          <div class="message-content" v-for="(item, i) in chat" :key="i">
            <van-swipe-cell :right-width="rightWidth">
              <template slot="default">
                <div class="message" @click="openContact(item)">
                  <div class="shop-logo">
                    <img :src="item.toUidImgUrl" />
                  </div>
                  <div class="sale-info">
                    <div class="sale-name">{{ item.toId.name }}</div>
                    <div class="laster-message">{{ item.message }}</div>
                    <div class="laster-time">
                      {{ item.timeStamp | timestampFormat }}
                    </div>
                  </div>
                  <div class="shop-image">
                    <img :src="item.shopImgUrl" />
                  </div>
                </div>
              </template>
              <template slot="right">
                <div class="del-btn">删除</div>
              </template>
            </van-swipe-cell>
            <van-divider
              :hairline="false"
              :style="{
                color: '#e6e6e6',
                borderColor: '#e6e6e6'
              }"
            />
          </div>
        </van-skeleton>
      </van-pull-refresh>
    </div>
    <!-- <div>
      <transition name="van-slide-right">
        <div v-if="messageFlag" class="contact">
          <contact @closeMessage="showMessage"></contact>
        </div>
      </transition>
    </div> -->
    <div v-if="circularLoading" class="main">
      <van-loading color="#FF66CC" :size="45" />
    </div>
    <tar></tar>
  </div>
</template>

<script>
//import contact from "@/views/contacts.vue";
import activity from '../../../public/img/activity.jpg'
import inform from '../../../public/img/inform.gif'
import message from '../../../public/img/message.jpg'
import tar from '@/components/tar.vue'
import { formatDate } from '@/assets/js/date.js'
export default {
  name: 'message',
  data() {
    return {
      id: '',
      isScroll: 'Scroll',
      messageFlag: false,
      isLoading: false,
      rightWidth: 80,
      loading: true,
      circularLoading: false,
      chat: [],
      systemImage: [
        {
          name: '活动消息',
          img: activity,
          status: false,
          id: 0
        },
        {
          name: '通知消息',
          img: inform,
          status: false,
          id: 1
        },
        {
          name: '互动消息',
          img: message,
          status: false,
          id: 2
        }
      ]
    }
  },
  mounted() {
    this.id = JSON.parse(window.sessionStorage.getItem('market-uid'))._id
    console.log(this.id)
    if (!this.id) {
      window.sessionStorage.removeItem('market-token')
      window.sessionStorage.removeItem('market-uid')
      let path = this.$route.path
      this.$toast('请重新登陆')
      this.$router.push({
        path: '/login',
        query: { type: 'pwd', redirect: path }
      })
      return
    }
    this.getMessage()
  },
  filters: {
    timestampFormat: function(timeStamp) {
      return formatDate(Number(timeStamp), 'yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    // messageFlag: function() {
    //   this.isScroll = this.messageFlag ? 'noScroll' : 'Scroll'
    // },
    // circularLoading: function() {
    //   this.isScroll = this.circularLoading ? 'noScroll' : 'Scroll'
    // }
  },
  methods: {
    setDotStyle(objectId) {
      for (var i = 0; i < this.systemImage.length; i++) {
        if (this.systemImage[i].id == objectId) {
          this.systemImage[i].status = !this.systemImage[i].status
        }
      }
      //this.loading = !this.loading;
    },
    async getMessage() {
      try {
        console.log(this.id)
        this.circularLoading = true
        const { data: re } = await this.$http.get(
          'private/v1/messagelist/getall',
          {
            params: {
              id: this.id
            }
          }
        )
        console.log(re)
        if (re.code !== 200) {
          this.circularLoading = false
          this.isLoading = false
          this.$toast('加载失败:' + re.mesage)
          return
        }
        console.log(re)
        this.chat = re.data
        this.loading = false
        this.circularLoading = false
        this.isLoading = false
      } catch (error) {
        this.circularLoading = false
        this.isLoading = false
        this.$toast('加载失败:' + error)
      }
    },
    onRefresh() {
      this.getMessage()
      //this.circularLoading = true;
    },
    showMessage() {
      this.messageFlag = !this.messageFlag
    },
    openContact(item) {
      this.$router.push({
        path: '/user/message/contacts',
        query: {
          session: item._id,
          toId: item.toId._id,
          name: item.toId.name,
          toUserImgUrl: item.toUidImgUrl,
          message: item.message,
          timeStamp: item.timeStamp
        }
      })
      this.$store.commit('setInfo', item)
    }
  },
  components: {
    //acontact,
    tar
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.chat-bg {
  background-color: #f9f9fb;
}
.doge {
  width: 70px;
  margin-top: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  right: -60px;
}
.dot-status {
  background-color: red;
}
.title {
  width: 100%;
  height: 40px;
  background-color: yellow;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inform {
  width: 93%;
  height: 120px;
  margin: 15px auto;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 4px 8px 12px rgba(0, 0, 0, 0.05);
}
.inform img {
  width: 45px;
  height: 45px;
  margin: 0 auto;
  padding-bottom: 8px;
}
.inform-item {
  display: flex;
  flex-direction: column;
}
.message {
  display: flex;
}
.message-content {
  width: 93%;
  margin: 0 auto;
}
.shop-logo img {
  width: 50px;
  height: 50px;
}
.shop-image img {
  width: 84px;
  height: 84px;
}
.sale-info {
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .laster-time {
    color: #8f8f8f;
    font-size: 14px;
  }
  .laster-message {
    color: #8d8d8d;
  }
}
.sale-name {
  font-size: 18px;
  font-weight: bold;
}
// 底层
// .noScroll {
//   overflow-y: hidden;
//   height: calc(100vh);
// }
// .Scroll {
//   overflow-y: auto;
//   height: auto;
// }
// 遮罩层
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh);
  z-index: 99999;
  position: absolute;
  top: 0px;
}
.contact {
  width: 100%;
  height: calc(100vh);
  z-index: 999;
  background-color: white;
  position: absolute;
  top: 0px;
}
// 删除按钮
.del-btn {
  background-color: red;
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
