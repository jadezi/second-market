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
      <div v-if="type == 'pwd'" class="userPwd">
        <van-cell-group>
          <div class="cell" @click="showSchoolPopup">
            <div class="left">学校</div>
            <div class="right">
              <div class="value">{{ college }}</div>
              <van-icon name="arrow" />
            </div>
          </div>
          <van-field v-model="sn" label="学号" placeholder="请输入学号" />
          <van-field v-model="password" type="password" label="密码" placeholder="密码" />
        </van-cell-group>
        <van-button class="login" type="primary" block round @click="pwdLogin">
          登陆
        </van-button>

        <div class="phone-login" @click="toPhoneLogin">使用手机号快速登陆</div>
      </div>
      <div v-else class="msm">
        <van-field v-model="mobile" label="手机号" placeholder="请输入手机号" />
        <van-field
          v-model="sms"
          center
          clearable
          label="验证码"
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

    <van-popup v-model="schoolShow" position="bottom">
      <van-area
        :area-list="areaList"
        :columns-num="1"
        value="4"
        @cancel="showSchoolPopup"
        @confirm="getSchool"
      />
    </van-popup>
  </div>
</template>
<script>
import school from '@/assets/js/region.js'
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
      areaList: school,
      college: '',
      schoolShow: false,
      time: 60 * 1000,
      type: 'pwd',
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
    if (!window.sessionStorage.getItem('market-token')) {
      this.type = this.$route.query.type
    } else {
      this.getUserInfoByToken()
    }
    // if (this.$route.query.redirect) {
    //   this.$router.push(this.$route.query.redirect)
    // } else {
    //   this.$router.push('/')
    // }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push('/')
    },
    toPhoneLogin() {
      this.type = 'sms'
    },
    toUserPwd() {
      this.type = 'pwd'
    },
    async pwdLogin() {
      if (this.sn && this.password) {
        const { data: re } = await this.$http.post('public/users/login', {
          sn: this.sn,
          password: this.password,
          college: this.college
        })
        console.log(re)
        if (re.code == 400) {
          return this.$toast(re.message)
        }
        if (re.code == 403) {
          // 需要验证
          var banStartTime = parseInt(re.data.banStartTime)
          if (re.data.banTime === 999) {
            return this.$toast('账号违规，无法登陆')
          }
          var now = Date.now()
          var time = banStartTime + re.data.banTime * 3600 * 1000 - now
          if (time > 0) {
            let leavel = time % (24 * 3600 * 1000)
            var leave2 = leavel % (3600 * 1000)
            let hours = Math.floor(leavel / (3600 * 1000))
            let minutes = Math.floor(leave2 / (60 * 1000))
            return this.$toast(
              '账户被封禁：' +
                re.data.banTime +
                '小时\n' +
                '还剩下' +
                hours +
                '小时' +
                minutes +
                '分钟'
            )
          }
        }
        if (re.code !== 200) {
          return this.$toast(re.message)
        }
        window.sessionStorage.setItem('market-token', 'Bearer ' + re.data.token)
        this.$store.commit('setUserInfo', re.data)
        console.log(re)
        this.$router.push(this.$route.query.redirect)
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
    },
    getSchool(obj) {
      console.log(obj)
      this.college = obj[0].name
      this.schoolShow = false
    },
    showSchoolPopup() {
      this.schoolShow = !this.schoolShow
    },
    async getUserInfoByToken() {
      //const token = window.sessionStorage.getItem('market-token')
      const { data: re } = await this.$http.get(
        'private/users/getuserinfo/token'
      )
      if (re.code !== 200) {
        this.$toast('获取用户信息失败，请登陆')
        window.sessionStorage.removeItem('market-token')
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      }
      this.$store.commit('setUserInfo', re.data)
      this.userInfo = re.data
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect)
      } else {
        this.$router.push('/')
      }
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
.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
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
</style>
