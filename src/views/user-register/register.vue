<template>
  <div>
    <van-nav-bar
      title=""
      :border="false"
      :left-text="leftText"
      left-arrow
      @click-left="back"
    ></van-nav-bar>

    <div v-show="telFlag" class="content" :key="1">
      <div class="title">
        <h3>账户注册</h3>
      </div>
      <div class="userPwd">
        <van-cell-group>
          <div class="cell" @click="showSchoolPopup">
            <div class="left">选择学校</div>
            <div class="right">
              <div class="value">{{ regForm.college }}</div>
              <van-icon name="arrow" />
            </div>
          </div>
          <van-field v-model="regForm.sn" placeholder="请输入学号" />
          <van-field v-model="regForm.pwd1" placeholder="请输入密码" />
          <van-field v-model="regForm.pwd2" placeholder="请确认密码" />
        </van-cell-group>
        <van-button
          class="reg"
          type="primary"
          block
          round
          @click="next"
          native-type="submit"
        >
          下一步
        </van-button>
      </div>
    </div>
    <div v-show="!telFlag" class="content" :key="2">
      <div class="title">
        <h3>账户注册</h3>
      </div>
      <van-field v-model="regForm.mobile" placeholder="请输入手机号" />
      <van-field
        v-model="regForm.sms"
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
      <van-button
        class="reg"
        :loading="loading"
        round
        type="primary"
        @click="reg"
        text="注册"
        size="large"
      />
    </div>

    <!-- 学校选择 -->
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
  name: 'register',
  components: {},
  props: {},
  data() {
    return {
      regForm: {
        sn: '',
        pwd1: '',
        pwd2: '',
        college: '',
        mobile: '',
        sms: '',
        region: '' //学校代码
      },
      loading: false,
      telFlag: true,
      areaList: school,
      schoolShow: false,
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
    'regForm.mobile': function(value) {
      var reg = /\b1[3456789]\d{9}\b/g
      let val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    back() {
      if (this.telFlag == true) {
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.query.redirect }
        })
      } else {
        this.leftText = '注册'
        this.telFlag = true
        this.loading = false
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
    getSchool(obj) {
      console.log(obj)
      this.regForm.region = obj[0].code
      this.regForm.college = obj[0].name
      this.schoolShow = false
    },
    showSchoolPopup() {
      this.schoolShow = !this.schoolShow
    },
    async reg() {
      this.loading = true
      const { data: re } = await this.$http.post('/public/users/reg', {
        sn: this.regForm.sn,
        password: this.regForm.pwd1,
        tel: this.regForm.mobile,
        name: this.regForm.sn,
        email: '',
        createAt: Date.now(),
        lastLoginAt: Date.now(),
        setting: {
          college: this.regForm.college,
          region: this.regForm.region,
          name: this.regForm.sn
        }
      })
      console.log(re)
      if (re.code !== 201) {
        this.loading = false
        return this.$toast(re.message)
      }
      window.sessionStorage.setItem('market-token', 'Bearer ' + re.data)
      this.$toast(re.message)
      this.loading = false
      this.$router.push(this.$route.query.redirect)
    },
    next() {
      if (!this.regForm.college) {
        return this.$toast('请选择学校！')
      }
      if (!this.regForm.sn) {
        return this.$toast('请输入学号')
      }
      if (!this.regForm.pwd1 && !this.regForm.pwd2) {
        return this.$toast('密码不能为空')
      }
      if (this.regForm.pwd1 != this.regForm.pwd2) {
        return this.$toast('密码不一致')
      }
      this.leftText = '上一步'
      this.telFlag = false
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
.reg {
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
  padding: 10px 16px;
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
