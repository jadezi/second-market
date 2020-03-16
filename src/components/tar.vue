<template>
  <div>
    <van-tabbar route :safe-area-inset-bottom="true" active-color="#ee0a24">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/bbs" icon="like-o">社区</van-tabbar-item>
      <van-tabbar-item icon="plus" to="/user/add">发布</van-tabbar-item>
      <van-tabbar-item to="/user/message" icon="smile-comment-o">
        信息
      </van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'tar'
}
</script>

<style scoped></style>
