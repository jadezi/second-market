<template>
  <div class="content" ref="box">
    <transition name="van-fade">
      <div
        :class="{ title: true, 'title-transparent': transparent }"
        v-show="titelAutoHide"
      >
        <van-nav-bar
          :title="title"
          @click-right="setup"
          @click-left="back"
          safe-area-inset-top
          fixed
          :border="false"
          :z-index="2"
        >
          <van-icon
            :class="{
              'title-left': true,
              'title-not-transparent': transparent
            }"
            name="arrow-left"
            slot="left"
          />
          <van-icon
            :class="{
              'title-left': true,
              'title-not-transparent': transparent
            }"
            name="setting-o"
            slot="right"
          />
        </van-nav-bar>
      </div>
    </transition>
    <div class="head">
      <div class="bg">
        <van-image width="100%" lazy-load :src="userInfo.setting.bgImg" />
      </div>
      <div class="user">
        <div class="userImg">
          <img :src="userInfo.avatar" @load="resizeImg($event, 100, 100)" />
        </div>
        <div class="username">{{ userInfo.name }}</div>
        <div class="label">{{ userInfo.setting.signature }}</div>
        <div class="tags">
          <van-tag type="warning" size="large">{{ userInfo.setting.city }}</van-tag>
        </div>
      </div>
    </div>
    <div class="history">
      <van-tabs @click="setTabChecked">
        <van-tab
          v-for="(titleItem, index) in userStatusTitleItems"
          :key="index"
          :title="titleItem.title"
        >
          <van-list
            v-model="listLoading"
            :finished="finished"
            finished-text="我也是有底线滴~~~"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="getShopList"
          >
            <keep-alive>
              <waterfall
                :data="shopList"
                v-if="shopList.length != 0"
              ></waterfall>
            </keep-alive>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
// import showBlock from '@/components/showblock.vue'
import waterfall from '@/components/waterfall.vue'
import Vue from 'vue'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
export default {
  name: 'my',
  components: {
    waterfall
  },
  data() {
    return {
      title: '',
      uid: '',
      userInfo: {},
      bgimg: '',
      userImg: '',
      // 标题栏透明
      transparent: false,
      titelAutoHide: true,
      // 用户状态分类标签页列表
      userStatusTitleItems: [
        {
          id: 0,
          title: '在售中',
          query: 'sale'
        },
        {
          id: 1,
          title: '已卖出',
          query: 'finished'
        }
      ],
      // 列表加载状态
      listLoading: false,
      // 上拉加载错误状态
      error: false,
      // 当前选中的标签栏
      selectTabItem: 'sale',
      // 列表加载是否结束
      finished: false,
      shopList: [],
      // 每次上拉增加加载数量
      listAddNum: 2,
      // 已加载卡片数量
      listSize: 0
    }
  },
  mounted() {
    this.uid = this.$route.params.uid
    this.getUserInfo()
    //this.bgimg = this.$store.state.userInfo.uidBgUrl
    //this.userImg = this.$store.state.userInfo.uidImgUrl
    window.addEventListener('scroll', this.scrollHandle)
    this.imgCache()
    //this.scrollIsExisted()
  },
  methods: {
    // scrollIsExisted() {
    //   var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    //   var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    //   if (scrollHeight <= clientHeight) {

    //   }
    //   console.log(scrollHeight)
    //   console.log(document.body.clientHeight)
    // },
    scrollHandle(e) {
      var top = e.srcElement.scrollingElement.scrollTop
      if (top == 0) {
        this.title = ''
        this.transparent = false
        return
      }
      this.title = this.userInfo.uname
      this.transparent = true
      return
    },
    imgCache() {
      //let timestamp = Date.parse(new Date());
      let imgMd5 = md5('wange' + 123)
      console.log(imgMd5)
    },
    setup() {
      console.log('设置')
    },
    getClientWidth() {
      return document.body.clientWidth
    },
    resizeImg(ev, w, h) {
      console.log(w)
      var img = ev.target
      var scalebox = w / h,
        shifting = 0
      var scaleImg = img.width / img.height
      if (scalebox > scaleImg) {
        img.width = w
        shifting = parseInt((img.height - h) / 2)
        img.style.marginTop = 0 - shifting + 'px'
      } else {
        img.height = h
        shifting = parseInt((img.width - w) / 2)
        img.style.marginLeft = 0 - shifting + 'px'
      }
    },
    setTabChecked(index, name) {
      console.log(name)
      this.userStatusTitleItems.forEach(item => {
        console.log(item.id)
        if (item.id == index) {
          this.selectTabItem = item.query
          this.listSize = 0
          this.finished = false
          this.shopList = []
          // this.shopListLeft = []
          // this.shopListRight = []
          this.getShopList()
          return
        }
      })
    },
    async getShopList() {
      try {
        const { data: res } = await this.$http.get(
          `userindex/${this.selectTabItem}`,
          {
            params: {
              uid: this.userInfo.id,
              listAddNum: this.listAddNum,
              listSize: this.listSize
            }
          }
        )

        if (res.meta.status !== 200) {
          this.error = true
          return this.$toast('服务器异常')
        }
        if (res.data.arr.length == 0) {
          console.log('185 hang')
          this.finished = true
          return
        }
        // // 当前商品列表长度
        var length = this.shopList.length

        if (res.data.length === length) {
          console.log('196 hang')
          this.finished = true
          return
        }

        res.data.arr.forEach(item => {
          this.shopList.push(item)
        })
        this.listSize = this.shopList.length
        // //加载状态结束
        this.listLoading = false
      } catch (err) {
        this.listLoading = false
        this.error = true
        this.$toast('加载失败:' + err)
      }
    },
    async getUserInfo() {
      const { data: res } = await this.$http.get(
        `private/v1/users/getuserinfo`,
        {
          params: {
            id: this.uid
          }
        }
      )
      if (res.code !== 200) {
        return this.$toast('加载失败')
      }
      this.userInfo = res.data
      console.log(this.userInfo)
    },
    back() {
      this.$router.push(this.$route.query.redirect)
    }
  }
}
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
  transition: all 0.3s ease;
}
.title {
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar {
    background-color: inherit;
    color: #ffffff;
  }
}
.title-left {
  color: #ffffff;
  font-size: 25px;
}
.title-not-transparent {
  color: #707070;
  font-size: 25px;
}
.title-transparent {
  .van-nav-bar__title {
    color: #000;
  }
  .van-nav-bar {
    background-color: #ffffff !important;
    color: #1989fa;
  }
}
.bg {
  height: 200px;
  width: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
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
  background-color: #f2f2f2;
  height: 100%;
  padding-bottom: 53px;
  .shopImg {
    overflow: hidden;
    width: 150px;
    height: 200px;
  }
}
</style>
