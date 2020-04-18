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
    apiClient.post(`/login`, body);
  }
};
