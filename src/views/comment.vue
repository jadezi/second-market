<template>
  <div class="comment-border">
    <div class="header">全部留言{{ totalNumber }}</div>
    <div v-for="(item, index) in getCommentList" :key="index">
      <div class="content">
        <div class="user-log">
          <img src="../assets/th.jpg" href="#" />
        </div>
        <div class="msg">
          <div class="msg-top">
            <div class="title">{{ item.name }}</div>
            <div
              :class="zanActive(item) ? 'zan-active' : 'zan'"
              @click="addFabulous(item)"
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
          <div v-show="indexC < 2 || !isMore">
            <div class="content">
              <div class="user-log">
                <img src="../assets/th.jpg" href="#" />
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
        <div class="hideContent" v-show="isMore = moreStatus(item, index)" @click="isMoreEnable(item)">
          <van-cell title="展开更多" style="padding:0px" icon="arrow-down"></van-cell>
        </div>
        <van-divider v-show="isMore" />
      </div>
    </div>
    <div v-if="commentList.length == 0" class="noreply">
      <div>
        <img src="" />
      </div>
      <div>
        <van-button size="small" type="warning">警告按钮</van-button>
      </div>
    </div>
    <van-popup v-model="popup" position="bottom">
      <van-cell-group id="keyboard">
        <van-field v-model="reply" center clearable :placeholder="repayName">
          <van-button slot="button" size="small" type="primary"
            >回复</van-button
          >
        </van-field>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      reply: "",
      repayName: "",
      popup: false,
      isMore: false,
      moreDom: [],
      fabulousList: [],
      backupCommentList: [],
      commentList: [
        {
          articleId: "",
          objectId: "123",
          commentFloorId: "",
          name: "1",
          replyId: "",
          comment: "第一层",
          fabulous: 2,
          createTime: 1
        },
        {
          articleId: "",
          objectId: "234",
          commentFloorId: "123",
          replyId: "123",
          name: "2",
          comment:
            "123层回复1232313123124123122131232123层回复1232313123124123122131232123层回复1232313123124123122131232",
          fabulous: 3,
          createTime: 2
        },
        {
          articleId: "",
          commentFloorId: "123",
          objectId: "345",
          replyId: "234",
          comment: "123层回复234",
          name: "3",
          fabulous: 4,
          createTime: 4
        },
        {
          articleId: "",
          commentFloorId: "567",
          objectId: "456",
          replyId: "567",
          comment: "567层回复567",
          name: "4",
          fabulous: 5,
          createTime: 3
        },
        {
          articleId: "",
          commentFloorId: "",
          objectId: "567",
          name: "5",
          replyId: "",
          comment: "567",
          fabulous: 2,
          createTime: 2
        },
        {
          articleId: "",
          commentFloorId: "123",
          objectId: "000",
          replyId: "123",
          name: "6",
          comment: "123层回复234",
          fabulous: 3,
          createTime: 5
        },
        {
          articleId: "",
          commentFloorId: "567",
          objectId: "789",
          replyId: "456",
          comment: "567层回复456",
          name: "7",
          fabulous: 4,
          createTime: 1
        },
        {
          articleId: "",
          commentFloorId: "123",
          objectId: "900",
          replyId: "234",
          comment: "123层回复234",
          name: "8",
          fabulous: 5,
          createTime: 2
        }
      ]
    };
  },
  mounted() {
    this.createFabulousList();
  },
  computed: {
    totalNumber() {
      if (this.commentList.length == 0) {
        return "";
      }
      return ` · ${this.commentList.length}`;
    },
    getCommentList() {
      var comment = this.commentList.filter(item => {
        return item.commentFloorId == "";
      });
      console.log(this.commentSort(comment));
      return this.commentSort(comment);
    }
  },
  methods: {
    // 评论按照日期排序
    commentSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let index = 0; index < arr.length; index++) {
          if (arr[i].createTime < arr[index].createTime) {
            let tmp = arr[i];
            arr[i] = arr[index];
            arr[index] = tmp;
          }
        }
      }
      return arr;
    },
    // 获取直接回复文章的评论
    getChildCommentList(obj) {
      var commentChild = this.commentList.filter(item => {
        return item.commentFloorId == obj;
      }, obj);
      return this.commentSort(commentChild);
    },
    // 点赞功能
    addFabulous(item) {
      let arr = this.fabulousList;
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].fabulous == false &&
          arr[i].createTime == item.createTime &&
          arr[i].objectId == item.objectId
        ) {
          item.fabulous += 1;
          arr[i].fabulous = true;
        } else if (
          arr[i].fabulous == true &&
          arr[i].createTime == item.createTime &&
          arr[i].objectId == item.objectId
        ) {
          item.fabulous -= 1;
          arr[i].fabulous = false;
        }
      }
    },
    // 点赞后更改样式
    zanActive(item) {
      let arr = this.fabulousList;
      for (let index = 0; index < arr.length; index++) {
        if (
          arr[index].objectId == item.objectId &&
          arr[index].createTime == item.createTime
        ) {
          return arr[index].fabulous;
        }
      }
      return false;
    },
    // 创建点赞关键信息列表
    createFabulousList() {
      var arr = [];
      var commentList = this.commentList;
      for (let index = 0; index < commentList.length; index++) {
        let obj = {};
        obj.objectId = commentList[index].objectId;
        obj.fabulous = false;
        obj.createTime = commentList[index].createTime;
        arr.push(obj);
      }
      this.createMoreDom();
      this.fabulousList = arr;
    },
    createMoreDom() {
      var arr = [];
      var moreList = this.getCommentList;
      for (let index = 0; index < moreList.length; index++) {
        let obj = {};
        obj.commentFloorId = moreList[index].objectId;
        obj.hideMore = false;
        arr.push(obj);
      }
      Array.prototype.isMore = false;
      console.log(arr);
      this.moreDom = arr;
    },
    // 提交最新点赞记录
    updateCommentList() {
      axios
        .post("http://127.0.0.1:8080/usr/comment", this.commentList)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取评论列表
    toGetNewCommentList() {
      axios
        .post("http://127.0.0.1:8080/usr/comment")
        .then(data => {
          this.commentList = data;
          this.backupCommentList = data;
        })
        .catch(error => {
          this.$toast(error);
        });
    },
    //回复
    showPopup(name) {
      this.repayName = `@${name} `;
      this.popup = true;
    },
    isMoreEnable(item) {
      for (let index = 0; index < this.moreDom.length; index++) {
        if (item.commentFloorId == this.moreDom[index].commentFloorId) {
          this.moreDom[index].hideMore = true;
        }
      }
    },
    moreStatus(item, index) {
      if (this.moreDom[index].commentFloorId == item.commentFloorId||!this.moreDom[index].hideMore) {
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-border {
  padding: 4px 15px 55px;
}
.header {
  margin: 6px 0px;
}
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
  .user-log img {
    width: 40px;
    height: 40px;
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
