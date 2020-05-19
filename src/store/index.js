import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = {
  state: {
    userInfo: {},
    address: {}
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    delUserInfo(state) {
      state.userInfo = {}
    },
    setAddress(state, payload) {
      state.address = payload
    }
  },
  actions: {},
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getAddress: state => {
      return state.address
    }
  },
  modules: {}
}

const contactInfo = {
  state: {
    contactObj: {
      uid: '',
      toId: '',
      toUidImgUrl: '',
      readState: '',
      shopImgUrl: '',
      message: '',
      timesStamp: 0
    }
  },
  mutations: {
    setInfo: (state, payload) => {
      state.contactObj.uid = payload.uid
      state.contactObj.toId = payload.toId
      state.contactObj.toUidImgUrl = payload.toUidImgUrl
      state.contactObj.readState = payload.readState
      state.contactObj.shopImgUrl = payload.shopImgUrl
      state.contactObj.message = payload.message
      state.contactObj.timesStamp = payload.timesStamp
    }
  },
  actions: {},
  getters: {}
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    contactInfo,
    userInfo
  }
})
