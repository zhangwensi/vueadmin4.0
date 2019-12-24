import service from '@/guide/interceptor.js'
/*
**获取验证码接口
*/
export function GetSms (data){
    return service.request({
        method: 'post',
        baseURL: '/api/getSms', // 后端对应接口
        data// es6的写法
    })
}

/*
**注册接口
*/
export function Register(data) {
    return service.request({
        method: 'post',
        baseURL: '/api/register',
        data
    })
}
// 登录接口

export function Login(data) {
    return service.request({
        baseURL: '/api/Login',
        method: 'post',
        data
    })
}