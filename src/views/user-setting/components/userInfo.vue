<template>
  <div>
    <div class="title">
      <van-nav-bar
        title="我的资料"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
      />
      <div class="step">
        <div class="process-text">完成度{{ process }}%</div>
        <van-progress
          :percentage="process"
          stroke-width="4"
          :show-pivot="false"
          color="#ff7300"
        />
      </div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        head-height="50"
      >
        <div class="baseInfo">
          <div class="header">基本信息</div>
          <div class="cell-group">
            <div class="cell">
              <div class="left">头像</div>
              <div class="right">
                <div class="value">
                  <van-image
                    width="50"
                    height="50"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">学号</div>
              <div class="right">
                <div class="value">
                  3180437026
                </div>
              </div>
            </div>
            <div class="cell">
              <div class="left">昵称</div>
              <div class="right">
                <div class="value">
                  wange
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">性别</div>
              <div class="right">
                <div class="value">
                  男
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">生日</div>
              <div class="right">
                <div class="value" @click="showDatePopup">
                  2019-06-17
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">常住</div>
              <div class="right">
                <div class="value">
                  浙江 宁波
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">简介</div>
              <div class="right">
                <div class="value"></div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">院校名称</div>
              <div class="right">
                <div class="value"></div>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>

        <div class="authInfo">
          <div class="header">认证信息</div>
          <div class="cell-group">
            <div class="cell">
              <div class="left">
                <van-icon name="certificate" />
                学生认证
              </div>
              <div class="right">
                <div class="value">
                  未认证
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>

      <van-popup
        v-model="dateShow"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="dateCancel"
          @confirm="getDate"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      process: 60,
      isLoading: false,
      count: 0,
      dateShow: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(1990)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
    onClickLeft() {
      this.$emit('close')
    },
    showDatePopup() {
      this.dateShow = true
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    dateCancel() {
      this.dateShow = false
    },
    getDate(value) {
      var d = new Date(value)
      console.log(d.getFullYear())
      this.dateShow = false
    }
  }
}
</script>
<style scoped lang="scss">
.van-pull-refresh {
  min-height: max-content;
}
.process-text {
  background-color: #ffffff;
  width: 100%;
  font-size: 12px;
  text-align: center;
  height: 20px;
}
.baseInfo,
.authInfo {
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
