import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/util/auth'
import searchBar from '@/views/index/components/searchBar.vue'
import index from '@/views/index/index.vue'
import Message from '@/views/user-chat/index.vue'
import NProgress from 'nprogress'
import Add from '@/views/shop-add/index.vue'
import Comment from '@/views/user-comment/index.vue'
import ShopDetail from '@/views/shop-detail/index.vue'
import OrderInfo from '@/views/shop-order/index.vue'
import addressEdit from '@/views/user-address/addressEdit.vue'
import address from '@/views/user-address/address.vue'
import Contacts from '@/views/user-chat/contacts.vue'
import login from '@/views/user-login/login.vue'
import register from '@/views/user-register/register.vue'
import userUI from '@/views/user-index/index.vue'
import BBS from '@/views/user-bbs/index.vue'
import My from '@/views/user-my/my.vue'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/search',
    name: 'search',
    component: searchBar
  },
  {
    path: '/user/:uid/index',
    name: 'userUI',
    component: userUI
  },
  {
    path: '/user/message',
    name: 'message',
    component: Message,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/message/contacts',
    name: 'contacts',
    component: Contacts,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/add',
    name: 'add',
    component: Add,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: '/user/shop/:userId/:shopId',
    name: 'shopDetail',
    component: ShopDetail
  },
  {
    path: '/user/shop/:userId/:shopId/order',
    name: 'orderInfo',
    component: OrderInfo
  },
  {
    path: '/user/shop/:userId/:shopId/order/addressEdit',
    name: 'addressEdit',
    component: addressEdit
  },
  {
    path: '/user/address',
    name: 'address',
    component: address
  },
  {
    path: '/bbs',
    name: 'bbs',
    component: BBS
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (getToken()) {
      // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {
        // removeToken()
        window.location.reload()
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: { type: 'pwd', redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
