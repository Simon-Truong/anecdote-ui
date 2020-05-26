export default class AuthService {
  constructor(authClient) {
    this._authClient = authClient;
  }

  logIn(body) {
    return this._authClient.post(`/login`, body);
  }
}
