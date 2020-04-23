import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Browse from '../components/Browse';
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
    path: '/*',
    name: 'non-existant',
    component: Home
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
  console.log(to, from, next);
=======
>>>>>>> 6a79f45b6a804b422f57a8cf536499f69c27e846
  if (to.path === '/logout') {
    localStorage.removeItem('accessToken');
    store.commit('logout');
    next('/');
  }

  next();
});

export default router;
