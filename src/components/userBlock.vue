<template>
  <div>
    <div class="userBlock" @click="toIndex(infos._id)">
      <div class="avatar">
        <van-image width="50" height="50" lazy-load :src="infos.avatar" />
      </div>
      <div class="info">
        <div class="name">{{ infos.setting.name }}</div>
        <div class="desc">{{ infos.setting.signature }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userBlock',
  components: {},
  props: ['infos'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toIndex(id) {
      this.$router.push(`/user/${id}/index`)
    }
  }
}
</script>
<style scoped lang="scss">
.userBlock {
  display: flex;
  background-color: #fff;
  padding: 8px;
  margin-top: 10px;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 8px;
    .name {
      font-weight: bold;
    }
  }
}
</style>
