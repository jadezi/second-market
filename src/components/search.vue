<template>
  <div class="header">
    <div class="web-icon">
      <slot name="left"></slot>
    </div>
    <div class="search-input">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
        shape="round"
        clearable
        @focus="toSearchDetail"
      ></van-search>
    </div>
    <div class="qrcode"><van-icon name="scan" @click="scan" /></div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      value: '手机'
    }
  },
  methods: {
    toSearchDetail() {
      //this.$router.replace("/search");
      this.$emit('openSearch')
    },
    scan() {
      this.$router.push('/scan')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
}
.search-input {
  flex: 1;
}
.header {
  display: flex;
  align-items: center;
}
.web-icon,
.qrcode {
  width: 60px;
  text-align: center;
  background-color: #fff;
  height: 54px;
  line-height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-icon-scan {
  font-size: 30px;
}
</style>
