<template>
  <div>
    <div class="title">
      <van-nav-bar
        title="我的资料"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
        right-text="保存"
        @click-right="push"
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
                  <van-uploader :deletable="false" :after-read="afterRead">
                    <van-image width="50" height="50" :src="userInfo.avatar" />
                  </van-uploader>
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">学号</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.sn }}
                </div>
              </div>
            </div>
            <div class="cell" @click="showNamePopup">
              <div class="left">昵称</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.name }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell" @click="showSexPopup">
              <div class="left">性别</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.sex }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell" @click="showDatePopup">
              <div class="left">生日</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.birth }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell" @click="showEmailPopup">
              <div class="left">邮箱</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.email }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell" @click="showTelPopup">
              <div class="left">手机号</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.tel }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">常住</div>
              <div class="right">
                <div class="value">
                  {{ userInfo.setting.city }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell" @click="showDescPopup">
              <div class="left">简介</div>
              <div class="right">
                <div class="value"></div>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="cell">
              <div class="left">院校名称</div>
              <div class="right">
                <div class="value">{{ userInfo.setting.college }}</div>
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
                <van-icon
                  name="certificate"
                  :class="auth ? 'auth' : 'noauth'"
                />
                学生认证
              </div>
              <div class="right">
                <div class="value">
                  {{ auth ? '已认证' : '未认证' }}
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
    <!-- 加载动画 -->
    <div v-if="circularLoading" class="circular">
      <van-loading color="#FF66CC" :size="45" />
    </div>
    <!-- 性别选择 -->
    <van-action-sheet
      v-model="sexShow"
      :actions="actions"
      @select="onSexSelect"
      cancel-text="取消"
      description="性别"
    />
    <!-- 编辑面板 -->
    <van-action-sheet v-model="nameShow" title="修改昵称" close-on-popstate>
      <van-field v-model="nickname" placeholder="请输入昵称" label="昵称" />
      <van-button
        round
        type="info"
        @click="save"
        :disabled="nickname ? false : true"
      >
        确定修改
      </van-button>
    </van-action-sheet>
    <!-- 邮箱面板 -->
    <van-action-sheet v-model="emailShow" title="修改邮箱" close-on-popstate>
      <van-field v-model="email" placeholder="请输入邮箱" label="邮箱" />
      <van-button
        round
        type="info"
        @click="save"
        :disabled="email ? false : true"
      >
        确定修改
      </van-button>
    </van-action-sheet>
    <!-- 手机号面板 -->
    <van-action-sheet v-model="telShow" title="修改手机号" close-on-popstate>
      <van-field v-model="tel" placeholder="请输入手机号" label="新手机号" />
      <van-field
        v-model="sms"
        center
        clearable
        placeholder="请输入短信验证码"
        label-class="label-left"
        style="width: 90%"
      >
        <template #button>
          <van-button
            type="default"
            @click="getyzcode"
            :disabled="attcode"
            v-if="showbtn"
            style="width:100%"
          >
            获取验证码
          </van-button>
          <van-button type="primary" class="tsbtn" v-else>
            {{ code_ts }}
          </van-button>
        </template>
      </van-field>
      <van-button
        round
        type="info"
        @click="save"
        :disabled="sms ? false : true"
      >
        确定修改
      </van-button>
    </van-action-sheet>
    <!-- 简介面板 -->
    <van-action-sheet
      v-model="signatureShow"
      title="修改简介"
      close-on-popstate
    >
      <van-field
        v-model="signature"
        rows="1"
        autosize
        label="简介"
        type="textarea"
        placeholder="介绍下自己"
      />
      <van-button round type="info" @click="save">确定修改</van-button>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  components: {},
  props: {},
  data() {
    return {
      isLoading: false,
      userInfo: {},
      // 面板控制
      dateShow: false,
      sexShow: false,
      editShow: false,
      signatureShow: false,
      nameShow: false,
      emailShow: false,
      telShow: false,
      // 本地值
      avatar: '',
      fileList: [],
      signature: '',
      nickname: '',
      email: '',
      tel: '',
      college: '',
      index: 0,
      process: 0,
      sms: '',
      circularLoading: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(1990),
      // 弹出框
      actions: [{ name: '男' }, { name: '女' }],
      // 认证
      auth: true,
      // 验证码
      leftText: '注册',
      attcode: true, //点击获取验证码按钮判断
      showbtn: true, // 展示获取验证码或倒计时按钮判断
      yzcode: '',
      code_ts: '获取验证码', //倒计时提示文字
      sec: 60 // 倒计时秒数
    }
  },
  computed: {},
  watch: {
    userInfo: {
      handler(newVal) {
        this.userInfo = newVal
        this.processInfo()
      },
      deep: true
    },
    tel(value) {
      var reg = /\b1[3456789]\d{9}\b/g
      let val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    }
  },
  created() {
    this.analyzeUser()
    this.processInfo()
  },
  mounted() {},
  methods: {
    processInfo() {
      for (let key in this.userInfo.setting) {
        if (this.userInfo.setting[key]) {
          this.index++
        }
      }
      var val = (this.index + 1) * 10
      this.index = 0
      this.process = val
    },
    analyzeUser() {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('market-uid'))
    },
    async onRefresh() {
      const { data: re } = await this.$http.get(
        'private/v1/users/getuserinfo',
        {
          params: {
            id: this.userInfo._id
          }
        }
      )
      if (re.code !== 200) {
        return this.$toast('获取用户信息失败')
      }
      window.sessionStorage.setItem('market-uid', JSON.stringify(re.data))
      this.analyzeUser()
      this.isLoading = false
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
      this.userInfo.setting.birth =
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      this.dateShow = false
      this.processInfo()
    },
    afterRead(file) {
      this.avatar = file.content
      this.userInfo.avatar = this.avatar
    },
    onSexSelect(item) {
      this.userInfo.setting.sex = item.name
      this.sexShow = false
      this.processInfo()
    },
    showSexPopup() {
      this.sexShow = true
    },
    showNamePopup() {
      this.nameShow = true
    },
    showEmailPopup() {
      this.emailShow = true
    },
    showTelPopup() {
      this.telShow = true
    },
    getyzcode() {
      var timer = setInterval(() => {
        this.sec = this.sec - 1
        this.code_ts = this.sec + 'S后重试'
        this.showbtn = false
        if (this.sec === 0) {
          clearInterval(timer)
          this.sec = 60
          this.code_ts = this.sec + 'S后重试'
          this.showbtn = true
        }
      }, 1000)
    },
    showDescPopup() {
      this.signatureShow = true
    },
    async push() {
      this.circularLoading = true

      let { data: re } = await this.$http.put('/private/v1/users/update', {
        id: this.userInfo._id,
        avatar: this.avatar,
        setting: this.userInfo.setting
      })
      if (re.code == 400 && re.errrCode == 3002) {
        this.circularLoading = false
        return this.$toast.fail({ message: re.message })
      }
      if (re.code == 400 && re.errrCode == 3001) {
        this.circularLoading = false
        return this.$toast.fail({ message: re.message })
      }
      if (re.code !== 200) {
        this.circularLoading = false
        return this.$toast.fail({ message: '保存失败' })
      }
      this.$toast.success({ message: re.message })
      this.onRefresh()
      this.circularLoading = false
    },
    save() {
      this.userInfo.setting.tel = this.tel
        ? this.tel
        : this.userInfo.setting.tel
      this.userInfo.avatar = this.avatar ? this.avatar : this.userInfo.avatar
      this.userInfo.setting.email = this.email
        ? this.email
        : this.userInfo.setting.email
      this.userInfo.setting.signature = this.signature
        ? this.signature
        : this.userInfo.setting.signature
      this.userInfo.setting.name = this.nickname
        ? this.nickname
        : this.userInfo.setting.name
      // 关闭面板
      this.telShow = false
      this.signatureShow = false
      this.nameShow = false
      this.emailShow = false
    }
  }
}
</script>
<style scoped lang="scss">
.van-pull-refresh {
  min-height: max-content;
}
.van-action-sheet__content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.van-button {
  width: 80%;
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
      .noauth {
        color: red;
      }
      .auth {
        color: green;
      }
      .van-icon {
        font-size: 20px;
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
