import AuthService from './auth.service';

const axios = require('axios');

const authClient = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
  withCredentials: true
})

export default new AuthService(authClient);
