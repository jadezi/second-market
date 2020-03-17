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
        <van-tabs sticky swipeable @click="setTabChecked">
          <van-tab
            v-for="titleItem in shopTitleItems"
            :key="titleItem.id"
            :title="titleItem.title"
          >
            <van-list
              v-model="listLoading"
              :finished="finished"
              finished-text="我也是有底线滴~~~"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="getShopList()"
            >
              <keep-alive>
                <waterfall
                  :data="shopList"
                  v-if="shopList.length != 0"
                ></waterfall>
              </keep-alive>
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
import search from '@/components/search.vue'
import searchBar from './components/searchBar.vue'
import tar from '@/components/tar.vue'
import waterfall from '@/components/waterfall.vue'
export default {
  data() {
    return {
      count: 0,
      // 列表加载状态
      listLoading: false,
      // 列表加载是否结束
      finished: false,
      // 下拉加载状态
      isLoading: false,
      // 搜索栏打开状态
      searchFlag: false,
      // 商品列表
      shopList: [],
      // 商品分类标签页列表
      shopTitleItems: [],
      // 上拉加载错误状态
      error: false,
      // 当前选中的标签栏
      selectTabItem: 'books',
      // 每次上拉增加加载数量
      listAddNum: 4,
      // 已加载卡片数量
      listSize: 0
    }
  },
  components: {
    search,
    searchBar,
    waterfall,
    // showblock,
    tar
  },
  mounted() {
    this.getTabList()
  },
  methods: {
    // 获取标签栏标题
    async getTabList() {
      try {
        const { data: res } = await this.$http.get('navtitle')
        if (res.meta.status !== 200) {
          return this.$toast('网络错误')
        }
        this.shopTitleItems = res.data
      } catch {
        this.$toast('服务器异常')
      }
    },
    // 切换标签栏触发事件
    setTabChecked(index, name) {
      console.log(name)
      this.shopTitleItems.forEach(item => {
        console.log(item.id)
        if (item.id == index) {
          this.selectTabItem = item.param
          this.listSize = 0
          this.finished = false
          this.shopList = []
          // this.shopListLeft = []
          // this.shopListRight = []
          this.getShopList()
          return
        }
      })
    },
    contentItems(title) {
      var comment = this.shopList.filter(item => {
        return item.title == title
      })
      return comment
    },
    onRefresh() {
      this.getShopList()
      this.$toast('刷新成功')
      this.isLoading = false
      this.count++
    },
    async getShopList() {
      try {
        const { data: res } = await this.$http.get(
          `shoplist/${this.selectTabItem}`,
          {
            params: {
              listAddNum: this.listAddNum,
              listSize: this.listSize
            }
          }
        )

        if (res.meta.status !== 200) {
          this.error = true
          return this.$toast('服务器异常')
        }
        if (res.data.arr.length == 0) {
          console.log('185 hang')
          this.finished = true
          return
        }
        // // 当前商品列表长度
        var length = this.shopList.length

        if (res.data.length === length) {
          console.log('196 hang')
          this.finished = true
          return
        }

        res.data.arr.forEach(item => {
          this.shopList.push(item)
        })
        this.listSize = this.shopList.length
        // //加载状态结束
        this.listLoading = false
      } catch (err) {
        this.listLoading = false
        this.error = true
        this.$toast('加载失败:' + err)
      }
    },
    showSearch() {
      this.searchFlag = !this.searchFlag
    }
  }
}
</script>
<style lang="scss" scoped>
// 选项卡内边距
// .tab-pane {
//   display: flex;
//   flex-wrap: wrap;
// }
// .tab-pane-item {
//   margin-top: 10px;
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
//   width: 48%;
// }
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
