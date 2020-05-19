<template>
  <div>
    <div class="notfound" v-if="!access">
      <div class="img">
        <img width="80%" src="../../assets/img/4042.gif" />
      </div>
      <div class="action">
        <p class="oops">OOPS!</p>
        <p class="text">糟糕！ {{ error }}</p>
        <van-button round type="info" to="/bbs">返回首页</van-button>
      </div>
    </div>
    <div v-else>
      <van-sticky>
        <van-nav-bar
          title="动态"
          left-text="返回"
          left-arrow
          right-text="投诉/举报"
          @click-left="onClickLeft"
          @click-right="report"
        />
      </van-sticky>
      <div class="info" v-if="dynamic != ''">
        <div class="userInfo">
          <div class="userImg">
            <img :src="dynamic.did.author.avatar" href="#" />
          </div>
          <div>
            <div class="userName">{{ dynamic.did.author.setting.name }}</div>
            <div class="pushTime">{{ dynamic.did.createAt | timeFilter }}</div>
          </div>
          <!-- <div class="identity" v-if="dynamic.goodId.uid.auth">
            <van-icon name="award-o" size="1.7em" color="#40E0D0" />
            <van-button plain type="info" size="mini" color="#40E0D0">
              实名认证
            </van-button>
          </div> -->
          <!-- <div class="identity" v-else>
            <van-icon name="award-o" size="1.7em" color="#40E0D0" />
            <van-button plain type="danger" size="mini" color="#40E0D0">
              未实名认证
            </van-button>
          </div> -->
        </div>
        <van-divider />
        <!-- <div class="priceInfo">
          <div class="salePrice">￥{{ dynamic.goodId.summary.saleOfPrice }}</div>
          <div class="oldPrice">￥{{ dynamic.goodId.summary.buyOfPrice }}</div>
          <div class="freeShipping"><van-tag type="danger">包邮</van-tag></div>
        </div> -->
        <div class="shopContent">
          <div class="shopText">{{ dynamic.content }}</div>
          <div class="shopImage">
            <img
              v-for="(item, index) in dynamic.imageGroup"
              :key="index"
              @click="showImage(index)"
              :src="item"
            />
          </div>
        </div>
      </div>
      <div class="juli"></div>
      <cmtParent ref="cmt" :goodId="dynamic.did.author._id" :identity="identity"></cmtParent>
      <div class="bottom-menu">
        <transition name="van-fade">
          <div class="menu" v-if="isReply">
            <div class="replyMsg" @click="replyBtn">
              <van-icon name="chat-o" size="1.8em" />
              <div class="leaveNote">留言</div>
            </div>
            <!-- <div class="iwant">
              <van-button
                size="normal"
                style="height:40px"
                round
                @click="buy"
                color="linear-gradient(to right, #fc9114, rgba(239,131,21))"
              >
                购买
              </van-button>
              <van-button
                size="normal"
                style="height:40px"
                round
                @click="connect"
                color="linear-gradient(to right, #fc9114, #ff2222)"
              >
                和TA&nbsp;沟通下
              </van-button>
            </div> -->
          </div>
          <!-- </transition>
      <transition name="van-fade"> -->
          <div class="menu" v-else-if="isKeyBroad">
            <div class="KeyBroad">
              <van-icon name="smile-comment-o" size="1.8em" @click="replyBtn" />
              <van-cell-group>
                <van-field
                  :autofocus="1 > 0"
                  v-model="replyContent"
                  placeholder="给ta捎句话吧"
                />
              </van-cell-group>
            </div>
            <div>
              <van-button
                size="normal"
                style="height:40px"
                v-bind:disabled="replyContent.length == 0"
                round
                type="primary"
                @click="reply"
              >
                留&nbsp;言
              </van-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 投诉窗口 -->
    <van-action-sheet v-model="reportShow" title="举报理由" close-on-popstate>
      <van-field
        v-model="reportText"
        placeholder="请输入举报理由"
        label="理由"
      />
      <van-button
        round
        type="info"
        @click="reportPush"
        :disabled="reportText ? false : true"
      >
        提交投诉信息
      </van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import cmtParent from '@/views/user-comment/index.vue'
import { differDateFormat } from '@/assets/js/date.js'
export default {
  name: 'dynamicDetail',
  data() {
    return {
      id: '',
      access: true,
      replyContent: '',
      isReply: true,
      isKeyBroad: false,
      replyMessage: '',
      dynamic: {},
      reportShow: false,
      reportText: '',
      error: '不能访问了',
      show: false,
      identity: '楼主'
    }
  },
  components: {
    cmtParent
  },
  filters: {
    timeFilter(time) {
      const now = Date.parse(new Date())
      const differ = differDateFormat(parseInt(time), now)
      if (differ.day === 0) {
        if (differ.hour === 0) {
          return differ.minute + '分钟前发布'
        } else {
          return differ.hour + '小时前发布'
        }
      } else {
        return differ.day + '天前发布'
      }
    }
  },
  created() {
    console.log(this.$route.params.id)
    if (this.$route.params.id) {
      this.access = true
      this.getDetailsByDynamicId()
    } else {
      this.access = false
    }
  },
  mounted() {
    var u = JSON.parse(window.sessionStorage.getItem('market-uid'))
    this.$store.commit('setUserInfo', u)
    this.id = this.$store.state.userInfo.userInfo._id
  },
  methods: {
    async reply() {
      if (!this.id) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      } else {
        console.log('=======-=====')
        console.log(this.id)
        console.log(this.dynamic.did.author._id)
        console.log('=======-=====')
        let { data: re } = await this.$http.post('private/v1/comment/add', {
          did: this.$route.params.id,
          content: {
            uid: this.id,
            replyId: this.dynamic.did.author._id,
            comment: this.replyContent,
            commentFloorId: ''
          }
        })
        if (re.code !== 201) {
          return this.$toast(re.message)
        }
        this.$refs.cmt.toGetNewCommentList()
      }
    },
    async getDetailsByDynamicId() {
      let { data: re } = await this.$http.get('public/v1/dynamic/details', {
        params: {
          id: this.$route.params.id
        }
      })
      console.log(re)
      if (re.code !== 200) {
        this.error = re.message
        this.access = false
        return this.$toast(re.message)
      }
      this.dynamic = re.data
      console.log(this.dynamic)
    },
    report() {
      this.reportShow = true
    },
    async reportPush() {
      if (!this.id) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      } else {
        if (!this.reportText) {
          return this.$toast('请输入投诉理由')
        }
        let { data: re } = await this.$http.post(
          'private/v1/complaint/report',
          {
            url: `http://localhost:8080/#${this.$route.path}`,
            complainant: this.id,
            respondent: this.goods.goodId.uid._id,
            reason: this.reportText
          }
        )
        if (re.code != 201) {
          return this.$toast(re.message)
        }
        this.$toast(re.message)
        this.reportShow = false
        this.reportText = ''
      }
    },
    onClickLeft() {
      this.$router.push('/bbs')
    },
    replyBtn() {
      this.isReply = !this.isReply
      this.isKeyBroad = !this.isKeyBroad
    },
    showImage(pos) {
      ImagePreview({
        images: this.goods.imageGroup,
        startPosition: pos,
        loop: false,
        onClose() {
          // do something
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.van-action-sheet__content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.info {
  width: 90%;
  margin: 10px auto;
  .userInfo {
    display: flex;
    justify-content: flex-start;
    .userImg img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .userName {
      font-size: 16px;
      font-weight: bolder;
    }
    .pushTime {
      color: #efefef;
      font-size: 14px;
    }
    .identity {
      display: flex;
    }
  }
  .priceInfo {
    display: flex;
    margin: 15px 0px;
    .salePrice {
      margin-right: 8px;
    color: #ff0000;
      font-size: 20px;
      font-weight: bolder;
    }
    .oldPrice {
      margin-right: 10px;
      font-size: 14px;
      color: #999999;
      text-decoration: line-through;
    }
  }
  .shopContent {
    display: flex;
    flex-direction: column;
    .shopText {
      margin: 15px 0;
    }
    .shopImage {
      border-radius: 7px;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.juli {
  height: 15px;
  width: 100%;
  background-color: #efefef;
}
.bottom-menu {
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #e2e2e2;
  .menu {
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .replyMsg {
      display: flex;
      flex-direction: column;
      .leaveNote {
        font-size: 14px;
        color: #c2c0c0cb;
      }
    }
    .iwant {
      display: flex;
      align-items: center;
    }
    .KeyBroad {
      display: flex;
      align-items: center;
    }
  }
}
.notfound {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  .oops {
    color: #1482f0;
  }
  p {
    font-size: 30px;
  }
  .action {
    width: 80%;
  }
}
</style>
