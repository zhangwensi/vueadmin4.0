<template>
    <div class="login">
        <div class="login-wrap">
            <ul class="navTab">
                <li :class="{'current':item.current}" v-for="item in navTab" :key="item.id" @click="bkShow(item)">{{item.name}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
                <el-form-item prop="email" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <!-- 注册页面的二次密码确认 -->
                <el-form-item prop="password2" class="item-form" v-if="model === 'register'">
                    <label>请再次输入密码</label>
                    <el-input type="password" v-model="ruleForm.password2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="12"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="12"><el-button type="success" class="block">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="btn-login block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { reactive, ref} from '@vue/composition-api'
import { checkEmail, checkPass, checkCode, checkPass2} from '@/guide/check.js'
export default {
    name: 'login',
    setup(props,context) {
        const navTab = reactive([
            {name:'登录',type:'login',current:true},
            {name:'注册',type:'register',current:false}
        ])
        const model = ref('')
        const ruleForm = reactive({
            email: '',
            password: '',
            password2: '',
            code: ''
        })
        const rules = reactive({
            email: [
                    { validator: checkEmail, trigger: 'blur' }
                ],
                password: [
                    { validator: checkPass, trigger: 'blur' }
                ],
                password2: [
                    {validator: checkPass2, trigger: 'blur'}
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
        })
        const bkShow = (data =>{
            navTab.forEach(elem=>{
                elem.current = false
            })
            data.current = true
            model.value = data.type
        })
        const submitForm = (formName =>{
            context.refs[formName].validate((valid) => {
                if (valid) {
                        alert('登录成功');
                    } else {
                        console.log('登录失败');
                        return false;
                    }
                })
        })
        return {
            navTab,
            model,
            ruleForm,
            rules,
            bkShow,
            submitForm
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    background: #344a5f;;
    height: 100vh;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.navTab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current {
        background-color: rgba(0, 0,0,0.1);
    }
}
.login-form {
    margin-top: 29px;
    label{
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .item-form {
        margin-bottom: 13px;
    }
    .block {
        width: 100%;
        display: block;
        font-size: 14px;
        height: 40px;
    }
    .btn-login {
        margin-top: 19px;
    }
}
</style>