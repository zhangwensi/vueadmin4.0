import service from '@/guide/interceptor.js'
/*
**获取验证码接口
*/
export function GetSms (data){
    service.request({
        method: 'post',
        baseURL: '/getSms',
        data// es6的写法
    })
}

/*
**注册接口
*/