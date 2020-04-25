<template>
  <div class="orderInfo-bg">
    <van-nav-bar title="订单信息" left-text="返回" left-arrow />
    <div class="vheight"></div>
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />
    <!-- 联系人列表 -->
    <div>
      <van-popup v-model="showList" position="bottom">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
      </van-popup>
    </div>
    <div class="vheight"></div>
    <div class="shopCard" v-if="goods != null">
      <van-card
        num="1"
        tag=""
        :price="goods.goodId.summary.saleOfPrice"
        :desc="goods.content"
        :title="goods.content"
        :thumb="goods.imageGroup[0]"
        :origin-price="goods.goodId.summary.buyOfPrice"
      />
    </div>
    <div class="shopDetail">
      <van-panel title="送货时间">
        <div>内容</div>
      </van-panel>
    </div>
    <van-submit-bar
      v-if="goods != null"
      :price="Number(goods.goodId.summary.saleOfPrice)*100"
      button-text="付款"
      @submit="onSubmit"
    />

    <div class="address" v-if="isEdit">
      <address-edit @closeAdd="closeAdd"></address-edit>
    </div>
    <div class="address" v-if="isAdd">
      <user-address @closeAdd="closeAdd"></user-address>
    </div>
    
  </div>
</template>
<script>
import addressEdit from '../user-address/addressEdit.vue'
import userAddress from '../user-address/address.vue'
export default {
  data() {
    return {
      chosenAddressId: null,
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      isAdd: false,
      goods: {},
      list: [
        {
          id: 0,
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: 1,
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },
  components: {
    addressEdit,
    userAddress
  },
  computed: {
    cardType() {
      return this.chosenAddressId !== null ? 'edit' : 'add'
    },
    currentContact() {
      const id = this.chosenContactId
      console.log(this.chosenContactId)
      return id !== null ? this.list.filter(item => item.id === id)[0] : {}
      // console.log( id !== null ? this.list.filter(item => item.id === id)[0] : {})
    }
  },
  mounted() {
    this.getGoodsByUserId()
    // console.log(this.currentContact)
  },
  methods: {
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length }
      this.isEdit = false
      this.isAdd = true
      this.showList = false
      // this.showEdit = true
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true
      // this.showEdit = true
      this.isAdd = false
      this.showList = false
      this.editingContact = item
    },

    // 选中联系人
    onSelect(item) {
      this.showList = false
      this.chosenContactId = item.id
    },
    closeAdd() {
      this.isAdd = false
      this.isEdit = false
    },
    async getGoodsByUserId() {
      let { data: re } = await this.$http.get('public/v1/details/get', {
        params: {
          id: this.$route.params.shopId
        }
      })
      console.log(re)
      if (re.code !== 200) {
        return this.$toast(re.message)
      }
      this.goods = re.data
      console.log(this.goods)
    },
    // 保存联系人
    onSave(info) {
      this.showEdit = false
      this.showList = false
      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item))
      } else {
        this.list.push(info)
      }
      this.chosenContactId = info.id
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false
      this.list = this.list.filter(item => item.id !== info.id)
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null
      }
    },
    onSubmit() {}
  }
}
</script>
<style scoped lang="scss">
.orderInfo-bg {
  background-color: #f7f8fa;
  height: calc(100vh);
  .vheight {
    height: 10px;
    width: 100%;
  }
  .van-card {
    background-color: white;
  }
  .shopDetail {
    .van-cell__title span {
      padding-left: 0px;
    }
    .van-panel__content {
      padding: 16px;
    }
  }
  .van-submit-bar__bar .van-button--danger {
    width: 80px;
    height: 40px;
  }
}
.van-address-list__add {
  width: 100%;
}
.address {
  background-color: #fff;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 101;
}
</style>
