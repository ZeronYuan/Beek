import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store/index';
// import Home from '../views/Home.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'ToPo',
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
      path: '/Pool',
      name: 'Pool',
      component: () => import(/* webpackChunkName: "pool" */ '../views/pool/Pool.vue'),
      children: [
        {
          path: 'Index',
          name: 'Index',
          component: () => import(/* webpackChunkName: "poolSub" */ '../views/pool/subpages/Index.vue'),
        },
        {
          path: 'ItemInfo',
          name: 'ItemInfo',
          component: () => import(/* webpackChunkName: "poolSub" */ '../views/pool/subpages/ItemInfo.vue'),
        },
      ],
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
