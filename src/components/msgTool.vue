<template>
  <div>
    <div class="father father-left">
      <div class="log">
        <img src="{{ userImg }}" />
      </div>
      <div class="son son-left">
        <div class="title">{{ nickName }}</div>
        <div class="message">
          <div>{{ message }}}</div>
        </div>
      </div>
    </div>
    <div id="time-stamp">2222-22-22</div>
    <div class="father father-right">
      <div class="log">
        <img src="{{ userImg }}" />
      </div>
      <div class="son son-right">
        <div class="title title-right">{{ nickName }}</div>
        <div class="message">
          <div>123</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickName: "你好",
      userImg: "test"
    };
  },
  methods: {
    formatDate() {
      Date.prototype.format = function(format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          S: this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
      var date = new Date();
      var d = date.format("yyyy-MM-dd");
      console.log(d);
    }
  }
};
</script>
<style scoped>
.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.father {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 10px 0 15px 0;
}
.father-left {
  flex-direction: row;
}

.father-right {
  flex-direction: row-reverse;
}
.son {
  display: flex;
  flex-direction: column;
}
.son-right {
  margin-right: 10px;
}
.son-left {
  margin-left: 10px;
}
.title {
  font-size: 12px;
  margin-bottom: 2px;
}

.title-right {
  text-align: right;
}

.message {
  padding: 10px;
  background-color: cadetblue;
  border-radius: 10px;
}

.log img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

#time-stamp {
  width: 100px;
  height: 20px;
  font-size: 14px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 3px;
  color: #7a7a7a;
  margin: 0 auto;
  text-align: center;
}
</style>
