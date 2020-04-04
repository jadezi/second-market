<template>
  <div>
    <transition name="van-fade">
      <nav-title v-show="titleVisible" :name="name"></nav-title>
    </transition>
    <van-pull-refresh
      v-model="isLoading"
      :head-height="130"
      @refresh="onRefresh"
    >
      <template #pulling="props">
        <img
          class="doge"
          src="../../../public/img/loading.gif"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="../../../public/img/loading.gif" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="../../../public/img/loading.gif" />
      </template>

      <div class="pure_top"></div>
    </van-pull-refresh>
    <tar></tar>
  </div>
</template>
<script>
import tar from '@/components/tar.vue'
import navTitle from './components/title.vue'
export default {
  name: 'my',
  components: {
    tar,
    navTitle
  },
  props: {},
  data() {
    return {
      isLoading: false,
      name: 'tab',
      titleVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {
    window.addEventListener('scroll', this.scrollHandle)
  },
  mounted() {},
  methods: {
    scrollHandle(e) {
      var top = e.srcElement.scrollingElement.scrollTop
      if (top == 0) {
        //this.title = ''
        this.titleVisible = false
        return
      }
      this.name = this.$store.state.userInfo.uname
      this.titleVisible = true
      return
    },
    onRefresh() {},
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
<style scoped lang="scss">
.pure_top {
  width: 100%;
  height: 200px;
  position: relative;
  z-index: -1;
  overflow: hidden;
}

.pure_top::after {
  content: '';
  width: 140%;
  height: 160px;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 50% 50%;
  background: #1496f1;
}
.doge {
  width: 70px;
  margin-top: 8px;
}
</style>
