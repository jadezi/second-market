<template>
  <div class="demo2">
    <div v-if="index == 0" class="border" style="margin-top:0px">
      <div class="img">
        <van-image width="100%" lazy-load :src="item.img" />
      </div>
      <div class="desc">{{ item.desc }}</div>
      <div class="price">￥ {{ item.price }}</div>
    </div>
    <div v-else class="border">
      <div class="img">
        <van-image width="100%" lazy-load :src="item.img" />
      </div>
      <div class="desc">{{ item.desc }}</div>
      <div class="price">￥ {{ item.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showblock",
  props: ["item", "index"],
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.border {
  overflow: hidden;
  border-radius: 7px;
  margin-top: 8px;
  background-color: white;
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  .img2 {
    width: 100%;
  }
  .price {
    color: red;
    padding: 8px;
  }
  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 8px 8px 0 8px;
  }
}
</style>
