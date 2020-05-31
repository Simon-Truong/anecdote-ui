import BaseService from './base.service';
import store from '../store/store';

export default class ScheduleService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
  }

  saveSchedule(body) {
    this._apiClient.post(`/protected/schedule`, body, {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`
      }
    });
  }
}
