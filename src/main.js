import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入全局组件
import "./icons";
import "@/router/guard.js";
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueCompositionApi);


// runtime模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
