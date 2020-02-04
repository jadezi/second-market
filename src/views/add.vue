<template>
  <div class="add-body">
    <div class="head">
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        right-text="发布"
        @click-right="release"
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        placeholder="宝贝怎么样"
      />
    </div>
    <div class="upload-image">
      <van-uploader v-model="fileList" multiple :max-count="5" />
    </div>
    <div class="shipAddress">
      <van-button
        @click="showMore"
        round
        size="small"
        :text="city"
      ></van-button>
    </div>
    <div class="tag">
      <van-cell
        title="价格"
        is-link
        value="开个价"
        icon="gold-coin-o"
        @click="showPrice"
      />
      <van-cell title="更多信息" is-link value="更多信息" icon="more-o" />
    </div>
    <van-action-sheet v-model="priceAction" title="标题" :round="false">
      <div>
        <van-cell-group>
          <div class="price-now">
            <van-field
              v-model="priceNow"
              required
              clearable
              label="出手价格"
              right-icon="question-o"
              @focus="onFocus(0)"
              readonly
              placeholder="￥0.00"
            />
          </div>
          <div class="price-ago">
            <van-field
              v-model="priceAgo"
              label="入手价格"
              placeholder="￥0.00"
              @focus="onFocus(1)"
              required
            />
          </div>
        </van-cell-group>
      </div>
      <div class="word-n">
        <van-number-keyboard
          :show="true"
          theme="custom"
          extra-key="."
          @input="getInput"
          @delete="onDelete"
          @close="onClose"
          close-button-text="完成"
        />
        <van-number-keyboard safe-area-inset-bottom />
      </div>
    </van-action-sheet>
    <van-popup v-model="cityShow" position="bottom">
      <van-area
        :area-list="areaList"
        value="330212"
        @cancel="showMore"
        @confirm="getAddress"
      />
    </van-popup>
  </div>
</template>
<script>
import area from "../assets/js/address.js";
export default {
  name: "add",
  data() {
    return {
      inputNum: "",
      priceAgo: "",
      priceNow: "",
      freight: "",
      priceInputDistinguish: false,
      priceAction: false,
      checkRadio: "0",
      city: "宁波鄞州区",
      message: "",
      cityShow: false,
      fileList: [],
      areaList: area,
      shopList: {
        buyPrice: "",
        salePrice: "",
        timeStamp: "",
        uploadFile: "",
        description: "",
        original: "",
        more: ""
      }
    };
  },
  methods: {
    showMore() {
      this.cityShow = !this.cityShow;
    },
    getAddress(e) {
      this.city = `发货地：${e[1].name}${e[2].name}`;
      this.cityShow = !this.cityShow;
    },
    showPrice() {
      this.priceAction = !this.priceAction;
    },
    hidePriceAction() {
      this.priceAction = false;
    },
    onClickLeft() {
      this.$router.replace("/");
    },
    getInput(key) {
      var input = "";
      var isZero = /^￥0+/;
      input = this.priceInputDistinguish ? this.priceAgo : this.priceNow;
      if (input.indexOf("￥") == -1) {
        input += "￥";
      }
      input += key;
      if (
        input.indexOf(".") !== input.lastIndexOf(".") ||
        (input.indexOf(".") != -1 && input.length - input.indexOf(".") > 3) ||
        isZero.test(input)
      ) {
        input = input.substring(0, input.length - 1);
      }
      if (this.priceInputDistinguish) {
        this.priceAgo = input;
      } else {
        this.priceNow = input;
      }
    },
    onDelete() {
      var input = "";
      input = this.priceInputDistinguish ? this.priceAgo : this.priceNow;
      input = input.substring(0, input.length - 1);
      if (input.indexOf("￥") != -1 && input.length == 1) {
        input = "";
      }
      if (this.priceInputDistinguish) {
        this.priceAgo = input;
      } else {
        this.priceNow = input;
      }
    },
    onFocus(key) {
      key === 1
        ? (this.priceInputDistinguish = true)
        : (this.priceInputDistinguish = false);
    },
    onClose() {
      var timestamp = Date.parse(new Date());
      this.shopList.buyPrice = this.priceAgo;
      this.shopList.salePrice = this.priceNow;
      this.shopList.uploadFile = this.fileList;
      this.shopList.timeStamp = timestamp;
      this.priceAction = false;
      console.log(this.shopList);
    },
    release() {
      console.log(this.fileList);
    }
  }
};
</script>
<style scoped>
.upload-image,
.content,
.shipAddress {
  padding: 4px 15px;
}
.word-n {
  height: 216px;
}
.freight {
  display: flex;
}
.freight .van-field {
  width: 40%;
}
.van-radio-group {
  width: 55%;
  display: flex;
  justify-content: space-between;
}
</style>
