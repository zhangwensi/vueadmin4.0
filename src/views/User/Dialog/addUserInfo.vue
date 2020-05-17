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
                <el-form-item label="地区：" :label-width="form.formLabelWidth" prop="ddd">
                    <cityPicker :cityPickerData.sync="form.cityPickerData"/>
                </el-form-item>
                <el-form-item label="是否启用：" :label-width="form.formLabelWidth" >
                    <el-radio-group v-model="form.radio" @change="roleStatus">
                        <el-radio  label="0">启用</el-radio>
                        <el-radio  label="1">禁止</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户角色：" :label-width="form.formLabelWidth" >
                    <el-checkbox-group v-model="form.checkList" @change="roleChange" :max="1">
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
        const form = reactive({
            radio:'1',//默认选中
            userEmail:'',
            userName:'',
            phone:null,
            formLabelWidth:'82px',
            checkList:[],
            cityPickerData:{}
        })

        const dialogVisible = ref(false)
        // 取消点击关闭弹窗属性
        const cancelClose = ref(false)
        watch(()=>{
            dialogVisible.value = props.flag
        })
        
        const close = ()=>{
            dialogVisible.value = false
            // 清空dialog中所有数据
            form.userEmail = ''
            form.userName = ''
            form.phone = null
            // 清空selection时需要向下传递一个空对象
            form.cityPickerData = {}
            emit("close",false)
        }

        const cancel = ()=>{
            dialogVisible.value = false
            form.userEmail = ''
            form.phone = null
            form.userName = ''
            form.cityPickerData = {}
        }

        const submit = ()=>{
            // 先传入目标值 调用addUser接口

            dialogVisible.value = false
            form.userEmail = ''
            form.phone = null
            form.userName = ''
            form.cityPickerData = {}
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
            dialogVisible,close,form,cancelClose,cancel,submit,roleChange,roleStatus
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