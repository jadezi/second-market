<template>
  <div class="bg">
     <van-sticky>
        <van-nav-bar
          title="商品"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </van-sticky>
    <van-tabs sticky swipeable @click="setTabChecked">
      <van-tab
        v-for="titleItem in dealTitleItems"
        :key="titleItem.index"
        :title="titleItem.title"
      >
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          :head-height="130"
        >
          <template #pulling="props">
            <img
              class="doge"
              src="../../../public/img/loadingindex.gif"
              :style="{ transform: `scale(${props.distance / 80})` }"
            />
          </template>

          <!-- 释放提示 -->
          <template #loosing>
            <img class="doge" src="../../../public/img/loadingindex.gif" />
          </template>

          <!-- 加载提示 -->
          <template #loading>
            <img class="doge" src="../../../public/img/loadingindex.gif" />
          </template>
          <div v-for="item in deals" :key="item._id">
            <deal-list ref="shopload" :deals="item" :selectTabItem="selectTabItem"></deal-list>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import dealList from '@/components/dealList.vue'
export default {
  name: 'saleCenter',
  components: { dealList },
  props: {},
  data() {
    return {
      isLoading: false,
      selectTabItem: '全部订单',
      dealTitleItems: [
        {
          title: '全部订单',
          index: 0,
          params: 'all'
        },
        {
          title: '已卖出',
          index: 1,
          params: 'buy'
        },
        {
          title: '售卖中',
          index: 2,
          params: 'sale'
        },
        {
          title: '收货待确认',
          index: 3,
          params: 'receipt'
        }
      ],
      deals: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getDeals()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/my')
    },
    onRefresh() {
      this.isLoading = true
      this.getDeals()
      this.$toast('刷新成功')
      this.isLoading = false
    },
    setTabChecked(index, name) {
      console.log(name)
      this.dealTitleItems.forEach(item => {
        if (item.index == index) {
          this.selectTabItem = item.title
          return
        }
      })
      this.getDeals()
    },
    async getDeals() {
      if (this.selectTabItem == '全部订单') {
        this.status = ''
      } else if (this.selectTabItem == '已卖出') {
        this.status = '交易完成'
      } else if (this.selectTabItem == '销售中') {
        this.status = '销售中'
      } else if (this.selectTabItem == '收货待确认') {
        this.status = '已付款'
      }
      console.log(this.selectTabItem)
      let { data: re } = await this.$http.get('private/deals/orders/sale', {
        params: {
          id: this.$store.getters.getUserInfo._id,
          status: this.status
        }
      })
      if (re.code !== 200) {
        this.deals = []
        return this.$toast('订单信息获取失败')
      }
      this.deals = re.data
      console.log(this.deals)
    }
  }
}
</script>
<style scoped lang="scss">
.bg {
  background-color: #f9f9fb;
}
.doge {
  width: 70px;
  margin-top: 8px;
}
</style>
