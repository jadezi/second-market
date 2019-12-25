import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const userInfo = {
  state: {
    uid: "sec99",
    uidImgUrl: "http://1t.click/bsFE"
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
};

const contactInfo = {
  state: {
    contactObj: {
      uid: "1",
      toId: "3",
      toUidImgUrl: "2",
      readState: "1",
      shopImgUrl: "1",
      message: "嗯",
      timesStamp: "2019-01-01"
    }
  },
  mutations: {
    setInfo: (state, payload) => {
      state.contactObj.uid = payload.uid;
      state.contactObj.toId = payload.toId;
      state.contactObj.toUidImgUrl = payload.toUidImgUrl;
      state.contactObj.readState = payload.readState;
      state.contactObj.shopImgUrl = payload.shopImgUrl;
      state.contactObj.message = payload.message;
      state.contactObj.timesStamp = payload.timesStamp;
    }
  },
  actions: {},
  getters: {}
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    contactInfo,
    userInfo
  }
});
