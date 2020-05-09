import router from "./index.js";
import { userTK } from "@/utils/app.js";

// 使用cookie中的存在的token
// 定义路由白名单
const whiteRoute = ['/login'];
// 路由守卫 路由改变时触发  next的函数一定要用调用的形式才会触发reslove钩子 =>next()

router.beforeEach((to, from, next) => {
    // token存在
    if(userTK()){
        next()
        // 路由的动态添加  为每个登录的角色分配不同的菜单
    } else {
        /* 用户to.path 代替要进入的页面 ,需要更配置的白名单比较，如果有直接进入  
        否则重新进入beforeEach,再一次进入的时候to.path的值为'./login'所以直接执行next()
        不会进入死循环 */
        if(whiteRoute.indexOf(to.path) !== -1) {
            next()
        }else {
            next('/login')
        }
    }

  })