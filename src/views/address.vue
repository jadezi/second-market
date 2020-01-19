<template>
  <div class="addressEdit-bg">
    <div class="user-Info">
      <div class="name">
        <van-cell-group>
          <van-field v-model="name" label="姓名" placeholder="收货人姓名" />
        </van-cell-group>
      </div>
      <div class="tel">
        <van-cell-group>
          <van-field v-model="tel" label="电话" placeholder="收货人电话" />
        </van-cell-group>
      </div>
      <div class="address">
        <van-cell-group>
          <van-field
            v-model="address"
            label="收货地点"
            placeholder="收货地点"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="func-bg">
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          active-color=""
          title="设为默认收货地址"
        />
      </van-cell-group>
    </div>
    <div class="ok-botton">
      <van-button type="danger" round>保存</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      tel: "",
      address: "",
      checked: false
    };
  },
  mounted() {
    
  },
  methods: {
    postAddressInfo() {
      // 保存数据接口
    }
  },
};
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
