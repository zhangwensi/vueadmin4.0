import Vue from "vue";
import Svgicon from "./Svgicon.vue";
Vue.component("svg-icon", Svgicon);
/**
 * require.context  读取指定目录的文件,参数1指定的目录，参数二 是否包含子级目录 参数三定义遍历文件规则
 * **/

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
