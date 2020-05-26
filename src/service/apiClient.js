import UserService from './user.service';
import ScheduleService from './schedule.service';
import AuthService from './auth.service';

const axios = require('axios');

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  withCredentials: true
});

const authClient = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
  withCredentials: true
})

export const userService = new UserService(apiClient);
export const scheduleService = new ScheduleService(apiClient);
export const authService = new AuthService(authClient);