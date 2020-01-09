<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    {{ $route.params.userId }}
    {{ $route.params.shopId }}
  </div>
</template>

<script>
export default {
  name: "ShopDetail",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.splice("/");
    }
  }
};
</script>

<style scoped></style>
