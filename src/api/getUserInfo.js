import service from "@/guide/interceptor.js";

export function getUserInfo(params) {
    return service.request({
        baseURL:params.requestUrl,
        method:params.methods || 'post',
        data:params.data
    })
}


export function getCityPicker  (data) {
    return service.request({
        method:'post',
        baseURL:'/api/getCityPicker',
        data
    })
}

// 用户信息搜索
export const userInfoSearch = (data) => {
    return service.request({
        method:'post',
        baseURL:'/api/userSearchApi',
        data
    })
}