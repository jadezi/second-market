<template>
  <div>
    <van-nav-bar :title="name" right-text="按钮">
      <template #right>
        <van-icon name="setting-o" size="18" color="#000" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: 'navTitle',
  components: {},
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
