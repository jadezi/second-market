<template>
  <div class="setting-bg">
    <div class="title">
      <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="contnet">
      <van-cell-group>
        <van-cell title="个人资料设置" is-link @click="showUserInfo" />
        <van-cell title="账户设置" is-link @click="showAccount" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="黑名单" is-link to="index" />
        <van-cell title="隐私" is-link to="index" />
        <van-cell title="安全中心" is-link to="index" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="" is-link to="index" />
        <van-cell title="路由跳转" is-link to="index" />
      </van-cell-group>
      <!-- <van-cell-group> -->
      <van-cell style="background-color:#f4f5f9">
        <van-button type="warning" block @click="exit">退出账户</van-button>
      </van-cell>
      <!-- </van-cell-group> -->
    </div>

    <transition name="van-slide-right">
      <div class="userInfo" v-if="userInfoControl">
        <user-info @close="hiddenUserInfo"></user-info>
      </div>
    </transition>
    <transition name="van-slide-right">
      <div class="account" v-if="AccountControl">
        <account @close="hiddenAccount"></account>
      </div>
    </transition>
  </div>
</template>
<script>
import userInfo from './components/userInfo.vue'
import account from './components/account.vue'
export default {
  name: 'setting',
  components: {
    userInfo,
    account
  },
  props: {},
  data() {
    return {
      userInfoControl: false,
      AccountControl: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    hiddenUserInfo() {
      this.userInfoControl = false
    },
    showUserInfo() {
      this.userInfoControl = true
    },
    hiddenAccount() {
      this.AccountControl = false
    },
    showAccount() {
      this.AccountControl = true
    },
    onClickLeft() {
      this.$emit('close')
    },
    exit() {
      window.sessionStorage.removeItem('market-token')
      window.sessionStorage.removeItem('market-uid')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped lang="scss">
.setting-bg {
  background-color: #f4f5f9;
  height: calc(100vh);
}
.van-nav-bar .van-icon {
  color: #383838;
}
.van-cell-group {
  margin-top: 20px;
}
.userInfo {
  z-index: 2000;
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #f4f5f9;
}
.account {
  z-index: 2000;
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #f4f5f9;
  height: calc(100vh);
}
</style>
