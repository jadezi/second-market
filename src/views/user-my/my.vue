<template>
  <div class="bg">
    <transition name="van-fade">
      <nav-title v-show="titleVisible" :name="sn"></nav-title>
    </transition>
    <van-pull-refresh
      v-model="isLoading"
      :head-height="130"
      @refresh="onRefresh"
    >
      <template #pulling="props">
        <img
          class="doge"
          src="../../../public/img/loading.gif"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="../../../public/img/loading.gif" />
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="../../../public/img/loading.gif" />
      </template>
      <div class="pure_top">
        <div class="top"></div>
        <div class="head">
          <div class="user">
            <div class="avatar">
              <van-image
                width="100px"
                height="100px"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="userinfo">
              <div class="sn">3180437010</div>
              <div class="uname">昵称：{{ uname }}</div>
              <div class="index" @click="toIndex">
                <div>个人主页</div>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
          <div class="setting">
            <van-icon @click="openSetting" name="setting-o" />
          </div>
        </div>
      </div>
      <div class="friend">
        <div class="follow">2</div>
        |
        <div class="fans">2</div>
      </div>
      <div class="deal">
        <div class="buy">2</div>
        |
        <div class="sale">2</div>
      </div>
    </van-pull-refresh>
    <transition name="van-slide-right">
      <div class="settingPanel" v-if="settingControl">
        <setting @close="hiddenSetting"></setting>
      </div>
    </transition>
    <tar></tar>
  </div>
</template>
<script>
import tar from '@/components/tar.vue'
import navTitle from './components/title.vue'
import setting from '../user-setting/setting.vue'
export default {
  name: 'my',
  components: {
    tar,
    setting,
    navTitle
  },
  props: {},
  data() {
    return {
      isLoading: false,
      sn: 'tab',
      titleVisible: false,
      uname: 'wo',
      uid: '',
      isLogin: true,
      settingControl: false
    }
  },
  computed: {},
  watch: {},
  created() {
    window.addEventListener('scroll', this.scrollHandle)
  },
  mounted() {
    this.id = JSON.parse(window.sessionStorage.getItem('market-uid'))._id
    if (!this.id) {
      this.isLogin = false
    }
    console.log(this.id)
  },
  methods: {
    scrollHandle(e) {
      var top = e.srcElement.scrollingElement.scrollTop
      if (top == 0) {
        //this.title = ''
        this.titleVisible = false
        return
      }
      this.name = this.$store.state.userInfo.uname
      this.titleVisible = true
      return
    },
    onRefresh() {},
    async test() {
      const re = await this.$http.get('/private/v1/users/getuserinfo', {
        params: {
          name: 'asdfas'
        }
      })
      console.log(re)
    },
    toIndex() {
      this.$router.push({
        path: `/user/${this.id}/index`,
        query: {
          redirect: this.$route.path
        }
      })
    },
    hiddenSetting() {
      this.settingControl = false
    },
    openSetting() {
      this.settingControl = true
      console.log('11')
    }
  }
}
</script>
<style scoped lang="scss">
.bg {
  background-color: #f4f5f9;
  position: relative;
  z-index: 1;
}
.pure_top {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.pure_top::after {
  content: '';
  width: 140%;
  height: 185px;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 50% 50%;
  background: #1496f1;
}
.doge {
  width: 70px;
  margin-top: 8px;
}
.head {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .setting {
    margin: 0 1rem;
    font-size: 24px;
  }
  .user {
    display: flex;
    .avatar .van-image {
      border-radius: 7px;
      margin: 0 1rem;
      overflow: hidden;
    }
    .userinfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .sn {
        font-size: 16px;
        font-weight: bolder;
      }
      .uname {
        font-size: 14px;
      }
      .index {
        font-size: 14px;
        padding: 2px 3px;
        background-color: #fff;
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 10px;
      }
    }
  }
}
.settingPanel {
  height: calc(100vh);
  z-index: 99;
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #f4f5f9;
}
.friend,
.deal {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  padding: 20px 10px;
  align-items: center;
  position: relative;
  top: -63px;
  box-shadow: 0px 1px 8px 0px #00000030;
  .follow,
  .fans,
  .buy,
  .sale {
    width: 50%;
    text-align: center;
  }
}
</style>
