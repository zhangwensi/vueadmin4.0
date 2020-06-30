<template>
    <div class="userInfo">
        <el-table :data="data.tableData" border style="width:100%" @selection-change="handleSelectionChange" v-loading="loadData">
            <el-table-column v-if="data.tableConfg.selection" type="selection" width="45" style="padding-left:15px"></el-table-column>
            <template v-for="item in data.tableConfg.tableThead">
                <!-- 判读是否为插槽 -->
                <el-table-column :key="item.typename" v-if="item.isSlot  === 'slot'" :prop="item.type" :label="item.typename">
                    <template slot-scope="scope">
                        <slot :name="item.slotType" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- 普通文本类数据 -->
                <el-table-column :key="item.typename" :prop="item.type" :label="item.typename" v-else></el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <div class="table-footer">
            <el-row class="footer-box">
                <el-col :span="4">
                    <slot name="tableLeftButton"></slot>
                </el-col>
                <el-col :span="20" class="userInfo-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="data.pageSizeData.currentPage"
                        :page-sizes="data.pageSizeData.pageSizes"
                        :page-size="data.pageSizeData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="data.pageSizeData.total">
                    </el-pagination>
                </el-col>
            </el-row> 
        </div>
    </div>
</template>

<script>
import { reactive,ref, onBeforeMount, onMounted,watch } from '@vue/composition-api'
import {common} from './tableGetData.js'
import {pageHook} from './paginationPage.js'
export default {
    name: 'tableVue',
    props:{
        tableCfg:{
            type:Object,
            default:()=>{}
        },
        tableData:{ 
            type:Object,
            default:()=>{}
        }
    },
    setup(props,{root,emit}) {
        const data = reactive({
            tableConfg:{
                tableThead:[],
                selection:true
            },
            tableData:[],
            requestData:{},
            pageSizeData:{
                currentPage:1,
                pageSizes:[10, 20, 30, 50],
                pageSize:10,
                total:50
            }
        })
        const { tableData,getTableData } =common()
        const {pageSizeData,getUserListData,getCurrentUaer,respData1} =pageHook()
        const loadData = ref(false)
        // 初始化表格配置数据
        const initTableCfg = ()=>{
            let initTable = props.tableCfg
            let keys = Object.keys(initTable) //保证关键字能一一对应
            // 必须保证父组件中的关键字与子组件关键字值一致，及item一致
            for(let item in initTable) {
                if(keys.includes(item)) {
                    data.tableConfg[item] = props.tableCfg[item]
                }
            }
            data.requestData = props.tableCfg.requestUrl
            // data.tableConfg.tableThead = props.tableCfg.tableThead
            // data.tableConfg.selection = props.tableCfg.selection
        }
        // 获取用户信息列表
        const getUserData = () =>{
            let reqData = data.requestData
            let reqPage = data.pageSizeData
            getTableData({reqData,reqPage,loadData})
            // loadData.value = true
            // let reqData = data.requestData
            // getUserInfo(reqData).then(response=>{
            //     let respData = response.data.data
            //     data.tableData = respData
            //     loadData.value = false
            // }).catch(err=>{
            //     $message({
            //         message:'获取数据失败',
            //         type:'danger'
            //     })
            //     loadData.value = false
            // })
        }
        // watch(()=>tableData.item,(newValue,oldValue)=>{
        //     data.tableData = newValue
        // })
        watch([
            ()=>{tableData.item},
            ()=>{tableData.total}
        ],([item,total])=>{
            data.tableData = tableData.item 
            data.pageSizeData.total = tableData.total
        })

        watch(()=>respData1.item,(newValue,oldValue)=>{
            data.tableData = newValue
        })
        onBeforeMount(()=>{
            initTableCfg()
        })
        onMounted(()=>{
            getUserData()
        })
        const handleSelectionChange =(val)=>{
            let rowData = {
                phone: val.map(item=>item.phone)
            }
            emit("update:tableData",rowData)
        }
        const handleSizeChange =(val)=>{
            data.pageSizeData.pageSize = val
            let reqData = data.requestData
            let reqPage = data.pageSizeData
            getUserListData({reqData,reqPage,loadData})
        }
        const handleCurrentChange =(val)=>{
            data.pageSizeData.currentPage = val
            let reqData = data.requestData
            let reqPage = data.pageSizeData
            getCurrentUaer({reqData,reqPage,loadData})
        }
        return {
            data,loadData,handleSelectionChange,getUserData,handleSizeChange,handleCurrentChange
        }
    }
}
</script>

<style lang="scss">
    .userInfo{
        .footer-box {
            margin-top: 20px;
        }
        .userInfo-page {
            text-align: right;
        }
    }
</style>