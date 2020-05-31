import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Browse from '../components/Browse';
import Verify from '../components/Verify';
import ResetPassword from '../components/Reset-Password';
import Schedule from '../components/Schedule';
import navigationGuard from './navigation-guard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse
  },
  {
    path: '/verify/:id',
    name: 'verify',
    component: Verify
  },
  {
    path: '/resetPassword/:id',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/schedule/:id',
    name: 'schedule',
    component: Schedule,
    async beforeEnter(to, from, next) {
      if (await navigationGuard.tryRefreshToken(next, true)) {
        next();
      }
    }
  },
  {
    path: '/logout',
    name: 'logout'
  },
  {
    path: '/*',
    name: 'non-existent',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach(async (to, from, next) => {
  await navigationGuard.tryRefreshToken(next);

  if (to.path === '/logout') {
    localStorage.setItem('logout', Date.now());
    await navigationGuard.logOut();
    next('/');
    return;
  }

  next();
});

export default router;
