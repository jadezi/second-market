<template>
  <div>
    <div class="notfound" v-if="!access">
      <div class="img">
        <img width="80%" src="../../assets/img/4042.gif" />
      </div>
      <div class="action">
        <p class="oops">OOPS!</p>
        <p class="text">糟糕！ {{ error }}</p>
        <van-button round type="info" to="/">返回首页</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      access: false,
      error: '页面丢了'
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
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
      background-color: #ff0000;
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
