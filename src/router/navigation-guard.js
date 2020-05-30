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
      .catch(error => {
        if (error.response.status === 401 && protectedRoute) {
          next('/');
          return false;
        }

        return true;
      });

    return successful;
  }

  async logOut(next) {
    store.commit('logout');
    store.commit('removeAccessToken');
    store.commit('removeUser');

    clearTimeout(store.getters.setTimeOutId);
    store.commit('removeSetTimeOutId');

    await authService.removeRefreshToken();

    next('/');
    return;
  }
}

export default new NavigationGuard();
