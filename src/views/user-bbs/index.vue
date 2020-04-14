<template>
  <div class="bbs">
    <div class="head-tar">
      <van-tabs v-model="activeTitle" sticky swipeable @click="setTabChecked">
        <van-tab
          v-for="(titleItem, index) in titleGroup"
          :key="index"
          :title="titleItem.title"
        >
          <keep-alive>
            <list v-if="index < 2"></list>
            <shop-list v-else :selectTabItem="selectTabItem"></shop-list>
          </keep-alive>
        </van-tab>
      </van-tabs>
    </div>
    <tar></tar>
  </div>
</template>
<script>
import tar from '@/components/tar.vue'
import list from './components/list.vue'
// import waterfall from '@/components/waterfall.vue'
import shopList from '@/components/shopList.vue'
export default {
  name: 'userBbs',
  components: {
    list,
    tar,
    // waterfall
    shopList
  },
  props: {},
  data() {
    return {
      titleGroup: [],
      activeTitle: 1,
      selectTabItem: 'books'
      // shopList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getTitleGroup()
  },
  mounted() {},
  methods: {
    async getTitleGroup() {
      const { data: res } = await this.$http.get('public/v1/title/bbs')
      if (res.code !== 200) {
        return this.$toast('网络故障，无法显示')
      }
      this.titleGroup = res.data
    },
    setTabChecked(index, name) {
      console.log(name)
      this.titleGroup.forEach(item => {
        if (item.index == index) {
          this.selectTabItem = item.title
          return
        }
      })
    }
    // async getShopList() {
    //   try {
    //     const { data: res } = await this.$http.get(
    //       `shoplist/${this.selectTabItem}`,
    //       {
    //         params: {
    //           listAddNum: this.listAddNum,
    //           listSize: this.listSize
    //         }
    //       }
    //     )

    //     if (res.meta.status !== 200) {
    //       this.error = true
    //       return this.$toast('服务器异常')
    //     }
    //     if (res.data.arr.length == 0) {
    //       console.log('185 hang')
    //       this.finished = true
    //       return
    //     }
    //     // // 当前商品列表长度
    //     var length = this.shopList.length

    //     if (res.data.length === length) {
    //       console.log('196 hang')
    //       this.finished = true
    //       return
    //     }

    //     res.data.arr.forEach(item => {
    //       this.shopList.push(item)
    //     })
    //     this.listSize = this.shopList.length
    //     // //加载状态结束
    //     this.listLoading = false
    //   } catch (err) {
    //     this.listLoading = false
    //     this.error = true
    //     this.$toast('加载失败:' + err)
    //   }
    // }
  }
}
</script>
<style scoped lang="scss">
.bbs {
  background-color: #e2e2e2;
  min-height: calc(100vh);
  padding-bottom: 50px;
}
</style>
