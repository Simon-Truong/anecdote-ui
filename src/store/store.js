import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.VUE_APP_ENV !== 'production',
  state: {
    isAuthenticated: false,
    user: {}
  },
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated;
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
      state.user= user;
    }
  },
  actions: {}
});
