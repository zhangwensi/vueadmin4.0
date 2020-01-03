import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/login.vue")
  },
  {
    path: "/home",
    name: "home",
    meta: {
      icon: "control",
      name: "控制台"
    },
    redirect: "/index", // 重定向至子路由的index页面
    // component: ()=>import ('../views/Layout/home.vue'),
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          name: "子选项"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      icon: "menu",
      name: "信息管理"
    },
    // component: ()=>import ('../views/Layout/home.vue'),
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/News/infoIndex.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/News/infoCategory.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      icon: "user",
      name: "用户管理"
    },
    // component: ()=>import ('../views/Layout/home.vue'),
    component: Layout,
    children: [
      {
        path: "/userInfo",
        name: "UserInfo",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/UserInfo.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
