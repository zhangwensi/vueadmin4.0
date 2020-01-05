import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 定义首页菜单侧边栏初始展开值
    // isCollapse: JSON.parse(Cookie.get('isCollapse'))||false
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))||false
  },
  // 做属性计算时需要使用getters
  getters: {},
  mutations: {
    SET_COLLOSPE: (state)=> {
      state.isCollapse = !state.isCollapse
      // 解决刷新时的菜单栏状态 可以使用sessionStorage/localStorage/cookie解决
      // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    // 处理异步操作，可以通过this.$store.dispatch(content,value) -> Action->mutations达到改变state值
  },
  modules: {}
});
