import { Login } from "@/api/login.js";
import { setTK,userName } from "@/utils/app.js";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))||false,
    username: '',
    to_ken: ''
}
const getters = {}
const mutations = {
    SET_COLLOSPE: (state)=> {
        state.isCollapse = !state.isCollapse
        // 解决刷新时的菜单栏状态 可以使用sessionStorage/localStorage/cookie解决
        // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value) {
        state.to_ken = value
    },
    SET_USERNAME(state,value) {
        state.username = value
    }
}
const actions = {
    userLogin(content,value) {
        return new Promise((reslove, reject)=>{
            Login(value).then((response)=>{
                console.log(response.data)
                let data = response.data
                content.commit('SET_TOKEN',data.token)
                content.commit('SET_USERNAME',data.username)
                // 存在cookie
                setTK(data.token)
                userName(data.username)
                reslove(response)
            }).catch(error =>{
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};