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
    <div class="head" v-if="Object.keys(this.userInfo).length != 0">
      <!-- <div class=" pure_top"> -->
      <img width="100%" height="100%" :src="userInfo.setting.bgImg" />
      <!-- </div> -->
      <div class="user">
        <div class="userImg">
          <img :src="userInfo.avatar" @load="resizeImg($event, 100, 100)" />
        </div>
        <div class="extends">
          <div class="username">{{ userInfo.setting.name }}</div>
          <div class="follow" v-if="followState ">
            <van-button
              :loading="loading"
              round
              type="warning"
              :icon="icon"
              @click="follow"
            >
              {{ followText }}
            </van-button>
          </div>
        </div>
        <div class="label">{{ userInfo.setting.signature }}</div>
        <div class="tags">
          <van-tag type="warning" size="large">
            {{ userInfo.setting.city }}
          </van-tag>
          <van-tag type="success" size="large">
            {{ userInfo.setting.college }}
          </van-tag>
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
          <shop-list
            ref="shopload"
            :id="uid"
            :selectTabItem="selectTabItem"
          ></shop-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import md5 from 'js-md5'
// import showBlock from '@/components/showblock.vue'
import shopList from '@/components/shopList.vue'
import Vue from 'vue'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
export default {
  name: 'my',
  components: {
    shopList
  },
  data() {
    return {
      title: '',
      uid: '',
      id: '',
      followState: false,
      userInfo: {},
      // bgimg: '',
      userImg: '',
      // 标题栏透明
      transparent: false,
      titelAutoHide: true,
      // 用户状态分类标签页列表
      userStatusTitleItems: [
        {
          id: 0,
          title: '销售中',
          query: 'sale'
        },
        {
          id: 1,
          title: '已售出',
          query: 'finished'
        }
      ],
      // 列表加载状态
      listLoading: false,
      // 上拉加载错误状态
      error: false,
      // 当前选中的标签栏
      selectTabItem: '销售中',
      // 列表加载是否结束
      icon: 'plus',
      followText: '关注',
      loading: false,
      shopList: [],
      // 每次上拉增加加载数量
      listAddNum: 2,
      // 已加载卡片数量
      listSize: 0
    }
  },
  created() {
    this.uid = this.$route.params.uid
    this.id = this.$store.getters.getUserInfo._id
    this.getUserInfo()
    window.addEventListener('scroll', this.scrollHandle)
    this.imgCache()
    var friends = this.$store.getters.getUserInfo.friends
    if (this.uid != this.id) {
      this.followState = true
    }
    var that = this
    console.log(typeof friends)
    var result = friends.filter(function(f) {
      if (f == that.uid) {
          if (that.icon == 'plus') {
            that.icon = 'success'
            that.followText = '已关注'
          } else {
            that.icon = 'plus'
            that.followText = '关注'
          }
      }
      return true
    })
    console.log(result)
  },
  watch: {
    userInfo: {
      handler(newVal) {
        this.userInfo = newVal
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
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
      // let imgMd5 = md5('wange' + 123)
      // console.log(imgMd5)
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
      this.selectTabItem = name
      this.listSize = 0
    },
    follow() {
      if (!this.id) {
        window.sessionStorage.removeItem('market-token')
        let path = this.$route.path
        this.$toast('请重新登陆')
        this.$router.push({
          path: '/login',
          query: { type: 'pwd', redirect: path }
        })
        return
      }
      this.loading = true
      setTimeout(async () => {
        let { data: re } = await this.$http.put('private/users/friends/follow', {
          id: this.id,
          fid: this.userInfo._id
        })
        if (re.code != 200) {
          this.$toast('关注失败')
          this.loading = false
          return
        }
        this.$toast('关注成功')
        this.loading = false
      }, 3000)
      if (this.icon == 'plus') {
        this.icon = 'success'
        this.followText = '已关注'
      } else {
        this.icon = 'plus'
        this.followText = '关注'
      }
    },
    async getUserInfo() {
      const { data: res } = await this.$http.get(`public/users/getuserinfo`, {
        params: {
          id: this.uid
        }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$toast('加载失败')
      }
      this.userInfo = res.data
      // console.log(this.userInfo)
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
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
.user {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw - 60px);
  top: -70px;
  left: 30px;
  z-index: 1;
  .label {
    margin-left: 20px;
  }
  .userImg {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
  }
  .extends {
    width: calc(100vw - 60px);
    margin: 10px 0 10px;
    display: flex;
    justify-content: space-between;
    .username {
      margin-left: 20px;
      font-size: 20px;
      font-weight: bolder;
    }
  }

  .tags {
    margin: 6px 2px 4px 0px;
    margin-left: 20px;
    .van-tag {
      margin-right: 10px;
    }
  }
}
.history {
  padding-bottom: 53px;
  .shopImg {
    overflow: hidden;
    width: 150px;
    height: 200px;
  }
}
.van-icon-star {
  color: red;
}
</style>
