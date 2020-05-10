import {reactive} from '@vue/composition-api'
import { getUserInfo } from '@/api/getUserInfo.js'
export function pageHook(){
    // 总页数
    const pageSizeData = reactive({
        total:null,
        currentPage:null,
        pageSize:null,
    })
    const respData1 = reactive({
        item:[]
    })
    // 改变显示条数获取用户列表数据
    const getUserListData = (params) =>{
        params.loadData.value = true
        let reqData = {
            requestUrl:params.reqData.requestUrl,
            methods:params.reqData.methods,
            data:params.reqPage
        }
        pageSizeData.currentPage = params.reqPage.currentPage
        pageSizeData.pageSize = params.reqPage.pageSize
        getUserInfo(reqData).then(response=>{
            let respData = response.data
            respData1.item = respData.data
            pageSizeData.total = respData.total.cnt
            params.loadData.value = false
        }).catch(err=>{
            console.log(err)
            params.loadData.value = false
        })
    }
    // 改变当前页数获取用户列表数据
    const getCurrentUaer = (params) =>{
        params.loadData.value = true
        let reqData = {
            requestUrl:params.reqData.requestUrl,
            methods:params.reqData.methods,
            data:params.reqPage
        }
        pageSizeData.currentPage = params.reqPage.currentPage
        pageSizeData.pageSize = params.reqPage.pageSize
        getUserInfo(reqData).then(response=>{
            let respData = response.data
            respData1.item = respData.data
            pageSizeData.total = respData.total.cnt
            params.loadData.value = false
        }).catch(err=>{
            console.log(err)
            params.loadData.value = false
        })
    }
    return {
        pageSizeData,
        respData1,
        getUserListData,
        getCurrentUaer
    }
}