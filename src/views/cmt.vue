<template>
  <div>
    <div>
      <div class="content">
        <div class="user-log">
          <img src="../assets/img/th.jpg" href="#" />
        </div>
        <div class="msg">
          <div class="msg-top">
            <div class="title">{{ item.name }}</div>
            <div
              @click="addFabulous(item)"
              :class="zanActive(item) ? 'zan-active' : 'zan'"
            >
              <van-icon :name="zanActive(item) ? 'good-job' : 'good-job-o'" />
              <div v-if="item.fabulous > 0" class="number">
                {{ item.fabulous }}
              </div>
            </div>
          </div>
          <div class="comment" @click="showPopup(item.name)">
            {{ item.comment }}
          </div>
          <div class="timeStamp">{{ item.createTime }}</div>
        </div>
      </div>
      <van-divider />
      <div class="reply">
        <div
          v-for="(itemC, indexC) in getChildCommentList(item.objectId)"
          :key="indexC"
        >
          <div v-show="indexC < 1 || !isMore">
            <div class="content">
              <div class="reply-user-log">
                <img src="../assets/img/th.jpg" href="#" />
              </div>
              <div class="msg">
                <div class="msg-top">
                  <div class="title">{{ itemC.name }}</div>
                  <div
                    :class="zanActive(itemC) ? 'zan-active' : 'zan'"
                    @click="addFabulous(itemC)"
                  >
                    <van-icon
                      :name="zanActive(itemC) ? 'good-job' : 'good-job-o'"
                    />
                    <div class="number" v-show="itemC.fabulous > 0">
                      {{ itemC.fabulous }}
                    </div>
                  </div>
                </div>
                <div class="comment" @click="showPopup(itemC.name)">
                  {{ itemC.comment }}
                </div>
                <div class="timeStamp">{{ itemC.createTime }}</div>
              </div>
            </div>
            <van-divider />
          </div>
        </div>
        <div
          class="hideContent"
          v-if="isMore && getChildCommentList(item.objectId).length > 1"
          @click="isMoreEnable()"
        >
          <van-cell
            :title="
              `展开剩余 ${getChildCommentList(item.objectId).length - 1} 评论`
            "
            style="padding:0px"
            icon="arrow-down"
          ></van-cell>
        </div>
        <van-divider
          v-if="isMore && getChildCommentList(item.objectId).length > 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['commentChild', 'comment'],
  data() {
    return {
      reply: '',
      repayName: '',
      popup: false,
      isMore: true,
      fabulousList: [],
      commentList: this.commentChild,
      item: this.comment
    }
  },
  mounted() {
    this.createFabulousList()
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
    // 获取二次回复的评论
    getChildCommentList(obj) {
      var commentChild = this.commentList.filter(item => {
        return item.commentFloorId == obj
      }, obj)
      return this.commentSort(commentChild)
    },
    // 增加点赞数
    addFabulous(item) {
      let arr = this.fabulousList
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].fabulous == false &&
          arr[i].createTime == item.createTime &&
          arr[i].objectId == item.objectId
        ) {
          item.fabulous += 1
          arr[i].fabulous = true
        } else if (
          arr[i].fabulous == true &&
          arr[i].createTime == item.createTime &&
          arr[i].objectId == item.objectId
        ) {
          item.fabulous -= 1
          arr[i].fabulous = false
        }
      }
    },
    // 点赞后更改样式
    zanActive(item) {
      let arr = this.fabulousList
      for (let index = 0; index < arr.length; index++) {
        if (
          arr[index].objectId == item.objectId &&
          arr[index].createTime == item.createTime
        ) {
          return arr[index].fabulous
        }
      }
      return false
    },
    // 创建点赞关键信息列表
    createFabulousList() {
      var arr = []
      var commentList = this.commentList
      let obj = {}
      obj.objectId = this.item.objectId
      obj.fabulous = false
      obj.createTime = this.item.createTime
      arr.push(obj)
      for (let index = 0; index < commentList.length; index++) {
        let obj = {}
        obj.objectId = commentList[index].objectId
        obj.fabulous = false
        obj.createTime = commentList[index].createTime
        arr.push(obj)
      }
      this.fabulousList = arr
    },
    // 提交最新点赞记录
    updateCommentList() {
      axios
        .post('http://127.0.0.1:8080/usr/comment', this.commentList)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取评论列表
    toGetNewCommentList() {
      axios
        .post('http://127.0.0.1:8080/usr/comment')
        .then(data => {
          this.commentList = data
          this.backupCommentList = data
        })
        .catch(error => {
          this.$toast(error)
        })
    },
    //回复
    showPopup(name) {
      this.repayName = `@${name} `
      this.popup = true
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
    color: yellow;
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
      color: #e6e6e6;
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
</style>
