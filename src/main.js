import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/icon/local.css'
import '@/assets/resetVant.scss'
import '@/assets/css/iconfont/iconfont.css'

import axios from 'axios'
import {
  PullRefresh,
  DropdownMenu,
  DropdownItem,
  Toast,
  Notify,
  Search,
  Dialog,
  Divider,
  SwipeCell,
  Button,
  Icon,
  Skeleton,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Loading,
  Grid,
  GridItem,
  NavBar,
  Field,
  CellGroup,
  Cell,
  Collapse,
  ActionSheet,
  CollapseItem,
  Uploader,
  Area,
  Popup,
  RadioGroup,
  Radio,
  SwitchCell,
  NumberKeyboard,
  Tag,
  ContactCard,
  Card,
  Sticky,
  ImagePreview,
  AddressEdit,
  AddressList,
  Panel,
  Image,
  Form,
  Progress,
  SubmitBar,
  List,
  CountDown,
  DatetimePicker,
  Overlay,
  Empty
} from 'vant'

Vue.use(Image)
Vue.use(List)
Vue.use(Grid).use(GridItem)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Notify)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(SwipeCell)
Vue.use(Button)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Skeleton)
Vue.use(Tabs).use(Tab)
Vue.use(Loading)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Uploader)
Vue.use(ActionSheet) 
Vue.use(Area)
Vue.use(Popup)
Vue.use(RadioGroup)
Vue.use(Panel)
Vue.use(Radio)
Vue.use(NumberKeyboard)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Tag)
Vue.use(Sticky)
Vue.use(ImagePreview)
Vue.use(Card)
Vue.use(AddressList)
Vue.use(SwitchCell)
Vue.use(AddressEdit)
Vue.use(ContactCard)
Vue.use(SubmitBar)
Vue.use(Overlay)
Vue.use(CountDown)
Vue.use(Form)
Vue.use(Progress)
Vue.use(DatetimePicker)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8088/api/'

axios.interceptors.request.use(config => {
  var pattern = new RegExp('public')
  if (pattern.test(config.url)) {
    config.headers['authorization'] = null
  } else {
    config.headers['authorization'] = sessionStorage.getItem('market-token')
  }
  return config
})

axios.interceptors.response.use(res => {
  console.log(res)
  if (res.data.code == 401) {
    window.sessionStorage.removeItem('market-token')
    window.sessionStorage.removeItem('market-uid')
    router.push({
      path: '/login',
      query:{redirect:'/'}
    })
  } else {
    return res
  }
})

axios.defaults.timeout = 6000

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
