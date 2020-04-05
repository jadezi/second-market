<template>
  <div class="setting-bg">
    <div class="title">
      <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="contnet">
      <van-cell-group>
        <van-cell title="个人资料设置" is-link @click="showUserInfo" />
        <van-cell title="账户设置" is-link to="index" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="黑名单" is-link to="index" />
        <van-cell title="隐私" is-link to="index" />
        <van-cell title="安全中心" is-link to="index" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="关于" is-link to="index" />
        <van-cell title="路由跳转" is-link to="index" />
      </van-cell-group>
    </div>
    <transition name="van-slide-right">
      <div class="userInfo" v-if="userInfoControl">
        <user-info @close="hiddenUserInfo"></user-info>
      </div>
    </transition>
  </div>
</template>
<script>
import userInfo from './components/userInfo.vue'
export default {
  name: 'setting',
  components: {
    userInfo
  },
  props: {},
  data() {
    return {
      userInfoControl: false
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
    onClickLeft() {
      this.$emit('close')
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
  height: calc(100vh);
  z-index: 2000;
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #f4f5f9;
}
</style>
