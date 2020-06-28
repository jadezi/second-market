<template>
  <div>
    <van-nav-bar
      title="新增地址"
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
              v-model="list.name"
              label="姓名"
              placeholder="收货人姓名"
            />
          </van-cell-group>
        </div>
        <div class="tel">
          <van-cell-group>
            <van-field
              v-model="list.tel"
              label="电话"
              placeholder="收货人电话"
            />
          </van-cell-group>
        </div>
        <div class="address">
          <van-cell-group>
            <van-field
              v-model="list.address"
              label="收货地点"
              placeholder="收货地点"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="func-bg">
        <van-cell-group>
          <van-switch-cell
            v-model="list.isDefault"
            active-color=""
            title="设为默认收货地址"
          />
        </van-cell-group>
      </div>
      <div class="ok-botton">
        <van-button type="danger" round @click="onSave">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import area from '@/assets/js/address.js'
export default {
  name: 'addressAdd',
  data() {
    return {
      area: area,
      searchResult: [],
      userInfo: {},
      list: {
        name: '',
        tel: '',
        address: '',
        isDefault: false
      }
    }
  },
  methods: {
    async onSave() {
      this.userInfo = this.$store.getters.getUserInfo
      if (!this.userInfo._id) {
        //this.$router.push('/login', { query: { redirect: this.$route.path } })
      }
      if (
        this.list.name == '' ||
        this.list.tel == '' ||
        this.list.address == ''
      ) {
        return this.$toast('请填写地址信息')
      }
      console.log(this.userInfo)
      let { data: re } = await this.$http.post('private/users/address/add', {
        list: this.list,
        id: this.userInfo._id
      })

      if (re.code !== 201) {
        return this.$toast(re.message)
      }
      this.$toast('添加地址成功')
      this.$router.push({path:this.$route.query.redirectTo,query:{redirect: this.$route.query.redirect}})

      // api保存新地址
    },
    onDelete() {},
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
