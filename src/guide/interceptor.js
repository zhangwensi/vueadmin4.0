/*
 **拦截器
 */
import axios from "axios";
import { Message } from "element-ui";
import {userTK,getName} from "@/utils/app.js";
//配置跨域 配置环境变量 区分生产环境与开发环境差异
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const service = axios.create({
  baseURL: BASEURL, // http://192.168.1.18:8080/api  == http://127.0.0.1:3000/api
  timeout: 100000
});

/*
 **请求前
 */

service.interceptors.request.use(
  function(config) {
    // 请求之前做的事情
    // 可配置token等信息 
    config.headers['token'] = userTK()     //后台暂不对cookie信息进行处理
    config.headers['userName'] = getName()
    return config;
  },
  function(error) {
    // 请求错误做的事情
    return Promise.reject(error);
  }
);

/*
 **响应
 */
service.interceptors.response.use(
  function(response) {
    // 对响应数据做处理
    let data = response.data;
    // 服务器返回状态码不为0，则说明有异常发生，后端服务接口会给个message,后端会定义好，前端只需使用该值即可
    if (data.resCode !== 0) {
      Message({
        showClose: true,
        message: data.message,
        type: "error"
      });
      // 返回错误信息给对于接口的定义的调用方法(api下的 login中getSms,需要将改函数请求 return出去，以便login页面getSms方法能拿到此处的值)
      return Promise.reject(data);
    }
    return response;
    // return Promise.resolve
  },
  function(error) {
    // 响应错误做的事情
    return Promise.reject(error);
  }
);
export default service;
