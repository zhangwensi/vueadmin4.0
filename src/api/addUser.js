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

// 变更用户状态

export const changSwitch = (data) =>{
    return service.request({
        method:'post',
        baseURL:'/api/userState',
        data
    })
}

// 编辑时调用接口

export const editUser = (data) => {
    return service.request({
        method:'post',
        baseURL:'/api/editUserApi',
        data
    })
}

// 提交编辑好的用户资料给后台接口
export const editUserSubmit = (data) => {
    return service.request({
        method:'post',
        baseURL:'/api/submitUserEdit',
        data
    })
}