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
import addressAdd from '@/views/user-address/addressAdd.vue'
import Contacts from '@/views/user-chat/contacts.vue'
import login from '@/views/user-login/login.vue'
import register from '@/views/user-register/register.vue'
import userUI from '@/views/user-index/index.vue'
import BBS from '@/views/user-bbs/index.vue'
import My from '@/views/user-my/my.vue'
import Deal from '@/views/user-deal/index.vue'
import SaleCenter from '@/views/user-sale-center/saleCenter.vue'
import Setting from '@/views/user-setting/setting.vue'
import Account from '@/views/user-setting/components/account.vue'
import AddressList from '@/views/user-setting/components/addressList.vue'
import UserInfo from '@/views/user-setting/components/userInfo.vue'
import NotFound from '@/views/404/index.vue'
import Receipt from '@/components/receipt.vue'
import VueSocketIO from 'vue-socket.io'
import DynamicDetail from '@/views/user-dynamic-detail/index.vue'
import scan from '@/views/user-device/scan.vue'
import SocketIO from 'socket.io-client'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/scan',
    name: 'scan',
    component: scan
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
    path: '/detail/:id',
    name: 'shopDetail',
    component: ShopDetail
  },
  {
    path: '/dynamic/detail/:id',
    name: 'DynamicDetail',
    component: DynamicDetail
  },
  {
    path: '/deals',
    name: 'deal',
    component: Deal
  },
  {
    path: '/deals/:id',
    name: 'receipt',
    component: Receipt,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/saleCenter',
    name: 'saleCenter',
    component: SaleCenter
  },
  {
    path: '/shop/:userId/:shopId/order',
    name: 'orderInfo',
    component: OrderInfo
  },
  {
    path: '/user/address/edit',
    name: 'addressEdit',
    component: addressEdit
  },
  {
    path: '/user/address/add',
    name: 'addressAdd',
    component: addressAdd
  },
  {
    path: '/bbs',
    name: 'bbs',
    component: BBS,
    meta: {
      requireAuth: true
    }
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
    path: '/user/setting',
    name: 'setting',
    component: Setting,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/setting/address',
    name: 'AddressList',
    component: AddressList,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/setting/account',
    name: 'account',
    component: Account,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/setting/userinfo',
    name: 'userinfo',
    component: UserInfo,
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
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      redirect: true
    }
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
        Vue.use(
          new VueSocketIO({
            connection: SocketIO('http://localhost:5000'),
            debug: true
          })
        )
      }
    } else {
      next({
        path: '/login',
        query: { type: 'pwd', redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    // if (to.path === '/login') {
    //   next({
    //     path: '/login',
    //     query: { type: 'pwd', redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //   })
    // } else {
    next()
    // }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
