const axios = require('axios');

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`
});

export default {
  getUsers(query = '') {
    return apiClient.get(`/users?q=${query}`);
  },
  signUp(newUser) {
    return apiClient.post(`/signup`, newUser);
  },
  logIn(body) {
    return apiClient.post(`/login`, body);
  },
  verify(body) {
    return apiClient.post(`/verify`, body);
  },
  resendCode(body) {
    return apiClient.post(`/resendCode`, body);
  },
  requestResetPassword(body) {
    return apiClient.post(`/requestResetPassword`, body);
  }
};
