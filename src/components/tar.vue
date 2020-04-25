<template>
  <div>
    <van-tabbar route :safe-area-inset-bottom="true" active-color="#ee0a24">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/bbs" icon="like-o">社区</van-tabbar-item>
      <van-tabbar-item icon="plus" @click="showAdd">发布</van-tabbar-item>
      <van-tabbar-item to="/user/message" icon="smile-comment-o">
        信息
      </van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我</van-tabbar-item>
    </van-tabbar>

    <transition name="van-slide-up">
      <div class="add" v-show="isAdd">
        <div class="action">
          <div class="dynamic" @click="toAdd('dynamic')">
            <img src="../assets/img/push.png" />
          </div>
          <div class="addgoods" @click="toAdd('goods')">
            <img src="../assets/img/shopadd.png" />
          </div>
        </div>
        <div class="close">
          <van-icon @click="closeAdd" name="cross" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'tar',
  data() {
    return {
      isAdd: false
    }
  },
  methods: {
    showAdd() {
      this.isAdd = true
      console.log('显示ok')
    },
    closeAdd() {
      this.isAdd = false
    },
    toAdd(type) {
      this.$router.push({
        path: 'user/add',
        query: {
          type: type
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add {
  display: flex;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  height: calc(100vh);
  width: 100%;
  z-index: 999;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 50px;
  .action {
    width: 100%;
    display: flex;
    justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .close {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 40px;
    padding-top: 40px;
  }
}
</style>
