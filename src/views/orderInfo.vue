<template>
  <div class="orderInfo-bg">
    <van-nav-bar
      title="订单信息"
      left-text="返回"
      right-text="按钮"
      left-arrow
    />
    <div class="vheight"></div>
    <van-contact-card
      :type="cardType"
      :name="currentContact"
      :tel="currentContact"
      @click="showList = true"
    />
    <!-- 联系人列表 -->
    <div>
      <van-popup v-model="showList" position="bottom">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </van-popup>
    </div>
    <div class="vheight"></div>
    <div class="shopCard">
      <van-card
        num="1"
        tag=""
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        origin-price="10.00"
      />
    </div>
    <div class="shopDetail">
      <van-panel title="送货时间">
        <div>内容</div>
      </van-panel>
    </div>
    <van-submit-bar :price="309950" button-text="付款" @submit="onSubmit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenAddressId: 1,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  computed: {
    cardType() {
      return this.chosenAddressId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenAddressId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  methods: {
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item));
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    onSubmit() {}
  }
};
</script>
<style scoped lang="scss">
.orderInfo-bg {
  background-color: #f7f8fa;
  height: calc(100vh);
  .vheight {
    height: 10px;
    width: 100%;
  }
  .van-card {
    background-color: white;
  }
  .shopDetail {
    .van-cell__title span {
      padding-left: 0px;
    }
    .van-panel__content {
      padding: 16px;
    }
  }
  .van-submit-bar__bar .van-button--danger {
    width: 80px;
    height: 40px;
  }
}
</style>
