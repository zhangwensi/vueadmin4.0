<template>
    <div>
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
    </div>
</template>

<script>
import { reactive,ref, onBeforeMount, onMounted } from '@vue/composition-api'
import { getUserInfo } from '@/api/getUserInfo.js'
export default {
    name: 'tableVue',
    props:{
        tableCfg:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props,{root}) {
        const data = reactive({
            tableConfg:{
                tableThead:[],
                selection:true
            },
            tableData:[],
            requestData:{}
        })
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
            loadData.value = true
            let reqData = data.requestData
            getUserInfo(reqData).then(response=>{
                let respData = response.data.data
                data.tableData = respData
                loadData.value = false
            }).catch(err=>{
                $message({
                    message:'获取数据失败',
                    type:'danger'
                })
                loadData.value = false
            })
        }
        onBeforeMount(()=>{
            initTableCfg()
        })
        onMounted(()=>{
            getUserData()
        })
        const handleSelectionChange =()=>{}
        return {
            data,loadData,handleSelectionChange,getUserData
        }
    }
}
</script>

<style lang="scss">
    
</style>