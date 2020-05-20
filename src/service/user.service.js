export default class UserService {
  constructor(apiClient) {
    this._apiClient = apiClient;
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
  logIn(body) {
    return this._apiClient.post(`/login`, body);
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
