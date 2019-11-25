/*
**拦截器
*/
import axios from 'axios'
//配置跨域 配置环境变量 区分生产环境与开发环境差异
const BASEURL = process.env.NODE_ENV === 'production' ? '' : ''
const service = axios.create({
    baseURL: BASEURL,
    timeout: 100000
})


/*
**请求前
*/ 

service.interceptors.request.use(function (config) {
    // 请求之前做的事情
    return config;
    }, function (error) {
    // 请求错误做的事情
    return Promise.reject(error);
})

/*
**响应
*/
service.interceptors.response.use(function (response) {
    // 对响应数据做处理
    return response;
    }, function (error) {
    // 响应错误做的事情
    return Promise.reject(error);
})
export default service;