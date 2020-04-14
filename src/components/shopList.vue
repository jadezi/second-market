<template>
  <div>
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="我也是有底线滴~~~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="getShopList()"
    >
      <keep-alive>
        <waterfall :data="shopList" v-if="shopList.length != 0"></waterfall>
      </keep-alive>
    </van-list>
  </div>
</template>
<script>
import waterfall from '@/components/waterfall.vue'
export default {
  name: 'shopList',
  components: {
    waterfall
  },
  props: {
    selectTabItem: {
      type: String,
      default: 'books'
    }
  },
  data() {
    return {
      listLoading: false,
      // 上拉加载错误状态
      error: false,
      // 列表加载是否结束
      finished: false,
      // 下拉加载状态
      shopList: [],
      // 每次上拉增加加载数量
      size: 1,
      // 已加载卡片数量
      pageSize: 0
    }
  },
  computed: {},
  watch: {
    selectTabItem(val) {
      this.selectTabItem = val
    }
  },
  created() {},
  mounted() {
    console.log(this.selectTabItem)
  },
  methods: {
    async getShopList() {
      try {
        console.log('-----获取标题-----')
        console.log(this.selectTabItem)
        console.log('-----获取结束-----')
        const { data: res } = await this.$http.get('public/v1/goods/gettitle', {
          params: {
            title: this.selectTabItem,
            size: this.size,
            pageSize: this.pageSize
          }
        })
        console.log(res)
        if (res.code == 404) {
          this.finished = true
          return
        }
        if (res.code !== 200) {
          this.error = true
          return this.$toast('服务器异常')
        }
        // // 当前商品列表长度
        //var length = this.shopList.length

        // if (res.data.length === length) {
        //   console.log('196 hang')
        //   this.finished = true
        //   return
        // }

        res.data.forEach(item => {
          this.shopList.push(item)
        })
        this.pageSize++
        // //加载状态结束
        this.listLoading = false
      } catch (err) {
        this.listLoading = false
        this.error = true
        this.$toast('加载失败:' + err)
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
