import { getUserInfo } from '@/api/getUserInfo.js'
import {reactive} from "@vue/composition-api"
export function common(){
    // 初始化数据
    const tableData = reactive({
        item:[],
        total:0
    })
    // 获取用户信息表格数据
    const getTableData = (params) =>{
        params.loadData.value = true
        let reqData = {
            requestUrl:params.reqData.requestUrl,
            methods:params.reqData.methods,
            data:params.reqPage
        }
        getUserInfo(reqData).then(resp=>{
            let respData = resp.data
            tableData.item = respData.data
            tableData.total = respData.total.cnt
            params.loadData.value = false
            emit("update:tableDataFlash",false)
        })
        .catch(err=>{
            console.log(err)
            params.loadData.value = false
        })
    }
    return {
        tableData,getTableData
    }
}