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
