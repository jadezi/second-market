import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/icon/local.css'
import '@/assets/resetVant.scss'
import '@/assets/css/iconfont/iconfont.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
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
  SubmitBar,
  List,
  Overlay
} from 'vant'

Vue.use(Image)
Vue.use(List)
Vue.use(Grid).use(GridItem)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Search)
Vue.use(Icon)
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
Vue.config.productionTip = false

axios.defaults.baseURL =
  'http://192.168.43.170:7300/mock/5dde29b78eecd44600ce5be8/sec'
axios.defaults.timeout = 3000
Vue.prototype.$http = axios

Vue.use(
  new VueSocketIO({
    connection: SocketIO('http://127.0.0.1:3000/'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: { path: '/' }
  })
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
