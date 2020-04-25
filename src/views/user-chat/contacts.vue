<template>
  <div class="contact-main">
    <div class="nav">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="user-o" slot="right" />
      </van-nav-bar>
    </div>
    <div class="hide" style="padding-top:55px"></div>
    <!-- <van-list
      v-model="loading"
      :error.sync="error"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="400"
      direction="up"
    > -->
    <div ref="contentBox" class="content">
      <div v-for="(item, index) in messageList" :key="index">
        <template v-if="item.sendUid == userId">
          <div>
            <div class="father father-right">
              <div class="log">
                <img :src="userImg" />
              </div>
              <div class="son son-right">
                <div class="title title-right"></div>
                <div class="message message-right">
                  <div>
                    <template v-if="!item.content.msgTypeOfImage">
                      <div>{{ item.content.text }}</div>
                    </template>
                    <template v-else>
                      <div>
                        <img
                          :src="item.content.image"
                          @click="showImage(item.content.index)"
                        />
                      </div>
                    </template>
                  </div>
                </div>
                <div>
                  <msgTool
                    :msgTimeStamp="item.timeStamp"
                    :timeStyle="'right'"
                  ></msgTool>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div>
            <div class="father father-left">
              <div class="log">
                <img :src="toUserImg" />
              </div>
              <div class="son son-left">
                <div class="title title"></div>
                <div class="message message-left">
                  <div>
                    <template v-if="!item.content.msgTypeOfImage">
                      <div>{{ item.content.text }}</div>
                    </template>
                    <template v-else>
                      <div>
                        <img
                          :src="item.content.image"
                          @click="showImage(item.content.index)"
                        />
                      </div>
                    </template>
                  </div>
                </div>
                <msgTool
                  :msgTimeStamp="item.timeStamp"
                  :timeStyle="'left'"
                ></msgTool>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- </van-list> -->

    <div class="action">
      <van-cell-group title="">
        <van-field
          v-model="sms"
          center
          placeholder="请输入……"
          autofocus
          autosize
          rows="1"
          @input="showSendBtn"
          type="textarea"
        >
          <template slot="button">
            <div class="right-button">
              <van-icon name="smile-o" class="smile" @click="showFaceContent" />
              <template v-if="!sendBtn">
                <div class="addPhoto" @click="showOtherPanel">+</div>
              </template>
              <template v-else>
                <van-button
                  style="height:40px"
                  type="primary"
                  @click="handleMessage()"
                >
                  发送
                </van-button>
              </template>
            </div>
          </template>
        </van-field>
        <transition name="van-slide-up">
          <div class="browBox" v-if="faceShow">
            <ul class="face-ul">
              <li
                v-for="(item, index) in faceList"
                :key="index"
                @click="getBrow(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="other-func" v-if="otherFunShow">
            <van-uploader :after-read="handleImageMessage" capture="camera">
              <van-icon name="photograph" />
            </van-uploader>
            <van-uploader :after-read="handleImageMessage">
              <van-icon name="photo" />
            </van-uploader>
          </div>
        </transition>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import appData from '@/assets/js/emojis.json'
import { ImagePreview } from 'vant'
import msgTool from './components/msgTool.vue'
export default {
  name: 'contact',
  components: {
    msgTool
  },
  data() {
    return {
      title: '',
      error: false,
      loading: false,
      finished: false,
      session: '', //会话id
      toId: '', // 接受者id
      toName: '',
      name: '', // 发送者name
      userId: '', // 发送者id
      userImg: '', // 发送者头像路径
      toUserImg: '', // 收信人头像路径
      sms: '',
      imgSrc: '',
      faceList: [],
      imageList: [],
      indexPos: -1, // 图片索引
      faceShow: false,
      otherFunShow: false,
      messageObj: [],
      messageList: [],
      sendBtn: false //控制发送键显示
    }
  },
  mounted() {
    this.toName = this.$route.query.name //接收者id
    this.title = `与 ${this.toName} 会话`
    this.toId = this.$route.query.toId
    this.session = this.$route.query.session
    this.toUserImg = this.$route.query.toUserImgUrl //接受者头像
    let user = JSON.parse(window.sessionStorage.getItem('market-uid'))
    this.userId = user._id //发送者id
    this.name = user.name
    this.userImg = user.avatar //发送者头像

    // if (!id) {
    //   window.sessionStorage.removeItem('market-token')
    //   window.sessionStorage.removeItem('market-uid')
    //   let path = this.$route.path
    //   this.$toast('请重新登陆')
    //   this.$router.push({
    //     path: '/login',
    //     query: { type: 'pwd', redirect: path }
    //   })
    //   return
    // }
    // var message = {
    //   session: this.session,
    //   content: {
    //     text: this.$route.query.message,
    //     image: '123',
    //     msgTypeOfImage: false,
    //     src: '',
    //     index: 0
    //   },
    //   timeStamp: this.$route.query.timeStamp,
    //   recUid: this.toId,
    //   sendUid: this.userId,
    //   readState: '1'
    // }
    // this.messageList.push(message)
    // console.log(this.messageList)
    this.$socket.emit('connect')
  },
  sockets: {
    connect() {
      //查看socket是否渲染成功
      var u = { sendUid: this.userId, recUid: this.toId }
      this.$socket.emit('online', u)
      console.log('链接成功')
    },
    disconnect() {
      //检测socket断开链接
      this.$socket.emit('underline', this.userId)
      console.log('断开链接')
    },
    reconnect() {
      console.log('重新链接')
    },
    //客户端接收后台传输的socket事件
    message(data) {
      var d
      console.log(data)
      this.$nextTick(function() {
        var content = this.$refs.contentBox
        content.scrollTop = content.scrollHeight
      })
      data.forEach(msg => {
        if (msg.sendUid == this.toId && msg.recUid == this.userId) {
          d = this.filterImage(msg)
          this.messageList.push(d)
        } else if (msg.sendUid == this.userId && msg.recUid == this.toId) {
          d = this.filterImage(msg)
          this.messageList.push(d)
          console.log(this.imageList)
          // this.messageList.push(msg)
        } else if (msg.recUid == this.userId) {
          this.$notify({
            message: '有一条新消息',
            type: 'warning',
            duration: 1000
          })
          var config
          if (msg.content.msgTypeOfImage) {
            config = {
              body: '是一张图片', //正文内容
              dir: 'auto', //文本显示方向 auto ,ltr,rtl
              icon:
                'https://koala-1253612635.cos.ap-shanghai.myqcloud.com/markdown/th.png'
            }
          } else {
            config = {
              body: msg.content.text, //正文内容
              dir: 'auto', //文本显示方向 auto ,ltr,rtl
              icon:
                'https://koala-1253612635.cos.ap-shanghai.myqcloud.com/markdown/th.png'
            }
          }
          if (window.Notification) {
            if (Notification.permission === 'granted') {
              var notification = new Notification('收到一条消息', config)
              console.log(notification)
              //delete notification;
            } else {
              Notification.requestPermission()
            }
          }
        }
      })
      //接收的消息
    }
  },
  methods: {
    initTime() {
      return Date.parse(new Date())
    },
    onClickLeft() {
      this.$router.replace('/user/message')
    },
    onClickRight() {
      this.$toast('按钮')
      console.log(this.messageList)
    },
    // 发送含有图片文件信息
    handleImageMessage(e) {
      var msg = {
        session: this.session,
        content: {
          text: this.sms,
          image: e.content,
          msgTypeOfImage: true,
          src: '',
          index: 0
        },
        timeStamp: this.initTime(),
        recUid: this.toId,
        sendUid: this.userId,
        readState: 1
      }
      this.messageObj.push(msg)
      this.send()
    },
    // 输入文本信息
    handleMessage() {
      var msg = {
        session: this.session,
        content: {
          text: this.sms,
          image: '',
          msgTypeOfImage: false,
          src: '',
          index: 0
        },
        timeStamp: this.initTime(),
        recUid: this.toId,
        sendUid: this.userId,
        readState: 0
      }
      this.sms = ''
      this.messageObj.push(msg)
      this.sendBtn = false
      this.send()
    },
    // 发送
    send() {
      // 发送信息
      this.faceShow = false
      this.otherFunShow = false
      this.$socket.emit('send', this.messageObj)
      //this.messageList.push(this.messageObj[0])
      this.$nextTick(function() {
        var content = this.$refs.contentBox
        content.scrollTop = content.scrollHeight
      })
      this.messageObj = []
      // 发送完信息 向服务器发送最后通讯时间
      // funciton
    },
    // 展示发送按钮
    showSendBtn(e) {
      console.log(e)
      if (e != '' || this.sms != '') {
        this.sendBtn = true
      } else {
        this.sendBtn = false
      }
    },
    // 展示表情面板
    showFaceContent() {
      this.otherFunShow = false
      this.faceShow = !this.faceShow
      if (this.faceShow == true) {
        for (let i in appData) {
          this.faceList.push(appData[i].char)
        }
      } else {
        this.faceList = []
      }
    },
    showOtherPanel() {
      this.faceShow = false
      this.otherFunShow = !this.otherFunShow
    },
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.sms += this.faceList[index]
        }
      }
      this.sendBtn = true
      console.log(this.sms)
    },
    showImage(index) {
      ImagePreview({
        images: this.imageList,
        startPosition: index,
        onClose() {
          // do something
        }
      })
    },
    // 过滤消息中图片url
    filterImage(msg) {
      if (msg.content.msgTypeOfImage) {
        this.imageList.push(msg.content.src)
        this.indexPos++
        msg.content.index = this.indexPos
      }
      return msg
    },
    // 下拉加载，还存在问题
    onLoad() {
      console.log('上拉加载ing')
      //   var msg = {
      //     session: this.session,
      //     content: {
      //       text: '测试ig',
      //       image: '',
      //       msgTypeOfImage: false,
      //       src: '',
      //       index: 0
      //     },
      //     timeStamp: this.initTime(),
      //     recUid: this.toId,
      //     sendUid: this.userId,
      //     readState: 0
      //   }
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.messageList.splice(0, 0, msg)
      //     }

      //     // 加载状态结束
      //     this.loading = false

      //     // 数据全部加载完成
      //     if (this.messageList.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 2000)
      //   console.log(this.messageList.length)
    }
  }
}
</script>
<style scoped lang="scss">
.contact-main {
  position: absolute;
  top: 0;
  z-index: 200;
  width: 100%;
  height: calc(100vh);
}
.nav {
  position: fixed;
  width: 100%;
}
.content {
  width: 100%;
  background-color: #f7f8fa;
  height: calc(100vh - 101px);
  padding-top: 50px;
  overflow: scroll;
}
.action {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.father {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 10px 0 15px 0;
}
.father-left {
  flex-direction: row;
  margin-left: 8px;
}

.father-right {
  flex-direction: row-reverse;
  margin-right: 8px;
}
.son {
  display: flex;
  flex-direction: column;
}
.son-right {
  margin-right: 10px;
}
.son-left {
  margin-left: 10px;
}
.title {
  font-size: 12px;
  margin-bottom: 2px;
}

.title-right {
  text-align: right;
}

.message {
  max-width: calc(100vw / 2 - 20px);
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  word-wrap: break-word;
  img {
    width: 150px;
    height: 200px;
  }
}

.message-right {
  background-color: cadetblue;
}

.message-left {
  background-color: white;
}

.log img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
}
.addPhoto {
  width: 30px;
  height: 30px;
  line-height: 24px;
  border-radius: 50%;
  color: #000;
  font-size: 40px;
  border: 2px solid #000;
  text-align: center;
}
.smile {
  font-size: 40px;
  margin-right: 8px;
}
.right-button {
  display: flex;
  align-items: center;
}
.browBox {
  height: 200px;
  overflow: scroll;
  font-size: 29px;
  .face-ul {
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    padding: 5px 10px;
    li {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.other-func {
  height: 200px;
  font-size: 50px;
  i {
    padding: 4px;
    margin-right: 10px;
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>
