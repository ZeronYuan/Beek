import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // children: [
      //   {
      //     path: '/about',
      //     name: 'about',
      //     // route level code-splitting
      //     // this generates a separate chunk (about.[hash].js) for this route
      //     // which is lazy-loaded when the route is visited.
      //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      //   },
      //   {
      //     path: '/test',
      //     name: 'test',
      //     component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
      //   },
      // ],
    },
    {
      path: '/device',
      name: 'device',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "test" */ '../views/login/Login.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  // todo Permission redirection for router
  console.log(store);
  console.log(to, from);
  next();
});
export default router;
