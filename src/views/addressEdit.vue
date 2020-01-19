<template>
  <div class="addressEdit-bg">
    <van-nav-bar
      title="地址修改"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      <van-address-edit
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResult: []
    };
  },

  methods: {
    onSave() {},
    onDelete() {},
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {}
  }
};
</script>
<style lang="scss" scoped>
.addressEdit-bg {
  background-color: #f7f8fa;
  height: calc(100vh);
}
</style>
