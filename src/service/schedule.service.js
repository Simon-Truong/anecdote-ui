import BaseService from './base.service';
import store from '../store/store';

export default class ScheduleService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
  }

  getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`
      }
    };
  }

  getSchedules(monthYear, selectedUserId) {
    return this._apiClient.get(`/protected/schedule?d=${monthYear}&u=${selectedUserId}`, this.getAuthHeaders());
  }

  getDetailSchedules(dateFrom, dateTo, selectedUserId) {
    return this._apiClient.get(`/protected/detailSchedule?f=${dateFrom}&t=${dateTo}&u=${selectedUserId}`, this.getAuthHeaders());
  }

  saveSchedule(body) {
    return this._apiClient.post(`/protected/schedule`, body, this.getAuthHeaders());
  }
}
