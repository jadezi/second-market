<template>
  <div>
    <div class="bg">
      <search @openSearch="showSearch">
        <div slot="left">测试</div>
      </search>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div slot="loosing" scoped-slot="{distance: 10}">
          释放刷新
        </div>
        <div class="content">
          <div class="classify">
            <div class="half">
              <div class="fen fen-top-left"></div>
              <div class="fen fen-bottom-left"></div>
            </div>
            <div class="half">
              <div class="fen fen-top-right">3</div>
              <div class="fen fen-bottom-right">4</div>
            </div>
          </div>
        </div>
        <van-tabs background="#f2f2f2f2" swipeable>
          <van-tab v-for="index in shopItem" :key="index" :title="index">
            <div class="tab-pannel">
              <van-grid :gutter="10" :column-num="2">
                <van-grid-item
                  v-for="value in 8"
                  :key="value"
                  icon="photo-o"
                  text="文字"
                />
              </van-grid>
            </div>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
    <div>
      <transition name="van-slide-right">
        <div v-if="searchFlag" class="main">
          <searchBar @closeSearch="showSearch"></searchBar>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import search from "@/components/search.vue";
import searchBar from "@/views/searchBar.vue";
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      searchFlag: false,
      shopItem: [" 书籍 ", " 数码 ", "考研资料", "等级考试", "教资资料"]
    };
  },
  components: {
    search,
    searchBar
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    showSearch() {
      this.searchFlag = !this.searchFlag;
    }
  }
};
</script>
<style lang="scss" scoped>
.bg {
  background-color: #f2f2f2f2;
  padding-bottom: 75px;
}
.search {
  width: 200px;
  height: 200px;
  background-color: coral;
  position: absolute;
}
.pull {
  background-color: coral;
}
.pulling-text {
  color: #ffffff;
}
.content {
  height: 300px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
}
.classify {
  width: 90%;
  height: 120px;
  border: 1px #efefef solid;
  border-radius: 7px;
  margin: 0px auto;
  display: flex;
}
.half {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 50%;
}
.fen-top-left {
  border-radius: 7px 0px 0px 0px;
}
.fen-top-right {
  border-radius: 0px 7px 0px 0px;
}
.fen-bottom-left {
  border-radius: 0 0 0 7px;
}
.fen-bottom-right {
  border-radius: 0 0 7px 0;
}
.fen {
  background-color: green;
  padding: 8px 10px;
  display: flex;
  height: 120px;
}
.main {
  background-color: white;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh);
  z-index: 99999;
  position: absolute;
  top: 0px;
}
</style>
