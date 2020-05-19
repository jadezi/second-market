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
          <deal-list ref="shopload" :selectTabItem="selectTabItem"></deal-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import dealList from '@/components/dealList.vue'
export default {
  name: 'deal',
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
          title: '已购买',
          index: 1,
          params: 'buy'
        },
        {
          title: '已卖出',
          index: 2,
          params: 'sale'
        },
        {
          title: '售卖中',
          index: 3,
          params: 'saling'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.push('/my')
    },
    onRefresh() {
      this.isLoading = true
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
