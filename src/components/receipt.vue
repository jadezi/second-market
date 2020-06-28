<template>
  <div class="bg">
    <van-sticky>
      <van-nav-bar
        title="确认收货"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :head-height="130"
    >
      <template #pulling="props">
        <img
          class="doge"
          src="../../public/img/loadingindex.gif"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="../../public/img/loadingindex.gif" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="../../public/img/loadingindex.gif" />
      </template>
      <deal-list ref="shopload" selectTabItem="待收货"></deal-list>
    </van-pull-refresh>
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
      selectTabItem: '待收货',
      deals: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.push('/')
    },
    onRefresh() {
      this.isLoading = true
      this.$toast('刷新成功')
      this.isLoading = false
    },
    async getDeals() {
      let { data: re } = await this.$http.get('api/private/deals/receipt', {
        parmas: {
          id: this.$rotue.params.id
        }
      })
      if (re.code !== 200) {
        this.$router.push('404')
      }
      this.deals = re.data
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
