import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
<<<<<<< HEAD
=======
  strict: process.env.VUE_APP_ENV !== 'production',
>>>>>>> 6a79f45b6a804b422f57a8cf536499f69c27e846
  state: {
    isAuthenticated: false
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
    }
  },
  actions: {}
});
