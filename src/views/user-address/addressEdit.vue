<template>
  <div>
    <van-nav-bar
      title="地址修改"
      left-text="返回"
      left-arrow
      z-index="200"
      @click-left="onClickLeft"
    />
    <div class="addressEdit-bg">
      <div class="user-Info">
        <div class="name">
          <van-cell-group>
            <van-field
              v-model="addresses.name"
              label="姓名"
              placeholder="收货人姓名"
            />
          </van-cell-group>
        </div>
        <div class="tel">
          <van-cell-group>
            <van-field
              v-model="addresses.tel"
              label="电话"
              placeholder="收货人电话"
            />
          </van-cell-group>
        </div>
        <div class="address">
          <van-cell-group>
            <van-field
              v-model="addresses.address"
              label="收货地点"
              placeholder="收货地点"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="func-bg">
        <van-cell-group>
          <van-switch-cell
            v-model="addresses.isDefault"
            title="设为默认收货地址"
          />
        </van-cell-group>
      </div>
      <div class="ok-botton">
        <van-button type="danger" :disabled="disabled" round @click="save">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addressEdit',
  data() {
    return {
      switch: false,
      disabled: true,
      addresses: {
        name: '',
        tel: '',
        address: '',
        isDefault: false,
        _id: ''
      },
      backup: {}
    }
  },
  watch: {
    addresses: {
      deep: true,
      handler: function(newValue) {
        if (
          newValue.name != this.backup.name ||
          newValue.tel != this.backup.tel ||
          newValue.address != this.backup.address ||
          newValue.isDefault != this.backup.isDefault
        ) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    }
  },
  mounted() {
    this.addresses.name = this.$store.state.userInfo.address.name
    this.addresses.tel = this.$store.state.userInfo.address.tel
    this.addresses.address = this.$store.state.userInfo.address.address
    this.addresses.isDefault = this.$store.state.userInfo.address.isDefault
    this.addresses._id = this.$store.state.userInfo.address._id
    // this.backup = this.addresses
    this.backup = Object.assign({}, this.addresses)
  },
  methods: {
    async save() {
      // 保存数据接口
      if (
        this.addresses.name == '' ||
        this.addresses.tel == '' ||
        this.addresses.address == ''
      ) {
        return this.$toast('请输入信息')
      }
      let { data: re } = await this.$http.post(
        'private/users/address/edit',
        {
          uid: this.$store.getters.getUserInfo._id,
          list: this.addresses
        }
      )
      if (re.code !== 201) {
        return this.$toast(re.message)
      }
      this.$toast(re.message)
      this.$router.push({path:this.$route.query.redirectTo,query:{redirect: this.$route.query.redirect}})
    },
    onClickLeft() {
      this.$router.push({path:this.$route.query.redirectTo,query:{redirect: this.$route.query.redirect}})
    }
  }
}
</script>
<style lang="scss" scoped>
.addressEdit-bg {
  padding: 12px;
  background-color: #f7f8fa;
  height: calc(100vh);
  .user-Info,
  .func-bg {
    border-radius: 8px;
    overflow: hidden;
  }
  .func-bg {
    margin-top: 12px;
  }
  .ok-botton {
    padding: 32px 4px;
    button {
      width: 100%;
    }
  }
}
</style>
