<template>
  <div>
    <el-dialog
      :title="data.title"
      width="630px"
      :close-on-click-modal="cancelClose"
      :visible.sync="dialogVisible"
      @close="close"
      @open="open"
    >
      <el-form :model="data.form" class="labelStyle" ref="addRefForm">
        <el-form-item label="登录名称：" :label-width="data.formLabelWidth" prop="userName">
          <el-input
            v-model="data.form.userName"
            class="addInput"
            placeholder="请输入用户邮箱 ，如1248018887@qq.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：" :label-width="data.formLabelWidth" prop="userEmail">
          <el-input v-model="data.form.userEmail" class="addInput" placeholder="请输入用户邮箱，同上"></el-input>
        </el-form-item>
        <el-form-item label="用户密码：" :label-width="data.formLabelWidth" prop="userPassword">
          <el-input
            type="password"
            v-model="data.form.userPassword"
            class="addInput"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名：" :label-width="data.form.formLabelWidth" prop="realName">
          <el-input v-model="data.form.realName" class="addInput" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户号码：" :label-width="data.form.formLabelWidth" prop="phone">
          <el-input v-model="data.form.phone" class="addInput" placeholder="请输入用户手机号码"></el-input>
        </el-form-item>
        <el-form-item label="地区：" :label-width="data.form.formLabelWidth" prop="cityPickerData">
          <cityPicker ref="clearCityPicker" :cityPickerData.sync="data.form.cityPickerData" />
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="data.form.formLabelWidth">
          <el-radio-group v-model="data.form.radio" @change="roleStatus">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">禁止</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户角色：" :label-width="data.form.formLabelWidth" prop="checkList">
          <el-checkbox-group v-model="data.form.checkList" @change="roleChange" :max="1">
            <el-checkbox label="管理员"></el-checkbox>
            <el-checkbox label="普通用户"></el-checkbox>
            <el-checkbox label="超级管理员"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="danger" size="small" @click="submit" :loading="data.isLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch, refs } from "@vue/composition-api";
import cityPicker from "@c/cityPicker";
import { addUsers ,editUserSubmit } from "@/api/addUser.js";
export default {
  name: "addUserInfo",
  components: { cityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editUser: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { refs, root, emit }) {
    const data = reactive({
      title: "",
      isLoading: false,
      form: {
        radio: "1", //默认选中
        userEmail: "",
        userName: "",
        realName: "",
        userPassword: "",
        phone: null,
        formLabelWidth: "82px",
        checkList: [],
        cityPickerData: {}
      }
    });
    // 清空数据
    const clearData = () => {
      dialogVisible.value = false;
      // data.form.userEmail = ''
      // data.form.phone = null
      // data.form.userPassword = ''
      // data.form.userName = ''
      // data.form.realName = ''
      data.form.cityPickerData = {};
      refs.addRefForm.resetFields();
      clearCityData();
    };

    const dialogVisible = ref(false);
    // 取消点击关闭弹窗属性
    const cancelClose = ref(false);
    watch(() => {
      dialogVisible.value = props.flag;
    });

    const close = () => {
      clearData();
      emit("close", false);
    };

    const cancel = () => {
      clearData();
    };

    const submit = () => {
        if(data.title === '新增用户') {
            newAddUser();
        } else {
            // 编辑用户 调用编辑接口 本版本暂不支持修改密码及地址
            handleEditUser()
        }
    };

    // 编辑用户方法封装
    const handleEditUser = () => {
        data.isLoading = true
        const reqData = {
            username: data.form.userName,
            email: data.form.userEmail,
            phone: data.form.phone,
            role: data.form.checkList[0],
            realname: data.form.realName,
            state: data.form.radio
        }
        editUserSubmit(reqData).then(resp=>{
            if (resp.data.resCode === 0) {
                root.$message({
                    type: "success",
                    message: resp.data.message
                });
                close();
                // 子组件回调父组件方法  用于刷新列表
                emit("addRefData");
                data.isLoading = false
            }
        }).catch(err=>{
            console.log(err);
            close();
            data.isLoading = false
        })
    }
    // 新增用户方法封装
    const newAddUser = () => {
        data.isLoading = true
        // 先处理 地址数据
        const address = JSON.parse(
            JSON.stringify(data.form.cityPickerData.resultDataName)
        );
        const realAddress =
            address.provinceName +
            address.cityName +
            address.areaName +
            address.townName;
        // 先传入目标值 调用addUser接口
        const reqData = {
            username: data.form.userName,
            email: data.form.userEmail,
            password: data.form.userPassword,
            phone: data.form.phone,
            address: realAddress,
            role: data.form.checkList[0],
            realname: data.form.realName,
            state: data.form.radio
        };
        addUsers(reqData)
            .then(resp => {
            if (resp.data.resCode === 0) {
                root.$message({
                type: "success",
                message: resp.data.message
                });
                close();
                // 子组件回调父组件方法  用于刷新列表
                emit("addRefData");
                data.isLoading = false
            }
        })
        .catch(err => {
            console.log(err);
            close();
            data.isLoading = false
        });
    };

    // 用户角色选择变更存值
    const roleChange = val => {
      console.log(val[0]);
    };

    // 用户状态选择变更存值
    const roleStatus = val => {
      // 后台状态是0或1
      console.log(val);
    };
    // 删除cityPicker组件绑定的值
    const clearCityData = () => {
      refs.clearCityPicker.clearPickerCityData();
    };

    // open的回调
    const open = () => {
      let editData = props.editUser;
      // 以phone的值为判断条件 如果有 则为编辑 否则为新增
      if (editData.phone) {
        data.title = "编辑用户";
        data.form.userEmail = editData.email;
        data.form.phone = editData.phone;
        data.form.userName = editData.email;
        data.form.realName = editData.realname;
        data.form.radio = editData.state;
        data.form.checkList = editData.role.split(",");
      } else {
        data.title = "新增用户";
      }
    };
    return {
      dialogVisible,
      close,
      data,
      cancelClose,
      cancel,
      submit,
      roleChange,
      roleStatus,
      clearData,
      clearCityData,
      open,
      newAddUser,
      handleEditUser
    };
  }
};
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