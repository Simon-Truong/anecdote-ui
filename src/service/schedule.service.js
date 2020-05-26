import BaseService from './base.service';

export default class ScheduleService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
  }

  saveSchedule(body) {
    this._apiClient.post(`/protected/schedule`, body);
  }
}
