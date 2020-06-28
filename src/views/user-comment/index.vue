<template>
  <div class="comment-border">
    <div class="header">全部留言{{ totalNumber }}</div>
    <div v-for="(item, index) in getCommentList" :key="index">
      <cmt
        v-show="index < 2 || !isMore"
        :commentChild="getChildCommentList(item._id)"
        :comment="item"
        ref="child"
        :goodId="goodId"
        :identity="identity"
        @getComment="toGetNewCommentList()"
      ></cmt>
    </div>
    <div
      v-show="isMore && getCommentList.length > 2"
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
        <img src="../../assets/img/noreply.png" />
      </div>
      <div>
        <van-button size="small" type="warning" @click="showPopup">
          留言
        </van-button>
      </div>
    </div>
    <van-popup v-model="popup" position="bottom">
      <van-cell-group id="keyboard">
        <van-field v-model="replyText" center clearable placeholder="请输入">
          <van-button slot="button" size="small" type="primary" @click="save">
            回复
          </van-button>
        </van-field>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import cmt from './components/cmt.vue'
export default {
  data() {
    return {
      id: '',
      replyText: '',
      popup: false,
      isMore: true,
      fabulousList: [],
      backupCommentList: [],
      commentList: []
    }
  },
  props: ['goodId', 'identity'],
  components: {
    cmt
  },
  mounted() {
    this.id = this.$store.getters.getUserInfo._id
    this.hideChild()
    this.toGetNewCommentList()
  },
  computed: {
    totalNumber() {
      if (this.commentList.length == 0) {
        return ''
      }
      return ` · ${this.commentList.length}`
    },
    getCommentList() {
      var comment = this.commentList.filter(item => {
        return item.commentFloorId == ''
      })
      comment.forEach(item => {
        item.isMore = true
      })
      return this.commentSort(comment)
    }
  },
  methods: {
    getChildCommentList(uid) {
      var commentChild = this.commentList.filter(item => {
        return item.commentFloorId == uid
      }, uid)
      return this.commentSort(commentChild)
    },
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
    // 获取评论列表
    async toGetNewCommentList() {
      let { data: re } = await this.$http.get('public/comment/all', {
        params: {
          did: this.$route.params.id
        }
      })
      if (re.code !== 200) {
        this.commentList = []
        return
      }
      this.commentList = re.data.content
    },
    //回复
    showPopup() {
      this.popup = true
    },
    isMoreBtn() {
      this.isMore = false
    },
    hideChild() {
      //this.$refs.child[1].isMoreEnable()
    },
    async save() {
      if (!this.id) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      } else {
        let { data: re } = await this.$http.post('private/comment/add', {
          did: this.$route.params.id,
          content: {
            uid: this.id,
            replyId: this.goodId.uid._id,
            comment: this.replyText,
            commentFloorId: ''
          }
        })
        if (re.code !== 201) {
          return this.$toast(re.message)
        }
        this.toGetNewCommentList()
      }
    }
  }
}
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
.noreply {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
</style>
