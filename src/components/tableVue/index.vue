<template>
    <div>
        <el-table :data="data.tableData" border style="width:100%" @selection-change="handleSelectionChange">
            <el-table-column v-if="data.tableConfg.selection" type="selection" width="45" style="padding-left:15px"></el-table-column>
            <el-table-column v-for="item in data.tableConfg.tableThead" :key="item.typename" :prop="item.type" :label="item.typename"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { reactive, onBeforeMount } from '@vue/composition-api'
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
            tableData:[
                {email:'zhang@qq.com',name:'张凯伦',phone:'13814114898',area:'南京',role:'超管',state:'禁用',operation:'操作'},
                {email:'renbin@qq.com',name:'任斌',phone:'13814114898',area:'南京',role:'超管',state:'禁用',operation:'操作'}
            ]
        })
        // 初始化表格配置数据
        const initTableCfg = ()=>{
            let initTable = props.tableCfg
            // 必须保证父组件中的关键字与子组件关键字值一致，及item一致
            for(let item in initTable) {
                if(item) {
                    data.tableConfg[item] = props.tableCfg[item]
                }
            }
            // data.tableConfg.tableThead = props.tableCfg.tableThead
            // data.tableConfg.selection = props.tableCfg.selection
        }
        onBeforeMount(()=>{
            initTableCfg()
        })
        const handleSelectionChange =()=>{}
        return {
            data,handleSelectionChange
        }
    }
}
</script>

<style lang="scss">
    
</style>