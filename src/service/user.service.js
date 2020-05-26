import BaseService from './base.service';

export default class UserService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
  }
  getUsers(query = '') {
    return this._apiClient.get(`/users?q=${query}`);
  }
  getUserById(userId) {
    return this._apiClient.get(`/user/${userId}`);
  }
  signUp(newUser) {
    return this._apiClient.post(`/signup`, newUser);
  }
  verify(body) {
    return this._apiClient.post(`/verify`, body);
  }
  resendCode(body) {
    return this._apiClient.post(`/resendCode`, body);
  }
  requestResetPassword(body) {
    return this._apiClient.post(`/requestResetPassword`, body);
  }
  resetPassword(body) {
    return this._apiClient.post(`/resetPassword`, body);
  }
}
