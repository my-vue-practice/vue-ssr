import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import About from '../views/About.vue';

Vue.use(VueRouter);

//导出工厂函数
// export function createRouter() {
//   return new VueRouter({
//     routes: [
//       { path: '/', component: Home },
//       { path: '/about', component: About }
//     ]
//   });
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

export function createRouter() {
  return new VueRouter({
    routes
  });
}
