<template>
  <div class="orderInfo-bg">
    <van-nav-bar title="订单信息" left-text="返回" left-arrow @click-left="onClickLeft"/>
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
      :price="Number(goods.goodId.summary.saleOfPrice) * 100"
      button-text="付款"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
// import addressEdit from '../user-address/addressEdit.vue'
// import userAddress from '../user-address/addressAdd.vue'
export default {
  data() {
    return {
      chosenAddressId: null,
      chosenContactId: null,
      editingContact: {},
      showList: false,
      id: '',
      item: {}, // 选中的收货地址
      // showEdit: false,
      // isEdit: false,
      // isAdd: false,
      goods: {},
      list: [],
      default: ''
    }
  },
  components: {
    // addressEdit,
    // userAddress
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
    this.id = this.$store.getters.getUserInfo._id
    this.getGoodsByUserId()
    this.getAddressList()
    // console.log(this.currentContact)
  },
  methods: {
    // 地址排序
    sortList(list) {
      if (list.length == 0 || this.default == '') {
        return list
      }
      let value = {}
      for (let j = 0; j < list.length; j++) {
        list[j].id = list[j]._id
        list[j].isDefault = false
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id == this.default) {
          list[i].isDefault = true
          value = list[i]
          list.splice(i, 1)
          break
        }
      }
      list.unshift(value)
      return list
    },
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length }
      this.isEdit = false
      this.isAdd = true
      this.showList = false
      // this.showEdit = true
    },
    async getAddressList() {
      var userInfo = this.$store.getters.getUserInfo
      if (!userInfo._id) {
        this.$router.push({
          path: '/my'
        })
      }
      let { data: re } = await this.$http.get(
        'private/users/address/list',
        {
          params: {
            id: userInfo._id
          }
        }
      )
      console.log(re)
      if (re.code != 200) {
        return (this.list = [])
      }
      this.default = re.data.defaultAddress
      this.list = this.sortList(re.data.addresses)
      console.log(this.list)
    },
    // 编辑联系人
    onEdit(item) {
      console.log(item)
      this.isAdd = false
      this.showList = false
      this.$store.commit('setAddress', item)
      this.$router.push({
        path: '/user/address/edit',
        query: { redirectTo: this.$route.path, redirect: this.$route.query.redirect }
      })
    },

    // 选中联系人
    onSelect(item, index) {
      this.showList = false
      this.chosenContactId = item._id
      // console.log(item)
      this.item = item
      console.log(index)
    },
    closeAdd() {
      this.isAdd = false
      this.isEdit = false
      this.$router.push({
        path: '/user/address/add',
        query: { redirect: this.$route.path }
      })
    },
    async getGoodsByUserId() {
      let { data: re } = await this.$http.get('public/details/get', {
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
    // onSave(info) {
    //   this.showEdit = false
    //   this.showList = false
    //   if (this.isEdit) {
    //     this.list = this.list.map(item => (item.id === info.id ? info : item))
    //   } else {
    //     this.list.push(info)
    //   }
    //   this.chosenContactId = info.id
    // },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false
      this.list = this.list.filter(item => item.id !== info.id)
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null
      }
    },
    onClickLeft() {
      this.$router.push(this.$route.query.redirect)
    },
    async onSubmit() {
      if (this.chosenContactId == null) {
        return this.$toast('请选择收货地点')
      }
      let { data: re } = await this.$http.post('private/deals/add', {
        goodsId: this.goods.goodId._id,
        buyId: this.id,
        saleId: this.goods.goodId.uid._id,
        address: this.item,
        price: this.goods.goodId.summary.saleOfPrice,
        count: 1,
        status: '已付款'
      })
      console.log(re)
      if (re.code !== 201) {
        return this.$toast('订单提交失败')
      }
      this.$toast('提交成功')
      this.$router.push('/')
    }
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
