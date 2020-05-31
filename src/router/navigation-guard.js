import store from '../store/store';
import authService from '../service/authClient';

class NavigationGuard {
  async tryRefreshToken(next, protectedRoute = false) {
    const accessToken = store.getters.accessToken;

    if (accessToken) {
      return true;
    }

    const successful = await authService
      .refreshToken()
      .then(({ data }) => {
        store.dispatch('updateSession', data);
        return true;
      })
      .catch(async error => {
        if (error.response.status === 401 && protectedRoute) {
          await this.logOut();
          next('/');
          return false;
        }

        return true;
      });

    return successful;
  }

  async logOut() {
    store.commit('logout');
    store.commit('removeAccessToken');
    store.commit('removeUser');

    clearTimeout(store.getters.setTimeOutId);
    store.commit('removeSetTimeOutId');

    await authService.removeRefreshToken();
  }
}

export default new NavigationGuard();
