import Vue from 'vue'
import Vuex from 'vuex'
import {
  stat
} from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOGGED: false,
    USERINFO: {

    }
  },
  mutations: {
    //登录
    LogIn(state, payload) {
      state.LOGGED = true;
      console.log(payload)
      state.USERINFO = payload;
    },

    LogOut(state) {
      state.LOGGED = false;
      state.USERINFO = {}
    }
  },
  actions: {

  },

  getters: {
    getStoreLoginStatus: state => {
      return state.LOGGED
    }
  }
})