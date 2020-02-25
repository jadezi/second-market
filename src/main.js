import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
  SubmitBar
} from "vant";

Vue.use(Image);
Vue.use(Grid).use(GridItem);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Notify);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Skeleton);
Vue.use(Tabs).use(Tab);
Vue.use(Loading);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(Area);
Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Panel);
Vue.use(Radio);
Vue.use(NumberKeyboard);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Tag);
Vue.use(Sticky);
Vue.use(ImagePreview);
Vue.use(Card);
Vue.use(AddressList);
Vue.use(SwitchCell);
Vue.use(AddressEdit);
Vue.use(ContactCard);
Vue.use(SubmitBar);
Vue.config.productionTip = false;

import "@/assets/resetVant.scss";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
Vue.use(
  new VueSocketIO({
    connection: SocketIO("http://127.0.0.1:3000/"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/" }
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
