<template>
  <div class="comment-border">
    <div class="header">全部留言{{ totalNumber }}</div>
    <div v-for="(item, index) in getCommentList" :key="index">
      <cmt
        v-show="index < 2 || !isMore"
        :commentChild="getChildCommentList(item.objectId)"
        :comment="item"
        ref="child"
      ></cmt>
    </div>
    <div
      v-show="isMore && getCommentList.length > 1"
      class="hideContent"
      @click="isMoreBtn"
    >
      <van-cell
        title="展开更多评论"
        style="padding:0px;width:164px;margin:0 auto;"
        icon="arrow-down"
      ></van-cell>
    </div>
    <van-divider v-if="isMore && getCommentList.length > 1" />
    <div v-if="getCommentList.length == 0" class="noreply">
      <div>
        <img src />
      </div>
      <div style="margin:0 auto;width:60px;">
        <van-button size="small" type="warning" @click="showPopup">留言</van-button>
      </div>
    </div>
     <van-popup v-model="popup" position="bottom">
      <van-cell-group id="keyboard">
        <van-field v-model="reply" center clearable placeholder="请输入">
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
import cmt from "@/views/cmt.vue";
export default {
  data() {
    return {
      reply: "",
      popup: false,
      isMore: true,
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
  components: {
    cmt
  },
  mounted() {
    this.hideChild();
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
      comment.forEach(item => {
        item.isMore = true;
      });
      return this.commentSort(comment);
    }
  },
  methods: {
    getChildCommentList(obj) {
      var commentChild = this.commentList.filter(item => {
        return item.commentFloorId == obj;
      }, obj);
      return this.commentSort(commentChild);
    },
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
    showPopup() {
      this.popup = true;
    },
    isMoreBtn() {
      this.isMore = false;
    },
    hideChild() {
      this.$refs.child[1].isMoreEnable();
      return true;
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

.number {
  padding: 0 2px 0;
  font-size: 14px;
}
.reply {
  margin-top: 15px;
  margin-left: 45px;
}
</style>
