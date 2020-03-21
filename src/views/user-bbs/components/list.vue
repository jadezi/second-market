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
        <dynamic
          :infos="item"
          v-for="(item, index) in article"
          :key="index"
        ></dynamic>
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
  props: {},
  data() {
    return {
      title: 'all',
      finished: false,
      listLoading: false,
      error: false,
      article: {
        _id: '',
        article_url: '',
        author: {
          _id: '',
          avatar: '',
          name: ''
        },
        content: {
          text: '',
          imgGroup: [],
          forward_summary: {
            description: '',
            cover: '',
            url: ''
          }
        },
        summary: {
          description: '',
          cover: '',
          url: ''
        },
        forward: 0,
        // 评论数目
        review: {
          _id: '',
          amount: 0
        },
        // 点赞数目
        like: 0,
        // 发布时间
        time: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getInfo() {
      console.log('--开始获取--')
      try {
        const { data: res } = await this.$http.get('/article', {
          params: {
            title: this.title
          }
        })
        this.loading = false
        if (res.meta.status !== 200) {
          this.error = true
          return this.$toast('网络错误')
        }
        console.log(res.data)
        this.article = res.data
        // this.listLoading = false
        this.finished = true
        console.log('--获取结束--')
      } catch (error) {
        console.log('--获取出现错误--')
        this.listLoading = true
        this.error = true
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
