<template>
    <div>
        <el-dialog title="新增用户" width="630px" :close-on-click-modal="cancelClose" :visible.sync="dialogVisible" @close="close">
            <el-form :model="data.form" class="labelStyle">
                <el-form-item label="用户邮箱：" :label-width="data.formLabelWidth" >
                    <el-input v-model="data.form.userEmail" class="addInput" placeholder="请输入用户邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户密码：" :label-width="data.formLabelWidth" >
                    <el-input type="password" v-model="data.form.userPassword" class="addInput" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名：" :label-width="data.form.formLabelWidth" >
                    <el-input v-model="data.form.userName" class="addInput" placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户号码：" :label-width="data.form.formLabelWidth" >
                    <el-input v-model="data.form.phone" class="addInput" placeholder="请输入用户手机号码"></el-input>
                </el-form-item>
                <el-form-item label="地区：" :label-width="data.form.formLabelWidth" prop="ddd">
                    <cityPicker :cityPickerData.sync="data.form.cityPickerData"/>
                </el-form-item>
                <el-form-item label="是否启用：" :label-width="data.form.formLabelWidth" >
                    <el-radio-group v-model="data.form.radio" @change="roleStatus">
                        <el-radio  label="0">启用</el-radio>
                        <el-radio  label="1">禁止</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户角色：" :label-width="data.form.formLabelWidth" >
                    <el-checkbox-group v-model="data.form.checkList" @change="roleChange" :max="1">
                        <el-checkbox label="管理员"></el-checkbox>
                        <el-checkbox label="普通用户"></el-checkbox>
                        <el-checkbox label="超级管理员"></el-checkbox>
                    </el-checkbox-group>
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
import cityPicker from '@c/cityPicker'
import { addUsers } from "@/api/addUser.js"
export default {
    name:'addUserInfo',
    components:{cityPicker},
    props:{
        flag:{
            type:Boolean,
            default:false
        }
    },
    setup(props,{refs,root,emit}){
        const data = reactive({
            form:{
                radio:'1',//默认选中
                userEmail:'',
                userName:'',
                userPassword: '',
                phone:null,
                formLabelWidth:'82px',
                checkList:[],
                cityPickerData:{}
            }
        })
        // 清空数据
        const clearData = () =>{
            dialogVisible.value = false
            data.form.userEmail = ''
            data.form.phone = null
            data.form.userPassword = ''
            data.form.userName = ''
            data.form.cityPickerData = {}
        }

        const dialogVisible = ref(false)
        // 取消点击关闭弹窗属性
        const cancelClose = ref(false)
        watch(()=>{
            dialogVisible.value = props.flag
        })
        
        const close = ()=>{
            clearData()
            emit("close",false)
        }

        const cancel = ()=>{
            console.log(data.form.cityPickerData) //  6-24 将设置的值传给接口入库
            return false
            clearData()
        }

        const submit = ()=>{
            // 先传入目标值 调用addUser接口
            const reqData = {
                username : data.form.userName,
                email : data.form.userEmail,
                password : data.form.userPassword,
                phone : data.form.phone,
                address : data.form.cityPickerData,
                role : data.form.userName,
                realname : data.form.userName,
                state : data.form.userName,
            }
            clearData()
        }
        // 用户角色选择变更存值
        const roleChange = (val) => {
            console.log(val[0])
        }

        // 用户状态选择变更存值
        const roleStatus =(val) =>{
            // 后台状态是0或1
            console.log(val)
        }
        return {
            dialogVisible,close,data,cancelClose,cancel,submit,roleChange,roleStatus,clearData
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
    label.el-radio {
        padding-right: 100px;
    }
    label.el-checkbox {
        margin-right: 50px;
    }
}
</style>