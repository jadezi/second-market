<template>
  <div>
    <div class="shop">
      <div class="head">
        <img src="../assets/img/logo.png" width="30px" height="30px" />
        <div class="name">wange ></div>
      </div>
      <van-divider />
      <div class="content">
        <van-card
          num="1"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          origin-price="10.00"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </div>
      <van-divider />
      <div class="action" v-if="selectTabItem == '全部订单'">
        <van-button type="default">评价</van-button>
        <van-button type="danger">删除</van-button>
      </div>
      <div class="action" v-else-if="selectTabItem == '已购买'">
        <van-button type="default">评价</van-button>
        <!-- <van-button type="danger">删除</van-button> -->
      </div>
      <div class="action"  v-else-if="selectTabItem == '已卖出'">
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger">删除商品</van-button>
      </div>
      <div class="action"  v-else-if="selectTabItem == '售卖中'">
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger">取消售卖</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dealList',
  components: {},
  props: ['selectTabItem'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.van-card {
  background-color: #fff;
}
.shop {
  background-color: #fff;
  padding: 4px 8px;
  margin-top: 15px;
  .head {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    .name {
      margin-left: 10px;
    }
  }
  .action {
    display: flex;
    justify-content: flex-end;
    button {
      margin-right:10px;
    }
  }
}
</style>
