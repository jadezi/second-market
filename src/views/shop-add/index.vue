<template>
  <div class="add-body">
    <div class="head">
      <van-nav-bar
        :title="addTitle"
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
        placeholder="怎么样……"
      />
    </div>
    <div class="upload-image">
      <van-uploader v-model="fileList" multiple :max-count="9" />
    </div>
    <div class="shipAddress">
      <van-button
        @click="showMore"
        round
        size="small"
        :text="city"
      ></van-button>
    </div>
    <div class="tag" v-if="type == 'goods'">
      <van-cell
        title="价格"
        is-link
        value="开个价"
        icon="gold-coin-o"
        @click="showPrice"
      />
      <van-cell
        title="商品分类"
        @click="shopGroup"
        is-link
        :value="shoptitle"
        icon="more-o"
      />
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
              clearable
              placeholder="￥0.00"
              @focus="onFocus(1)"
              readonly
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
    <van-popup v-model="shoptitleShow" position="bottom">
      <van-area
        :area-list="titleList"
        value="330211"
        @cancel="showMore"
        @confirm="getShopTitle"
        :columns-num="1"
      />
    </van-popup>
  </div>
</template>
<script>
import area from '@/assets/js/address.js'
export default {
  name: 'add',
  data() {
    return {
      id: '',
      type: '',
      url: '',
      inputNum: '',
      priceAgo: '',
      priceNow: '',
      addTitle: '标题',
      freight: '',
      priceInputDistinguish: false,
      priceAction: false,
      checkRadio: '0',
      city: '宁波鄞州区',
      message: '',
      cityShow: false,
      fileList: [],
      shoptitle: '请选择商品分类',
      shoptitleShow: false,
      titleList: {
        province_list: {
          110000: '书籍',
          120000: '数码',
          130000: '考研资料',
          140000: '教资资料',
          150000: '等级考试'
        }
      },
      areaList: area,
      shopList: {
        buyPrice: '',
        salePrice: '',
        timeStamp: '',
        description: '',
        original: '',
        more: ''
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    if (this.type == 'goods') {
      this.addTitle = '商品发布'
      this.url = 'private/goods/add'
    } else {
      this.addTitle = '用户动态发布'
      this.url = 'private/dynamic/add'
    }
    this.id = this.$store.getters.getUserInfo._id
  },
  methods: {
    showMore() {
      this.cityShow = !this.cityShow
    },
    showShopTitle() {
      this.shoptitleShow = true
    },
    getAddress(e) {
      this.city = `城市：${e[1].name}${e[2].name}`
      this.cityShow = !this.cityShow
    },
    showPrice() {
      this.priceAction = !this.priceAction
    },
    hidePriceAction() {
      this.priceAction = false
    },
    onClickLeft() {
      this.$router.replace('/')
    },
    getInput(key) {
      var input = ''
      var isZero = /^￥0+/
      input = this.priceInputDistinguish ? this.priceAgo : this.priceNow
      if (input.indexOf('￥') == -1) {
        input += '￥'
      }
      input += key
      if (
        input.indexOf('.') !== input.lastIndexOf('.') ||
        (input.indexOf('.') != -1 && input.length - input.indexOf('.') > 3) ||
        isZero.test(input)
      ) {
        input = input.substring(0, input.length - 1)
      }
      if (this.priceInputDistinguish) {
        this.priceAgo = input
      } else {
        this.priceNow = input
      }
    },
    onDelete() {
      var input = ''
      input = this.priceInputDistinguish ? this.priceAgo : this.priceNow
      input = input.substring(0, input.length - 1)
      if (input.indexOf('￥') != -1 && input.length == 1) {
        input = ''
      }
      if (this.priceInputDistinguish) {
        this.priceAgo = input
      } else {
        this.priceNow = input
      }
    },
    shopGroup() {
      this.shoptitleShow = !this.shoptitleShow
    },
    getShopTitle(e) {
      console.log(e)
      this.shoptitle = e[0].name
      // console.log(this.shoptitle)
      this.shoptitleShow = false
    },
    onFocus(key) {
      key === 1
        ? (this.priceInputDistinguish = true)
        : (this.priceInputDistinguish = false)
    },
    onClose() {
      var timestamp = Date.parse(new Date())
      this.shopList.buyPrice = this.priceAgo.substring(1, this.priceAgo.length)
      this.shopList.salePrice = this.priceNow.substring(1, this.priceNow.length)
      this.shopList.uploadFile = this.fileList
      this.shopList.timeStamp = timestamp
      this.priceAction = false
      console.log(this.shopList)
    },
    async release() {
      console.log(this.id)
      let query
      if (this.type != 'goods') {
        query = {
          author: this.id,
          imggroup: this.fileList,
          text: this.message,
          time: Date.now()
        }
      } else {
        if (this.message == '') {
          return this.$toast('请输入描述信息')
        }
        if (!this.priceAgo || !this.priceNow) {
          return this.$toast('请输入价格')
        }
        if (this.fileList.length == 0) {
          return this.$toast('请上传图片')
        }
        if (this.shoptitle == '请选择商品分类') {
          return this.$toast('请选择商品分类')
        }
        this.shopList.buyPrice = this.priceAgo.substring(
          1,
          this.priceAgo.length
        )
        this.shopList.salePrice = this.priceNow.substring(
          1,
          this.priceNow.length
        )
        console.log(this.shopList)
        query = {
          author: this.id,
          imggroup: this.fileList,
          text: this.message,
          shop: this.shopList,
          time: Date.now(),
          title: this.shoptitle
        }
      }
      let { data: re } = await this.$http.post(this.url, query)
      console.log(re)
      if (re.code !== 201) {
        return this.$toast(re.message)
      }
      this.$toast(re.message)
      this.onClickLeft()
    }
  }
}
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
