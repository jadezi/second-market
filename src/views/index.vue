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
        <van-tabs sticky swipeable>
          <van-tab
            v-for="titleItem in shopItems"
            :key="titleItem"
            :title="titleItem"
          >
            <van-list
              v-model="listLoading"
              :finished="finished"
              finished-text="没有更多了"
              error-text="请求失败，点击重新加载"
              :error.sync="error"
              @load="onLoad"
            >
              <div>
                <div
                  v-for="(item, index) in contentItems(titleItem)"
                  :key="index"
                >
                  <showblock :item="item" :index="index"></showblock>
                </div>
              </div>
            </van-list>
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
    <tar></tar>
  </div>
</template>

<script>
import search from "@/components/search.vue";
import axios from "axios";
import searchBar from "@/views/searchBar.vue";
import tar from "@/components/tar.vue";
import showblock from "@/components/showblock.vue";
export default {
  data() {
    return {
      count: 0,
      listLoading: false,
      finished: false,
      isLoading: false,
      searchFlag: false,
      shoplist: [],
      shopItems: ["书籍", "数码", "考研资料", "等级考试", "教资资料"],
      error: false
    };
  },
  components: {
    search,
    searchBar,
    showblock,
    tar
  },
  mounted() {
    this.getShopList();
  },
  methods: {
    contentItems(title) {
      var comment = this.shoplist.filter(item => {
        return item.title == title;
      });
      return comment;
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 上滑加载
    onLoad() {
      // 下拉加载 参数为1，首次加载为0
      this.getShopList(1);
    },
    getShopList(flag) {
      axios
        .get("http://127.0.0.1:7300/mock/5dde29b78eecd44600ce5be8/sec/shoplist")
        .then(response => {
          let status = response.data.status;
          let data = response.data.data;
          if (status) {
            if (this.shoplist.length >= 10) {
              this.finished = true;
            }
            if (flag == 1) {
              for (let i = 0; i < 5; i++) {
                this.shoplist.push(data[this.shoplist.length + i]);
              }
              console.log(this.shoplist);
            } else {
              for (let i = 0; i < 5; i++) {
                this.shoplist.push(data[i]);
              }
              console.log(this.shoplist);
            }
          }
        })
        .catch(request => {
          console.log(request);
          this.error = true;
        });
    },
    showSearch() {
      this.searchFlag = !this.searchFlag;
    }
  }
};
</script>
<style lang="scss" scoped>
// 选项卡内边距
.van-tab__pane {
  margin-top: 10px;
  padding-bottom: 15px;
  -moz-column-count: 2; /* Firefox */
  -webkit-column-count: 2; /* Safari 和 Chrome */
  column-count: 2;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 1em;
}
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
.main > div {
  margin: 0 auto;
  width: 95%;
}
</style>
