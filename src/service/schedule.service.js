export default class ScheduleService {
  constructor(apiClient) {
    this._apiClient = apiClient;
  }

  saveSchedule(body) {
    this._apiClient.post(`/protected/schedule`, body);
  }
}
