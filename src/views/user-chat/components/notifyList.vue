<template>
  <div>
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="我也是有底线滴~~~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="getNotify"
    >
      <keep-alive>
        <notify-block :infos="infos"/>
      </keep-alive>
    </van-list>
  </div>
</template>
<script>
import notifyBlock from './notifyBlock.vue'
export default {
  name: '',
  components: { notifyBlock },
  props: ['infos'],
  data() {
    return {
      listLoading: false,
      finished: false,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getNotify() {
      this.listLoading = false
      //this.finished = true
      console.log(123)
    }
  }
}
</script>
<style scoped lang="scss"></style>
