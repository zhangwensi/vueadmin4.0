<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="navTab">
        <li
          :class="{ current: item.current }"
          v-for="item in navTab"
          :key="item.id"
          @click="bkShow(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="formName"
        class="login-form"
      >
        <el-form-item prop="email" class="item-form">
          <label for="useremail">邮箱</label>
          <el-input
            id="useremail"
            type="text"
            v-model="ruleForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- 注册页面的二次密码确认 -->
        <el-form-item
          prop="password2"
          class="item-form"
          v-if="model === 'register'"
        >
          <label for="password2">请再次输入密码</label>
          <el-input
            id="password2"
            type="password"
            v-model="ruleForm.password2"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-input
                id="code"
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="12"
              ><el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="buttonStatus.buttonStatu"
                >{{ buttonStatus.buttonContext }}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('formName')"
            class="btn-login block"
            :disabled="btnDis"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms, Register } from "@/api/login.js";
import { Message } from "element-ui";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { validEmail, validPass } from "@/guide/check.js";
import { mapState , mapMutations ,mapActions } from 'vuex';
export default {
  name: "login",
  // setup(props,context) {
  setup(props, { refs, root }) {
    // 用户名验证
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validEmail(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 登录页面密码验证
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validPass(value)) {
        callback("密码不正确，请输入6至15位区分大小写包含特殊字符的密码");
      } else {
        callback();
      }
    };
    // 验证码验证
    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入6位验证码"));
        } else {
          callback();
        }
      }, 1000);
    };
    // 再次确认密码
    let checkPass2 = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      value = ruleForm.password2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const navTab = reactive([
      { name: "登录", type: "login", current: true },
      { name: "注册", type: "register", current: false }
    ]);
    // 模型
    const model = ref("login");
    // 按钮默认disabled
    const btnDis = ref(true);
    // 设置倒计时
    const timer = ref(null);
    // 验证参数
    const ruleForm = reactive({
      email: "",
      password: "",
      password2: "",
      code: ""
    });
    // 验证规则
    const rules = reactive({
      email: [{ validator: checkEmail, trigger: "blur" }],
      password: [{ validator: checkPass, trigger: "blur" }],
      password2: [{ validator: checkPass2, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    // 验证码参数
    const buttonStatus = reactive({
      buttonStatu: false,
      buttonContext: "获取验证码"
    });
    // 注册登录按钮高光
    const bkShow = data => {
      navTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      // 重置表单内容(json的2种写法择一)
      refs["formName"].resetFields();
      // refs.ruleForm.resetFields()
      // 点击注册/登录按钮时 如果定时器有则先停定时器 按钮恢复为获取验证码状态
      clearInterval(timer.value);
      buttonStatus.buttonStatu = false;
      buttonStatus.buttonContext = "获取验证码";
    };
    // 登录验证
    const submitForm = (formName => {
      refs[formName].validate(valid => {
        if (valid) {
          // 注册部分************************************
          // 后期需增加加密插件
          if (model.value === "register") {
            let requestData = {
              username: ruleForm.email,
              password: ruleForm.password,
              code: ruleForm.code
            }
            Register(requestData)
              .then(response => {
                let data = response.data;
                root.$message({
                  message: data.message,
                  type: "success"
                })
                // 注册成功后自动跳转至登录状态
                bkShow(navTab[0]);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 登录部分************************************
            let requestData = {
              username: ruleForm.email,
              password: ruleForm.password
            }
            root.$store.dispatch('app/userLogin',requestData).then(response => {
                const data = response.data;
                root.$message({
                  message: data.message,
                  type: "success"
                });
                // console.log(data);
                root.$router.push("/home");
              })
              .catch(err => {
                console.log('报错了')
                console.log(err);
              })
          }
        } else {
          root.$message({
            showClose: true,
            message: "参数不全，提交失败",
            type: "error"
          });
          clearInterval(timer.value);
          buttonStatus.buttonStatu = false;
          buttonStatus.buttonContext = "获取验证码";
          return false;
        }
      });
    });
    // 获取验证码
    const getSms = () => {
      let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
      // 先判断获取验证码之前的邮箱是否为空，如为空则弹出提示，函数不再继续执行
      if (ruleForm.email == "") {
        root.$message({
          showClose: true,
          message: "邮箱不能为空哦",
          type: "error"
        });
        return false;
      }
      if (!reg.test(ruleForm.email)) {
        root.$message({
          showClose: true,
          message: "邮箱格式有误",
          type: "error"
        });
        return false;
      }
      // 将获取验证码字段变为发送中并将该按钮置位禁用状态
      buttonStatus.buttonStatu = true;
      buttonStatus.buttonContext = "发送中";
      // 模拟网络请求延迟
      setTimeout(() => {
        GetSms({
          username: ruleForm.email,
          mode: model.value
        })
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            // 启用登录/注册按钮
            btnDis.value = false;
            // 倒计时  调用定时器
            timeDown(60);
          })
          .catch(err => {
            console.log(err);
          });
      }, 3000);
      // 如前端未处理邮箱是否为空，则调用以下方法
      // getSms(userName).then(response=>{
      //     console.log(response)
      // }).catch(error=>{
      //     console.log(error)
      // })
    };

    // 定时器函数
    const timeDown = number => {
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          buttonStatus.buttonStatu = false;
          buttonStatus.buttonContext = "再次获取";
        } else {
          buttonStatus.buttonContext = `倒计时${time}秒`;
        }
      }, 1000);
    };
    // VUE3.0语法要求把定义的变量、函数返回
    return {
      navTab,
      model,
      ruleForm,
      rules,
      bkShow,
      submitForm,
      getSms,
      btnDis,
      buttonStatus
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./src/styles/main.scss";
.login {
  background: #344a5f;
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
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
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
