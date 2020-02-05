<template>
  <div class="time-stamp-bg">
    <div id="time-stamp">
      <span>{{ msgTimeStamp | dateFilters }}</span>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  props: ["msgTimeStamp"],
  filters: {
    dateFilters: function(timeStamp) {
      var nowDateStamp = new Date();
      var timeStampObj = new Date(timeStamp);
      var day = nowDateStamp.getDate() - timeStampObj.getDate();
      var minutes = nowDateStamp.getMinutes() - timeStampObj.getMinutes();
      console.log(minutes);
      if (minutes < 3) {
        this.$emit("msgToolIsShow");
      }
      if (day == 2) {
        return "前天 " + formatDate(timeStamp, "hh:mm");
      } else if (day == 1) {
        return "昨天 " + formatDate(timeStamp, "hh:mm");
      } else if (day == 0) {
        return formatDate(timeStamp, "hh:mm");
      } else {
        console.log(timeStamp);
        return formatDate(timeStamp, "yyyy-MM-dd hh:mm");
      }
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
    text-align: center;
  }
}
</style>
