<template>
  <div>
    <div>
      <div class="content">
        <div class="user-log">
          <img :src="item.uid.avatar" href="#" />
        </div>
        <div class="msg">
          <div class="msg-top">
            <div class="title">
              {{ item.uid.setting.name }}
              <van-tag
                v-if="item.uid._id == goodId.uid._id"
                style="margin-left:4px"
                type="primary"
              >
                {{ identity }}
              </van-tag>
            </div>
            <div
              @click="addFabulous(item._id)"
              :class="likeActive(item.like) ? 'zan-active' : 'zan'"
            >
              <van-icon
                :name="likeActive(item.like) ? 'good-job' : 'good-job-o'"
              />
              <div v-if="item.like.length > 0" class="number">
                {{ item.like.length }}
              </div>
            </div>
          </div>
          <div
            class="comment"
            @click="showPopup(item.uid.setting.name, item.uid._id)"
          >
            {{ item.comment }}
          </div>
          <div class="timeStamp">{{ item.createAt | dateFilters }}</div>
        </div>
      </div>
      <van-divider />
      <div class="reply">
        <div v-for="(itemC, indexC) in commentList" :key="indexC">
          <div v-show="indexC < 1 || !isMore">
            <div class="content">
              <div class="reply-user-log">
                <img :src="itemC.uid.avatar" href="#" />
              </div>
              <div class="msg">
                <div class="msg-top">
                  <div class="title">
                    {{ itemC.uid.setting.name }}
                    <van-tag
                      v-if="itemC.uid._id == goodId.uid._id"
                      style="margin-left:4px"
                      type="primary"
                    >
                      {{ identity }}
                    </van-tag>
                  </div>
                  <div
                    :class="likeActive(itemC.like) ? 'zan-active' : 'zan'"
                    @click="addFabulous(itemC._id)"
                  >
                    <van-icon
                      :name="likeActive(itemC.like) ? 'good-job' : 'good-job-o'"
                    />
                    <div class="number" v-show="item.like.length > 0">
                      {{ item.like.length }}
                    </div>
                  </div>
                </div>
                <div
                  class="comment"
                  @click="showPopup(itemC.uid.setting.name, itemC.uid._id)"
                >
                  {{ itemC.comment }}
                </div>
                <div class="timeStamp">
                  {{ itemC.createAt | dateFilters }}
                </div>
              </div>
            </div>
            <van-divider />
          </div>
        </div>
        <div
          class="hideContent"
          v-if="isMore && commentList.length > 1"
          @click="isMoreEnable()"
        >
          <van-cell
            :title="`展开剩余 ${commentList.length - 1} 评论`"
            style="padding:0px"
            icon="arrow-down"
          ></van-cell>
        </div>
        <van-divider v-if="isMore && commentList.length > 1" />
      </div>
    </div>

    <van-action-sheet v-model="popup" title="评论回复" close-on-popstate>
      <!-- <div style="height: 130px"> -->
      <van-field
        v-model="reply"
        @input="input"
        :placeholder="replyName"
        label="回复"
      />
      <van-button
        round
        type="info"
        @click="save"
        style="width:80%"
        :disabled="reply ? false : true"
      >
        确定修改
      </van-button>
      <!-- </div> -->
    </van-action-sheet>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
export default {
  props: ['commentChild', 'comment', 'goodId', 'identity'],
  data() {
    return {
      id: '',
      reply: '',
      replyName: '',
      replyId: '',
      popup: false,
      isMore: true,
      commentList: this.commentChild,
      item: this.comment
    }
  },
  mounted() {
    this.id = this.$store.getters.getUserInfo._id
  },
  watch: {
    comment: {
      handler(newVal) {
        this.item = newVal
      },
      deep: true
    },
    commentChild: {
      handler(newVal) {
        this.commentList = newVal
      },
      deep: true
    }
  },
  filters: {
    dateFilters: function(timeStamp) {
      var t = Number(timeStamp)
      var nowDateStamp = new Date()
      var timeStampObj = new Date(t)
      var day = nowDateStamp.getDate() - timeStampObj.getDate()
      if (day > 3 && day < 20) {
        return formatDate(t, 'MM-dd hh:mm')
      } else if (day == 2) {
        return '前天 ' + formatDate(t, 'hh:mm')
      } else if (day == 1) {
        return '昨天 ' + formatDate(t, 'hh:mm')
      } else if (day == 0) {
        return formatDate(t, 'hh:mm')
      } else {
        console.log(timeStamp)
        return formatDate(t, 'yyyy-MM-dd hh:mm')
      }
    }
  },
  methods: {
    // 评论按照日期排序
    commentSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let index = 0; index < arr.length; index++) {
          if (arr[i].createTime < arr[index].createTime) {
            let tmp = arr[i]
            arr[i] = arr[index]
            arr[index] = tmp
          }
        }
      }
      return arr
    },
    // 增加点赞数
    async addFabulous(cid) {
      if (!this.id) {
        this.$toast('请登录')
        // this.$router.push({ path: '/login', redirect: this.$route.fullPath })
        return
      }
      let { data: re } = await this.$http.put('private/v1/comment/like', {
        id: this.goodId._id,
        user: this.id,
        cid: cid
      })
      if (re.code != 201) {
        return this.$toast(re.message)
      }
      this.$toast(re.message)
    },
    // 点赞后更改样式
    likeActive(like) {
      if (typeof like != Array || like.length == 0) {
        return false
      }
      like.forEach(item => {
        if (item == this.id) {
          return true
        }
      })
      return false
    },
    //回复
    async save() {
      if (!this.id) {
        this.$router.push({ path: '/login', redirect: this.$route.fullPath })
        return
      }
      this.popup = false
      let { data: re } = await this.$http.post('private/v1/comment/add', {
        did: this.$route.params.id,
        content: {
          uid: this.id,
          replyId: this.goodId.uid._id,
          comment: this.reply,
          commentFloorId: this.item._id
        }
      })
      if (re.code !== 201) {
        return this.$toast(re.message)
      }
      this.$emit('getComment')
      this.reply = ''
    },
    input(value) {
      console.log(value)
      if (value) {
        var patt = new RegExp('@')
        if (!patt.test(value)) {
          this.reply = `${this.replyName} ${value}`
        }
      }
    },
    showPopup(name, id) {
      this.replyName = `@${name} `
      this.popup = true
      console.log('-----')
      this.replyId = id
      console.log(id)
      console.log('-----')
    },
    isMoreEnable() {
      this.isMore = false
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: flex-start;
  .zan {
    display: flex;
  }
  .zan-active {
    display: flex;
    color: rgb(240, 104, 104);
  }
  .reply-user-log img {
    width: 30px;
    height: 30px;
  }
  .user-log img {
    width: 35px;
    height: 35px;
  }
  .msg {
    width: 90%;
    padding: 0 10px;
    .msg-top {
      display: flex;
      justify-content: space-between;
    }
    .comment {
      word-break: break-all;
      font-size: 0.9em;
    }
    .timeStamp {
      font-size: 12px;
      color: #ababab;
    }
  }
}
.number {
  padding: 0 2px 0;
  font-size: 14px;
}
.reply {
  margin-top: 15px;
  margin-left: 45px;
}
.van-action-sheet__content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
