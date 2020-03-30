import service from "@/guide/interceptor.js";

/* 
*添加一级分类
*/
 export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        baseURL: "/api/news/AddFirstCategory",
        data
    });
}
// 获取一级分类

export function GetFirstCategory(data) {
    return service.request({
        method: "post",
        baseURL: "/api/news/GetFirstCategory",
        data
    })
}
/*
*删除一级分类
*/

export function DeletFirstCategory(data) {
    return service.request({
        method: "post",
        baseURL: '/api/news/DeletFirstCategory',
        data
    })
}

/*
 * 编辑一级分类
 */ 

export function EditFirstCategory(data) {
    return service.request({
        method: "post",
        baseURL: "api/news/EditFirstCategory",
        data
    })
}

/**
 * 添加信息
 *
 */
export function Addnews(data) {
    return service.request({
        method:"post",
        baseURL:"api/news/Addnews",
        data
    })
}

// 获取信息列表
export function GetList(data) {
    return service.request({
        method:"post",
        baseURL: 'api/getList',
        data
    })
}
// 删除列表信息
export function DeletList(data) {
    return service.request({
        method:"post",
        baseURL:"api/deletList",
        data
    })
}