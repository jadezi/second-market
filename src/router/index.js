import Vue from "vue";
import VueRouter from "vue-router";
import searchBar from "@/views/searchBar.vue";
import index from "@/views/index.vue";
import Message from "@/views/message.vue";
import NProgress from "nprogress";
import Add from "@/views/add.vue";
import Comment from "@/views/cmtParent.vue";
import ShopDetail from "@/views/shopDetail.vue";
import OrderInfo from "@/views/orderInfo.vue";
import addressEdit from "@/views/addressEdit.vue";
import address from "@/views/address.vue";
import Contacts from "@/views/contacts.vue";
import My from "@/views/my.vue";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/search",
    name: "search",
    component: searchBar
  },
  {
    path: "/my",
    name: "my",
    component: My
  },
  {
    path: "/user/message",
    name: "message",
    component: Message
  },
  {
    path: "/user/message/contacts",
    name: "contacts",
    component: Contacts
  },
  {
    path: "/user/add",
    name: "add",
    component: Add
  },
  {
    path: "/user/comment",
    name: "comment",
    component: Comment
  },
  {
    path: "/user/shop/:userId/:shopId",
    name: "shopDetail",
    component: ShopDetail
  },
  {
    path: "/user/shop/:userId/:shopId/order",
    name: "orderInfo",
    component: OrderInfo
  },
  {
    path: "/user/shop/:userId/:shopId/order/addressEdit",
    name: "addressEdit",
    component: addressEdit
  },
  {
    path: "/user/address",
    name: "address",
    component: address
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
