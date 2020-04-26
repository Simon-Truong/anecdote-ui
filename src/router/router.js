import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Browse from '../components/Browse';
import Verify from '../components/Verify';
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
    path: '/logout',
    name: 'logout',
    redirect: '/'
  },
  {
    path: '/*',
    name: 'non-existant',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.redirectedFrom === '/logout') {
    localStorage.removeItem('accessToken');
    store.commit('logout');
  }

  next();
});

export default router;
