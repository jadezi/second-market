<template>
  <div>
    <div class="footer">
      <router-link to="/" tag="span">
        <div class="icon">
          <van-icon name="wap-home-o" size="30px" />
        </div>
      </router-link>
      <router-link to="/shudong" tag="span">
        <div class="icon"><van-icon name="fire-o" size="30px" /></div>
      </router-link>
      <router-link to="/add" tag="span">
        <div class="icon add">
          <div class="add-o-round"></div>
          <van-icon name="plus" size="45px" />
        </div>
      </router-link>
      <router-link to="message" tag="span">
        <div class="icon"><van-icon name="chat-o" size="30px" /></div>
      </router-link>
      <router-link to="my" tag="span">
        <div class="icon"><van-icon name="contact" size="30px" /></div>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.footer {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 -4px 2px rgba(0, 0, 0, 0.05);
}
span {
  display: flex;
  justify-content: space-around;
}
.icon {
  height: 60px;
  display: flex;
  align-content: center;
  justify-content: space-around;
}
.icon .van-icon {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.add {
  position: relative;
  bottom: 23px;
}
.add-o-round {
  box-shadow: 0 -4px 2px rgba(0, 0, 0, 0.05);
}
.add-o-round {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
  z-index: 0;
  position: absolute;
}
</style>
<script>
export default {
  name: "tabbar",
  data() {
    return {};
  }
};
</script>
