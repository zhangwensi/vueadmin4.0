import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: "/login",
    name: "login",
    component: ()=>import ('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index', // 重定向至子路由的index页面
    component: ()=>import ('../views/Layout/home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: ()=>import ('../views/Console/index.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
