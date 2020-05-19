<template>
  <div>
    <div v-for="info in infos" :key="info._id">
      <msgTool
        :timeStyle="style"
        :msgTimeStamp="info.createAt"
        :backgroundColor="transport"
      />
      <div class="card">
        <div class="header">{{ info.title }}</div>
        <van-divider />
        <div class="content">
          <div class="desc">{{ info.desc }}</div>
          <div class="cover" v-if="info.cover">
            <img :src="info.cover" />
          </div>
        </div>
        <div class="view" v-if="info.cover">
          <van-divider />
          <van-cell title="查看更多" is-link />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import msgTool from './msgTool.vue'
export default {
  name: 'notifyBlock',
  components: { msgTool },
  props: ['infos'],
  data() {
    return {
      style: 'center',
      transport: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.card {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #e2e2e2e2;
  .header {
    font-size: 20px;
    font-weight: 500;
    padding: 10px 15px;
  }
  .content {
    .desc {
      font-size: 14px;
      color: #8e8e8e;
      padding: 8px 15px;
    }
    .cover img {
      width: 90%;
      height: 150px;
      padding: 8px 15px;
    }
  }
}
</style>
