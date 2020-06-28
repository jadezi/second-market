<template>
  <div class="scan">
    <van-nav-bar
      title="扫一扫"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      z-index="3000"
    />
    <div id="bcid">
      <!-- <div style="height:40%"></div> -->
      <p class="tip"><van-loading color="#1989fa" /></p>
    </div>
    <footer>
      <button @click="startRecognize">1.创建控件</button>
      <button @click="startScan">2.开始扫描</button>
      <button @click="cancelScan">3.结束扫描</button>

      <button @click="closeScan">4.关闭控件</button>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
let scan = null

export default {
  data () {
    return {
      codeUrl: '',
    }
  },
  mounted() {
    this.startRecognize()
    this.startScan()
  },
  methods: {
    // 创建扫描控件
    startRecognize () {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked

      function onmarked (type, result) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        that.codeUrl = result
        // alert(result)
        var p = new RegExp('es:/')
        if (p.test(result) ){
          that.closeScan()
          window.location.href = result.substring(4, result.length)
        } else{
          alert('无法识别二维码')
          // that.closeScan()
        }
      }
    },
    // 开始扫描
    startScan () {
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan () {
      if (!window.plus) return
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan () {
      if (!window.plus) return
      scan.close()
    },
    onClickLeft() {
      this.cancelScan()
      this.closeScan()
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.scan {
  height: 100%;

  #bcid {
    width: 100%;
    position: absolute;
    height: calc(100vh - 50px);
    left: 0;
    right: 0;
    top: 50;
    bottom: 3rem;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
  }
  footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
</style>
