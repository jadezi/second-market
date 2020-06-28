<template>
  <div>
    <div class="empty" v-if="!deals">
      <van-empty description="无订单信息" />
    </div>
    <div class="shop" v-else>
      <div class="head">
        <img :src="deals.saleId.avatar" width="30px" height="30px" />
        <div class="name">{{ deals.saleId.setting.name }} ></div>
      </div>
      <van-divider />
      <div class="content">
        <van-card
          :num="deals.count"
          :price="deals.goodsId.summary.saleOfPrice"
          :desc="deals.goodsId.summary.desc"
          :title="deals.goodsId.summary.desc"
          :origin-price="deals.goodsId.summary.buyOfPrice"
          :thumb="deals.goodsId.summary.cover"
        />
      </div>
      <van-divider />
      <div class="action" v-if="deals.status == '交易成功'">
        <van-button type="default">评价</van-button>
        <van-button type="danger">删除</van-button>
      </div>
      <div class="action" v-else-if="deals.status == '交易完成'">
        <van-button type="default">评价</van-button>
        <van-button type="danger">删除</van-button>
      </div>
      <div class="action" v-else-if="deals.status == '已卖出'">
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger">删除商品</van-button>
      </div>
      <div
        class="action"
        v-else-if="(deals.status == '已付款' && selectTabItem == '收货待确认')"
      >
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger" @click="receipt(deals._id)">
          显示收货二维码
        </van-button>
      </div>
      <div class="action" v-else-if="deals.status == '已付款'">
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger">确认收货</van-button>
      </div>
      <div class="action" v-else-if="deals.status == '售卖中'">
        <!-- <van-button type="default">评价</van-button> -->
        <van-button type="danger">取消售卖</van-button>
      </div>
    </div>
    <!--  弹出框 -->
    <van-popup v-model="qrcode">
      <div class="qrcode">
        <div class="loading" v-if="load">
          <van-loading color="#1989fa" />
        </div>
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'dealList',
  components: {},
  props: ['selectTabItem', 'deals'],
  data() {
    return {
      qrcode: false,
      load: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    creatQrCode(dealId) {
      this.$nextTick(() => {
        new QRCode(this.$refs.qrCodeUrl, {
          text: `es:/receipt/${dealId}`,
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      })
      this.load = false
    },
    receipt(dealId) {
      this.qrcode = true
      this.creatQrCode(dealId)
    }
  }
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
      margin-right: 10px;
    }
  }
}
.qrcode {
  width: 200px;
  height: 200px;
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
