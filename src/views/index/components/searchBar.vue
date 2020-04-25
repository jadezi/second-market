<template>
  <div class="bg">
    <div class="header">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="searchVoc"
        shape="round"
        show-action
        @cancel="OnCancel"
        @search="onSearch"
      >
        <div slot="label">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="selected"
              :options="searchOption"
              title-class="search-item"
              @change="change"
            />
          </van-dropdown-menu>
        </div>
      </van-search>
    </div>
    <div class="content" v-if="selected == 0">
      <waterfall :data="shopList" v-if="shopList.length != 0"></waterfall>
    </div>
    <div class="content" v-if="selected == 1">
      <user-block :infos="shopList" v-if="shopList.length != 0"></user-block>
    </div>
    <div class="content" v-if="empty">
      <van-empty image="search" :description="error" />
    </div>
  </div>
</template>

<script>
import waterfall from '@/components/waterfall.vue'
import userBlock from '@/components/userBlock.vue'
export default {
  name: 'searchBar',
  data() {
    return {
      searchVoc: '123',
      selected: 0,
      goodsUrl: 'public/v1/goods/search',
      usersUrl: 'public/v1/users/search',
      url: 'public/v1/goods/search',
      empty: false,
      error: '',
      searchOption: [
        { text: '宝贝', value: 0 },
        { text: '用户', value: 1 }
      ],
      shopList: [],
      query: {
        query: '',
        pagenum: 1,
        pagesize: 1
      }
    }
  },
  components: {
    waterfall,
    userBlock
  },
  methods: {
    OnCancel() {
      this.$emit('closeSearch')
    },
    change(value) {
      this.selected = value
      if (value === 0) {
        this.url = this.goodsUrl
      } else {
        this.url = this.usersUrl
      }
    },
    async onSearch(value) {
      this.empty = false
      this.shopList = []
      this.query.query = value
      let { data: re } = await this.$http.get(this.url, { params: this.query })
      if (re.code !== 200) {
        this.empty = true
        this.error = re.message
        return
      }
      this.shopList = re.data
    }
  }
}
</script>
<style scoped>
.bg {
  background-color: #f9f9fb;
  width: 100%;
  height: calc(100vh);
  padding-bottom: 0px !important;
}
.content {
  padding: 0px 20px;
}
.van-cell__title span {
  padding-left: 16px;
}
.search-item {
  padding-left: 16px;
}
</style>
