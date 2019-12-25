<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/bbs" icon="like-o">社区</van-tabbar-item>
      <van-tabbar-item replace icon="plus" to="/user/add">发布</van-tabbar-item>
      <van-tabbar-item replace to="/user/message" icon="smile-comment-o"
        >信息</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "tar"
};
</script>

<style scoped></style>
