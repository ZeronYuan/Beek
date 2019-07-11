import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store/index';
// import Home from '../views/Home.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Dashboard',
      },
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
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/ToPo',
      name: 'ToPo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "topo" */ '../views/topology/Topo.vue'),
    },
    {
      path: '/Device',
      name: 'Device',
      component: () => import(/* webpackChunkName: "device" */ '../views/device/Device.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "home" */ '../views/login/Login.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    },
    {
      path: '*',
      name: 'Error404',
      component: () => import(/* webpackChunkName: "home" */ '../views/Error404.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  // todo Permission redirection for router
  // console.log(store);
  // console.log(to, from);
  next();
});
export default router;
