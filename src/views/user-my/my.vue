<template>
  <div>
    <van-button type="permiary" @click="test">ceshi</van-button>
  </div>
</template>
<script>
export default {
  name: 'my',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
