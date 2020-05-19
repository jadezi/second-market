<template>
  <div class="address-list">
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div v-if="addressList.length != 0">
      <div class="card" v-for="(item, index) in addressList" :key="index">
        <div class="card-left">
          <div class="user">
            <div class="name">{{ item.name }}</div>
            <div class="tel">{{ item.tel }}</div>
            <div class="default" v-if="item.isDefault">
              <van-tag round type="danger">默认</van-tag>
            </div>
          </div>
          <div class="address">{{ item.address }}</div>
        </div>
        <div class="card-right">
          <van-icon name="edit" @click="editAddress(item)" />
        </div>
      </div>
      <div class="add">
        <van-button type="danger" round @click="toAdd">新增取货地址</van-button>
      </div>
    </div>
    <div v-else>
      <van-empty description="无收货地点">
        <van-button
          round
          type="danger"
          class="bottom-button"
          @click="toAddressAdd"
        >
          新增收获地点
        </van-button>
      </van-empty>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addressList',
  components: {},
  props: {},
  data() {
    return {
      addressList: [],
      default: ''
    }
  },
  computed: {},
  watch: {
    addressList: function() {
      this.addressList.forEach(item => {
        if (item._id == this.default && this.default != '') {
          item.isDefault = true
        } else {
          item.isDefault = false
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getAddressList()
  },
  methods: {
    sortList(list) {
      if (list.length == 0 || this.default == '') {
        return list
      }
      let value = {}
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id == this.default) {
          value = list[i]
          list.splice(i, 1)
          console.log(list)
          break
        }
      }
      console.log(value)
      list.unshift(value)
      return list
    },
    toAdd() {
      this.$router.push('/user/address/add')
    },
    async getAddressList() {
      var userInfo = this.$store.getters.getUserInfo
      if (!userInfo._id) {
        this.$router.push({
          path: '/my'
        })
      }
      let { data: re } = await this.$http.get(
        '/private/v1/users/address/list',
        {
          params: {
            id: userInfo._id
          }
        }
      )
      console.log(re)
      if (re.code != 200) {
        return (this.addressList = [])
      }
      this.default = re.data.defaultAddress
      this.addressList = this.sortList(re.data.addresses)
      console.log(this.addressList)
    },
    toAddressAdd() {
      this.$router.push({
        path: '/user/address/add',
        query: {
          redirectTo: this.$route.path
        }
      })
    },
    onClickLeft() {
      this.$router.push('/user/setting')
    },
    editAddress(address) {
      this.$store.commit('setAddress', address)
      this.$router.push({
        path: '/user/address/edit',
        query: { redirectTo: '/user/setting/address' }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.address-list {
  background-color: #f4f5f9;
  min-height: calc(100vh);
  padding-bottom: 55px;
  padding-top: 55px;
}
.card {
  width: 85%;
  display: flex;
  margin: 10px auto;
  background-color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  justify-content: space-between;
  .card-left {
    .user {
      display: flex;
      padding: 8px;
      font-size: 16px;
      align-items: center;
      .default {
        display: flex;
        align-items: center;
      }
      div {
        margin-right: 8px;
      }
    }
    .address {
      padding: 8px;
    }
  }
  .card-right {
    display: flex;
    align-items: center;
  }
}
.van-tag {
  padding: 1px 8px;
}
.add {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  z-index: 2000;
}
</style>
