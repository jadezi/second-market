<template>
  <div>
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="我也是有底线滴~~~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="getInfo"
    >
      <keep-alive>
        <dynamic :info="article" v-if="article.length > 0" @update:info="getInfo"></dynamic>
      </keep-alive>
    </van-list>
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
      error: false,
      id: '',
      article: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.id = JSON.parse(window.sessionStorage.getItem('market-uid'))._id
  },
  mounted() {},
  methods: {
    async getInfo() {
      try {
        const { data: res } = await this.$http.get('private/v1/dynamic/get', {
          params: {
            id: this.id
          }
        })
        this.loading = false
        console.log(res)
        if (res.code !== 200) {
          this.error = false
          this.finished = true
          return this.$toast(res.message)
        }
        console.log(res)
        this.article = res.data
        // this.listLoading = false
        this.finished = true
        console.log('--获取结束--')
      } catch (error) {
        console.log('--获取出现错误--')
        this.listLoading = false
        this.error = true
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
