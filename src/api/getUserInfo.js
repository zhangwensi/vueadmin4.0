import service from "@/guide/interceptor.js";

export function getUserInfo(params) {
    return service.request({
        baseURL:params.requestUrl,
        method:params.methods || 'post',
        data:params.data
    })
}
