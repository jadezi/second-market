<template>
  <div class="time-stamp-bg">
    <div id="time-stamp" :class="timeStyleFun()">
      <span v-if="setbackgroundColor">{{ msgTimeStamp | dateFilters }}</span>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/assets/js/date.js'
export default {
  props: ['msgTimeStamp', 'timeStyle', 'backgroundColor'],
  methods: {
    timeStyleFun() {
      if (this.timeStyle == 'right') {
        return 'timeRightStyle'
      } else if (this.timeStyle == 'left') {
        return 'timeleftStyle'
      } else {
        return 'timeCenterStyle'
      }
    },
    setbackgroundColor() {
      if (this.backgroundColor != 'transport') {
        return 'background-color'
      } else {
        return ''
      }
    }
  },
  filters: {
    dateFilters: function(timeStamp) {
      console.log(timeStamp)
      var t = Number(timeStamp)
      console.log(timeStamp)
      var nowDateStamp = new Date()
      var timeStampObj = new Date(t)
      var day = nowDateStamp.getDate() - timeStampObj.getDate()
      if (day > 3 && day < 20) {
        return formatDate(t, 'MM-dd hh:mm')
      } else if (day == 2) {
        return '前天 ' + formatDate(t, 'hh:mm')
      } else if (day == 1) {
        return '昨天 ' + formatDate(t, 'hh:mm')
      } else if (day == 0) {
        return formatDate(t, 'hh:mm')
      } else {
        console.log(timeStamp)
        return formatDate(t, 'yyyy-MM-dd hh:mm')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.time-stamp-bg {
  margin: 12px 0px;
}
#time-stamp {
  display: flex;
  span {
    height: 20px;
    font-size: 14px;
    border-radius: 10px;
    padding: 3px 5px;
    color: #7a7a7a;
    text-align: center;
  }
  .background-color {
    background-color: #f2f2f2;
  }
}
.timeRightStyle {
  justify-content: flex-end;
}
.timeleftStyle {
  justify-content: flex-start;
}
.timeCenterStyle {
  justify-content: center;
}
</style>
