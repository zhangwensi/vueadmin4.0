import service from "@/guide/interceptor.js";

export const addUsers = (data) => {
    return service.request({
        mothd:'post',
        baseURL: '/api/addUser',
        data
    })
}
