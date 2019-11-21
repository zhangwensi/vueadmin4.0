<template>
    <div class="login">
        <div class="login-wrap">
            <ul class="navTab">
                <li :class="{'current':item.current}" v-for="item in navTab" :key="item.id" @click="bkShow(item)">{{item.name}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="login-form">
                <el-form-item prop="pass" class="item-form">
                    <label>账户</label>
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="age" class="item-form">
                    <label>验证码</label>
                    <el-input v-model.number="ruleForm2.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm2')" class="block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data(){
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
                } else {
                if (value < 18) {
                    callback(new Error('必须年满18岁'));
                } else {
                    callback();
                }
                }
            }, 1000)
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            navTab: [
                {name:'登录',type:'login',current:true},
                {name:'注册',type:'register',current:false}
            ],
            ruleForm2: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        bkShow(data){
            this.navTab.forEach(elem=>{
                elem.current = false
            })
            data.current = true
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        margin-top: 10px;
        width: 100%;
        display: block;
        font-size: 14px;
        line-height: 28px;
    }
}
</style>