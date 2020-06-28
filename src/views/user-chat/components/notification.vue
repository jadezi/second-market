<template>
  <div>
    <div class="head">
      <van-nav-bar
        title="消息"
        left-text="返回"
        @click-left="onClickLeft"
      ></van-nav-bar>
      <van-tabs v-model="active" @click="onTabsClick">
        <van-tab title="活动消息" dot>
          <van-empty v-if="infos.length == 0" :description="`无${type}`" />
          <notify-list v-else :infos="infos"></notify-list>
        </van-tab>
        <van-tab title="系统消息" dot>
          <van-empty v-if="infos.length == 0" :description="`无${type}`" />
          <notify-list v-else :infos="infos"></notify-list>
        </van-tab>
        <van-tab title="互动消息">
          <van-empty v-if="infos.length == 0" :description="`无${type}`" />
          <notify-list v-else :infos="infos"></notify-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import notifyList from './notifyList'
export default {
  name: 'notification',
  components: { notifyList },
  props: {},
  data() {
    return {
      active: 1,
      infos: [],
      type: '系统消息通知'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getNotify()
  },
  methods: {
    onClickLeft() {
      this.$emit('closeNotify')
    },
    async getNotify() {
      this.infos = []
      let { data: re } = await this.$http.get('private/notification/get', {
        params: {
          college: 4,
          type: this.type
        }
      })
      if (re.code !== 200) {
        return
      }
      this.infos = re.data
      console.log(re)
    },
    onTabsClick(name, title) {
      this.type = `${title}通知`
      this.getNotify()
    }
  }
}
</script>
<style scoped lang="scss">
.van-info {
  right: -6px !important;
}
</style>
