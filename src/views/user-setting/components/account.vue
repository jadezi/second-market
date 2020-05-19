<template>
  <div>
    <div class="title">
      <van-nav-bar
        title="我的资料"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
      />
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        head-height="50"
      >
        <div class="baseInfo">
          <div class="header">账号设置</div>
          <div class="cell-group">
            <div class="cell">
              <div class="left">主页背景图片</div>
              <div class="right">
                <div class="value">
                  <van-uploader :deletable="false" :after-read="afterRead">
                    <van-image width="50" height="50" :src="avatar" />
                  </van-uploader>
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <div v-if="circularLoading" class="circular">
      <van-loading color="#FF66CC" :size="45" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'accont',
  components: {},
  props: {},
  data() {
    return {
      circularLoading: false,
      isLoading: false,
      userInfo: {},
      avatar: '',
      history: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.userInfo = this.$store.state.userInfo.userInfo
    this.avatar = this.userInfo.setting.bgImg
    console.log(this.userInfo)
  },
  methods: {
    onRefresh() {},
    onClickLeft() {
      this.$router.push(this.$route.query.redirect)
    },
    async afterRead(file) {
      let { data:re } = await this.$http.put('private/v1/users/update/bgimg',{
        id: this.userInfo._id,
        avatar: file.content
      })
      if (re.code !== 200) {
        return this.$toast(re.message)
      }
      this.$toast(re.message)
      this.avatar = re.data.src
    }
  }
}
</script>
<style scoped lang="scss">
.van-pull-refresh {
  min-height: max-content;
}

.circular {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh);
  z-index: 99999;
  position: absolute;
  top: 0px;
}
.baseInfo {
  width: 90%;
  margin: 20px auto;
  .header {
    font-size: 14px;
    color: #bbbbbb;
  }
  .cell-group {
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 4px;
    margin-bottom: 10px;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 12px;
    .left {
      display: flex;
      align-items: center;
      .van-icon {
        font-size: 20px;
        color: red;
        margin-right: 6px;
      }
    }
    .right {
      color: #8e8e8e;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .value {
        margin-right: 8px;
      }
    }
  }
}
</style>
