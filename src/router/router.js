import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Browse from '../components/Browse';
import Verify from '../components/Verify';
import ResetPassword from '../components/Reset-Password';
import Schedule from '../components/Schedule';
import store from '../store/store';

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
    component: Schedule
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

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    store.commit('login');
  }

  if (to.path === '/logout') {
    localStorage.removeItem('accessToken');
    store.commit('logout');
    next('/');
    return;
  }

  next();
});

export default router;
