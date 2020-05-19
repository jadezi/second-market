<template>
  <div class="bg" v-if="userInfo._id">
    <transition name="van-fade">
      <nav-title v-show="titleVisible" :name="userInfo.sn"></nav-title>
    </transition>
    <van-pull-refresh
      v-model="isLoading"
      :head-height="130"
      @refresh="onRefresh"
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
      <div class="pure_top">
        <div class="top"></div>
        <div class="head">
          <div class="user">
            <div class="avatar">
              <van-image
                width="100px"
                height="100px"
                fit="cover"
                :src="userInfo.avatar"
              />
            </div>
            <div class="userinfo">
              <div class="sn">{{ userInfo.sn }}</div>
              <div class="uname">昵称：{{ userInfo.setting.name }}</div>
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
        <div class="follow">关注 {{ userInfo.friends | friendsFilter }}</div>
        |
        <div class="fans">粉丝 {{ userInfo.fans | friendsFilter }}</div>
      </div>
      <div class="all">
        <van-cell title="卖家中心" is-link to="/deals"/>
        <van-cell title="买家中心" is-link to="/deals" />
      </div>
    </van-pull-refresh>
    <transition name="van-slide-right">
      <div class="settingPanel" v-show="settingControl">
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
      userInfo: {},
      settingControl: false
    }
  },
  filters: {
    friendsFilter(friends) {
      return friends.length
    }
  },
  computed: {},
  watch: {
    userInfo: function(val) {
      this.userInfo = val
    }
  },
  created() {
    window.addEventListener('scroll', this.scrollHandle)
    let token = window.sessionStorage.getItem('market-token')
    if (!token) {
      window.sessionStorage.removeItem('market-token')
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.path
        }
      })
    }
    this.userInfo = this.$store.getters.getUserInfo
    // console.log(this.$store)
    console.log()
    if (!this.userInfo._id) {
      this.getUserInfoByToken()
      console.log('通过token获取用户信息')
    }
    // console.log(this.userInfo._id)
  },
  mounted() {
    this.showSetting()
  },
  methods: {
    showSetting() {
      let type = this.$route.query.type
      if (type) {
        console.log(this.$refs.setting)
        this.$refs.setting.setting(type)
      }
    },
    async getUserInfoByToken() {
      //const token = window.sessionStorage.getItem('market-token')
      const { data: re } = await this.$http.get(
        'private/v1/users/getuserinfo/token'
      )
      if (re.code !== 200) {
        this.$toast('获取用户信息失败，请登陆')
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      }
      this.$store.commit('setUserInfo', re.data)
      this.userInfo = re.data
    },
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
    async onRefresh() {
      try {
        const { data: re } = await this.$http.get(
          '/public/v1/users/getuserinfo',
          {
            params: {
              id: this.userInfo._id
            }
          }
        )
        console.log(re)
        if (re.code !== 200) {
          this.isLoading = false
          window.sessionStorage.removeItem('market-token')
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
        }
        this.isLoading = false
        this.$toast('刷新成功')
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.$toast('刷新失败')
      }
    },
    toIndex() {
      this.$router.push({
        path: `/user/${this.userInfo._id}/index`,
        query: {
          redirect: this.$route.path
        }
      })
    },
    hiddenSetting() {
      this.settingControl = false
    },
    openSetting() {
      //this.settingControl = true
      this.$router.push({path: '/user/setting',query:{redirect: this.$route.path}})
    }
  }
}
</script>
<style scoped lang="scss">
.bg {
  background-color: #f9f9fb;
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
  box-shadow: 0px 1px 5px 0px #00000030;
  .follow,
  .fans,
  .buy,
  .sale {
    width: 50%;
    text-align: center;
  }
}
.all {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 1px 5px 0px #00000030;
}
</style>
