<template>
    <div>
        <el-table :data="data.tableData" border style="width:100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="45" style="padding-left:15px"></el-table-column>
            <el-table-column prop="email" label="邮箱/用户名"></el-table-column>
            <el-table-column prop="name" label="真是姓名"></el-table-column>
            <el-table-column prop="name" label="手机号"></el-table-column>
            <el-table-column prop="name" label="地区"></el-table-column>
            <el-table-column prop="name" label="角色"></el-table-column>
            <el-table-column prop="name" label="禁用状态"></el-table-column>
            <el-table-column prop="name" label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
    name: 'tableVue',
    setup(props,{root}) {
        const data = reactive({
            tableData:[
                {email:'zhang@qq.com',name:'zkl'}
            ]
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