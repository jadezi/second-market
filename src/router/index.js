import Vue from "vue";
import VueRouter from "vue-router";
import searchBar from "@/views/searchBar.vue";
import index from "@/views/index.vue";
import Message from "@/views/message.vue";
import NProgress from "nprogress";
import Add from "@/views/add.vue";
import Comment from "@/views/cmtParent.vue";
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
    path: "/user/message",
    name: "message",
    component: Message
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
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
