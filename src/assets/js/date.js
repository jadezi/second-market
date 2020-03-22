function formatDate(timeStamp, format) {
  var date = new Date(timeStamp)
  var o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

function differDateFormat(startDate, completeTime) {
  var stime = startDate
  var etime = completeTime
  // 两个时间戳相差的毫秒数
  var usedTime = etime - stime
  // 计算相差的天数
  var days = Math.floor(usedTime / (24 * 3600 * 1000))
  // 计算天数后剩余的毫秒数
  var leave1 = usedTime % (24 * 3600 * 1000)
  // 计算出小时数
  var hours = Math.floor(leave1 / (3600 * 1000))
  // 计算小时数后剩余的毫秒数
  var leave2 = leave1 % (3600 * 1000)
  // 计算相差分钟数
  var minutes = Math.floor(leave2 / (60 * 1000))
  // var time = days + '天' + hours + '时' + minutes + '分'
  var time = { day: days, hour: hours, minute: minutes }
  return time
}

export { formatDate, differDateFormat }
