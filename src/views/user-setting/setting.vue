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
        <van-cell title="地址管理" is-link @click="showAddressList" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="黑名单" is-link to="/user/setting/blacklist" />
        <van-cell title="隐私" is-link to="index" />
        <van-cell title="安全中心" is-link to="index" />
      </van-cell-group>

      <!-- <van-cell-group> -->
      <van-cell style="background-color:#f4f5f9">
        <van-button type="warning" block @click="exit">退出账户</van-button>
      </van-cell>
      <!-- </van-cell-group> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'setting',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.showSetting()
  },
  methods: {
    showUserInfo() {
      // this.userInfoControl = true
      this.$router.push({
        path: '/user/setting/userinfo',
        query: { redirect: this.$route.path }
      })
    },
    showAccount() {
      this.$router.push({
        path: '/user/setting/account',
        query: { redirect: this.$route.path }
      })
      // this.accountControl = true
    },
    showAddressList() {
      // this.addressListControl = true
      this.$router.push({
        path: '/user/setting/address',
        query: { redirect: this.$route.path }
      })
    },
    onClickLeft() {
      this.$router.push('/my')
    },
    exit() {
      window.sessionStorage.removeItem('market-token')
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
