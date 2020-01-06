import { Login } from "@/api/login.js";

const state = {}
const getters = {}
const mutations = {}
const actions = {
     // 处理异步操作，可以通过this.$store.dispatch(content,value) -> Action->mutations达到改变state值
     userLogin(content,value) {
        return new Promise((reslove, reject)=>{
        Login(value).then((response)=>{
            reslove(response)
        }).catch(error =>{
            reject(error)
        })
    })
}
}

/* const login = {
    state: {},
    // 做属性计算时需要使用getters
    getters: {},
    mutations: {},
    actions: {
        // 处理异步操作，可以通过this.$store.dispatch(content,value) -> Action->mutations达到改变state值
        userLogin(content,value) {
                return new Promise((reslove, reject)=>{
                Login(value).then((response)=>{
                    reslove(response)
                }).catch(error =>{
                    reject(error)
                })
            })
        }
    }
} */

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};