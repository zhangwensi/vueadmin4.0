import service from "@/guide/interceptor.js";

export const addUsers = (data) => {
    return service.request({
        method:'post',
        baseURL: '/api/addUser',
        data
    })
}