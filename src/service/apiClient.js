import UserService from './user.service';
import ScheduleService from './schedule.service';

const axios = require('axios');

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`
});

export const userService = new UserService(apiClient);
export const scheduleService = new ScheduleService(apiClient);
