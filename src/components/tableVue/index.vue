<template>
    <div>
        <el-table :data="data.tableData" border style="width:100%" @selection-change="handleSelectionChange">
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
                requsetUrl:'',
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
            let keys = Object.keys(initTable) //保证关键字能一一对应
            // 必须保证父组件中的关键字与子组件关键字值一致，及item一致
            for(let item in initTable) {
                if(keys.includes(item)) {
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