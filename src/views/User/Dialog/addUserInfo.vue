<template>
    <div>
        <el-dialog title="新增用户" width="630px" :close-on-click-modal="cancelClose" :visible.sync="dialogVisible" @close="close">
            <el-form :model="form" class="labelStyle">
                <el-form-item label="用户邮箱：" :label-width="form.formLabelWidth" >
                    <el-input type="text" v-model="form.userEmail" class="addInput" placeholder="请输入用户邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名：" :label-width="form.formLabelWidth" >
                    <el-input type="text" v-model="form.userName" class="addInput" placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户号码：" :label-width="form.formLabelWidth" >
                    <el-input type="text" v-model="form.phone" class="addInput" placeholder="请输入用户手机号码"></el-input>
                </el-form-item>
                <el-form-item label="地区：" :label-width="form.formLabelWidth" >
                    <div class="userArea">
                        <el-row :gutter="2">
                            <el-col :span="6">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button type="danger" size="small" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {reactive,ref,watch} from "@vue/composition-api"
export default {
    name:'addUserInfo',
    props:{
        flag:{
            type:Boolean,
            default:false
        }
    },
    setup(props,{refs,root,emit}){
        const form = reactive({
            userEmail:'',
            userName:'',
            phone:null,
            region:{
                item:[],
            },
            formLabelWidth:'82px'
        })

        const dialogVisible = ref(false)
        // 取消点击关闭弹窗属性
        const cancelClose = ref(false)
        watch(()=>{
            dialogVisible.value = props.flag
        })
        
        const close = ()=>{
            dialogVisible.value = false
            emit("close",false)
        }

        const cancel = ()=>{
            dialogVisible.value = false
            form.region = {}
            form.userEmail = ''
            form.phone = null
            form.userName = ''
        }

        const submit = ()=>{
            dialogVisible.value = false
            form.region = {}
            form.userEmail = ''
            form.phone = null
            form.userName = ''
        }
        return {
            dialogVisible,close,form,cancelClose,cancel,submit
        }
    }
}
</script>

<style lang="scss" scoped>
.labelStyle {
    .addInput {
        width: 454px;
    }
    .userArea {
        overflow: hidden;
    }
}
.el-form-item {
        &.el-form-item__label {
            text-align: right !important;
        }
    }
</style>