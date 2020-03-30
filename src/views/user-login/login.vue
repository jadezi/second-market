<template>
  <div>
    <van-nav-bar
      title=""
      :border="false"
      left-text="登陆"
      left-arrow
      @click-left="back"
    ></van-nav-bar>
    <div class="content">
      <div class="title">
        <h3>账户登陆</h3>
      </div>
      <div v-if="type === 'pwd'" class="userPwd">
        <van-cell-group>
          <van-field v-model="sn" placeholder="请输入学号" />
          <van-field v-model="password" placeholder="密码" />
        </van-cell-group>
        <van-button class="login" type="primary" block round @click="pwdLogin">
          登陆
        </van-button>

        <div class="phone-login" @click="toPhoneLogin">使用手机号快速登陆</div>
      </div>
      <div v-else class="msm">
        <van-field v-model="mobile" placeholder="请输入手机号" />
        <van-field
          v-model="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          label-class="label-left"
        >
          <template #button>
            <van-button
              type="default"
              @click="getyzcode"
              :disabled="attcode"
              v-if="showbtn"
            >
              获取验证码
            </van-button>
            <van-button type="primary" class="tsbtn" v-else>
              {{ code_ts }}
            </van-button>
          </template>
        </van-field>
        <van-button class="login" type="primary" block round>登陆</van-button>

        <div class="phone-login" @click="toUserPwd">使用账户密码登陆</div>
      </div>
      <div class="titps" @click="toRegister">没有账户？注册一个</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  components: {},
  props: {},
  data() {
    return {
      mobile: '',
      sn: '',
      password: '',
      sms: '',
      time: 60 * 1000,
      type: '',
      attcode: true, //点击获取验证码按钮判断
      showbtn: true, // 展示获取验证码或倒计时按钮判断
      yzcode: '',
      code_ts: '获取验证码', //倒计时提示文字
      sec: 60 // 倒计时秒数
    }
  },
  computed: {},
  watch: {
    mobile: function(value) {
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
    if (window.sessionStorage.getItem('market-token')) {
      this.$router.push(this.$route.query.redirect)
    }
    this.type = this.$route.query.type
  },
  mounted() {},
  methods: {
    back() {
      // this.$router.push('/')
      console.log(this.$route)
    },
    toPhoneLogin() {
      this.type = 'sms'
    },
    toUserPwd() {
      this.type = 'pwd'
    },
    async pwdLogin() {
      if (this.sn && this.password) {
        const { data: re } = await this.$http.post('public/v1/users/login', {
          sn: this.sn,
          password: this.password
        })
        if (re.code === 200) {
          window.sessionStorage.setItem('market-token', 'Bearer ' + re.data)
          // this.$store.commit('setToken', re.data)
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$toast(re.errorCode + ':' + re.message)
        }
      } else {
        this.$toast('请输入账户密码')
      }
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
    toRegister() {
      this.$router.push({
        path: '/register',
        query: { redirect: this.$route.query.redirect }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.title {
  h3 {
    display: flex;
    justify-content: center;
  }
}
.login {
  margin-top: 20px;
}
.content {
  width: 85%;
  margin: 0 auto;
}
.van-nav-bar {
  .van-nav-bar__text,
  .van-icon-arrow-left {
    color: #696969;
    font-size: 1rem;
  }
}
.phone-login {
  text-align: center;
  font-size: 16px;
  color: #696969;
  margin-top: 20px;
}
.label-left span {
  padding: 0px;
}
</style>
