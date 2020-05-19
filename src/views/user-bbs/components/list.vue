<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="listLoading"
        :finished="finished"
        finished-text="我也是有底线滴~~~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="getInfo"
      >
        <keep-alive>
          <dynamic
            :info="article"
            v-if="article.length > 0"
            @update:info="getInfo"
          ></dynamic>
        </keep-alive>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import dynamic from './dynamic.vue'
export default {
  name: 'list',
  components: {
    dynamic
  },
  props: ['index'],
  data() {
    return {
      title: 'all',
      finished: false,
      listLoading: false,
      refreshing: false,
      error: false,
      id: '',
      article: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$store.getters.getUserInfo._id
  },
  mounted() {},
  methods: {
    async onRefresh() {
      this.finished = false
      this.refreshing = false
      this.loading = true
      this.getInfo()
    },
     async getInfo() {
      try {
        const { data: res } = await this.$http.get('private/v1/dynamic/get', {
          params: {
            id: this.id
          }
        })
        // this.refreshing = false
        if (res.code !== 200) {
          this.error = false
          this.finished = true
          return this.$toast(res.message)
        }
        this.article = res.data
        this.finished = true
      } catch (error) {
        this.listLoading = false
        this.error = true
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
