<template>
  <div>
    <div class="header">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="searchVoc"
        shape="round"
        show-action
        @cancel="OnCancel"
      >
        <div slot="label">
          <van-dropdown-menu>
            <van-dropdown-item v-model="selected" :options="searchOption" title-class="search-item"/>
          </van-dropdown-menu>
        </div>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-content",
  data() {
    return {
      searchVoc: "123",
      selected: 0,
      searchOption: [
        { text: "宝贝", value: 0 },
        { text: "用户", value: 1 }
      ]
    };
  },
  methods: {
    OnCancel() {
      this.$emit("closeSearch");
    }
  }
};
</script>
<style scoped>
.van-cell__title span {
  padding-left: 16px;
}
.search-item {
  padding-left: 16px;
}
</style>
