import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import Root from '../components/Root';

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
    path: '/root',
    name: 'root',
    component: Root
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
