<template>
  <div class="bbs">
    <div class="head-tar">
      <van-tabs sticky swipeable @click="setTabChecked">
        <van-tab
          v-for="titleItem in titleGroup"
          :key="titleItem.id"
          :title="titleItem.title"
        >
          <list></list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import list from './components/list.vue'
export default {
  name: 'userBbs',
  components: {
    list
  },
  props: {},
  data() {
    return {
      titleGroup: []
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
      const { data: res } = await this.$http.get('/bbs/navtitle')
      if (res.meta.status !== 200) {
        return this.$toast('网络故障，无法显示')
      }
      this.titleGroup = res.data
    },
    setTabChecked(name) {
      console.log(name)
    }
  }
}
</script>
<style scoped lang="scss">
.bbs {
  background-color: #e2e2e2;
  height: calc( 100vh )
}
</style>
