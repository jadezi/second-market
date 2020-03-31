<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      123
    </van-pull-refresh>
    <tar></tar>
  </div>
</template>
<script>
import tar from '@/components/tar.vue'
export default {
  name: 'my',
  components: {
    tar
  },
  props: {},
  data() {
    return {
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onRefresh() {
      
    },
    async test() {
      const re = await this.$http.get('/private/v1/users/getuserinfo', {
        params: {
          name: 'asdfas'
        }
      })
      console.log(re)
    }
  }
}
</script>
<style scoped lang="scss"></style>
