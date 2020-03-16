<template>
  <div class="tab-pane">
    <div class="tab-pane-item">
      <template class="demo2-t">
        <showblock
          v-for="(item, index) in shopListLeft"
          :key="index"
          :item="item"
        ></showblock>
      </template>
    </div>
    <div class="tab-pane-item">
      <template class="demo2-t">
        <showblock
          v-for="(item, index) in shopListRight"
          :key="index"
          :item="item"
        ></showblock>
      </template>
    </div>
  </div>
</template>

<script>
import showblock from '@/components/showblock.vue'
export default {
  name: 'waterfall',
  props: ['data'],
  components: {
    showblock
  },
  data() {
    return {
      shopListLeft: [],
      shopListRight: []
    }
  },
  methods: {
    dataHandle() {
      this.data.forEach((item, index) => {
        if ((index + 1) % 2 !== 0) {
          this.shopListLeft.push(item)
        } else {
          this.shopListRight.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>
.tab-pane {
  display: flex;
  flex-wrap: wrap;
}
.tab-pane-item {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 48%;
}
.tab-pane-item:last-child {
  margin-left: 13px;
}
</style>
