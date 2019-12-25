<template>
  <div>
    <transition mode="out-in" name="fade">
      <router-view></router-view>
    </transition>
    <tar></tar>
  </div>
</template>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-20px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 500ms ease;
}
</style>
<script>
import tar from "@/components/tar.vue";
export default {
  data() {
    return {
      count: 0,
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    backChange() {
      history.pushState(null, null, document.URL);
      setTimeout(() => {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认离开吗？"
          })
          .then(() => {})
          .catch(() => {
            history.pushState(null, null, document.URL);
          });
      }, 100);
    }
  },
  components: {
    tar
  },
  mounted() {
    // 如果支持 popstate 一般移动端都支持了
    // if (window.history && window.history.pushState) {
    //   // 往历史记录里面添加一条新的当前页面的url
    //   history.pushState(null, null, document.URL);
    //   // 给 popstate 绑定一个方法 监听页面刷新
    //   window.addEventListener("popstate", this.backChange, false); //false阻止默认事件
    // }
  },
  destroyed() {
    // window.removeEventListener("popstate", this.backChange, false); //false阻止默认事件
  }
};
</script>
<style scoped></style>
