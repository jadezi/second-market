<template>
  <div class="time-stamp-bg">
    <div id="time-stamp">
      <span>{{ date }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["msgTimeStamp"],
  data() {
    return {
      date: null
    };
  },
  mounted() {
    this.formatDate();
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
      var newdate = new Date(this.msgTimeStamp);
      this.date = newdate.format("yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style scoped lang="scss">
.time-stamp-bg {
  margin: 12px 0px;
}
#time-stamp {
  display: flex;
  justify-content: center;
  span {
    min-width: 100px;
    max-width: 130px;
    height: 20px;
    font-size: 14px;
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 3px 5px;
    color: #7a7a7a;
  }
}
</style>
