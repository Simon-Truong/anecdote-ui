import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Browse from '../components/Browse';

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

export default new VueRouter({
  routes,
  mode: 'history'
});
