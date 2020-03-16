<template>
  <div class="demo2">
    <a :href="item.href">
      <div class="border">
        <div class="img">
          <van-image width="100%" lazy-load :src="item.src" />
        </div>
        <div class="desc">{{ item.desc }}</div>
        <div class="price">￥ {{ item.price }}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'showblock',
  props: ['item'],
  data() {
    return {}
  }
}
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
