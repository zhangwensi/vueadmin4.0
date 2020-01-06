const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))||false
}
const getters = {}
const mutations = {
    SET_COLLOSPE: (state)=> {
        state.isCollapse = !state.isCollapse
        // 解决刷新时的菜单栏状态 可以使用sessionStorage/localStorage/cookie解决
        // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    }
}
const actions = {}
// const app = {
//     state: {
//         // 定义首页菜单侧边栏初始展开值
//         // isCollapse: JSON.parse(Cookie.get('isCollapse'))||false
//         isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))||false
//         },
//         // 做属性计算时需要使用getters
//     getters: {},
//     mutations: {
//         SET_COLLOSPE: (state)=> {
//             state.isCollapse = !state.isCollapse
//             // 解决刷新时的菜单栏状态 可以使用sessionStorage/localStorage/cookie解决
//             // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
//             sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
//         }
//     },
//     actions: {}
// }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};