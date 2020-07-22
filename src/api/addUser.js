import service from "@/guide/interceptor.js";

export const addUsers = (data) => {
    return service.request({
        method: 'post',
        baseURL: '/api/addUser',
        data
    })
}

// 批量删除用户信息

export const delSelectUsers = (data) => {
    return service.request({
        method: 'post',
        baseURL: '/api/delSomeUser',
        data
    })
}