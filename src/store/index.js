import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app.js";
import login from "./modules/login.js";

Vue.use(Vuex);
// 使用Vuex模块化  便于日后维护
export default new Vuex.Store({
  modules: {
    app,
    login
  }
});
