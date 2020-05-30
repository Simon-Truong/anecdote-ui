import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../service/authClient';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.VUE_APP_ENV !== 'production',
  state: {
    isAuthenticated: false,
    accessToken: null,
    user: null,
    setTimeOutId: null
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    accessToken(state) {
      return state.accessToken;
    },
    user(state) {
      return state.user;
    },
    setTimeOutId(state) {
      return state.setTimeOutId;
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
    },
    setTimeOutId(state, id) {
      state.setTimeOutId = id;
    },
    removeSetTimeOutId(state) {
      state.setTimeOutId = null;
    }
  },
  actions: {
    updateSession({ dispatch, commit }, { accessToken, user, accessTokenExpInMins }) {
      commit('login');
      commit('setAccessToken', accessToken);
      commit('setUser', user);

      dispatch('autoRefresh', accessTokenExpInMins);
    },
    autoRefresh({ dispatch, commit }, accessTokenExpInMins) {
      const id = setTimeout(() => {
        authService.refreshToken().then(({ data }) => {
          dispatch('updateSession', data);
        });
      }, accessTokenExpInMins * 60 * 1000);

      commit('setTimeOutId', id);
    }
  }
});
