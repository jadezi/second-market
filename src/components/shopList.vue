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
    },
    id: {
      type: String
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
      pagenum: 1,
      // 已加载卡片数量
      pageSize: 4
    }
  },
  computed: {},
  watch: {
    selectTabItem(val) {
      this.selectTabItem = val
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getShopList() {
      try {
        console.log('-----获取标题-----')
        console.log(this.selectTabItem)
        console.log('-----获取结束-----')
        const { data: res } = await this.$http.get('public/goods/gettitle', {
          params: {
            id: this.id,
            title: this.selectTabItem,
            pagenum: this.pagenum,
            pagesize: this.pageSize
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
        res.data.forEach(item => {
          this.shopList.push(item)
        })
        this.pagenum++
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
