import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.VUE_APP_ENV !== 'production',
  state: {
    isAuthenticated: false,
    accessToken: null,
    user: null
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    accessToken(state) {
      return state.accessToken
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    removeAccessToken(state) {
      state.accessToken = null;
    }
  },
  actions: {}
});
