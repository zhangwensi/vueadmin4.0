<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="category">
          <label>关键字：</label>
          <el-row :gutter="16">
            <el-col :span="3">
              <selectCp :choseData="data.configOption" :currentSelect.sync ="data.currentSelectType" />
              <!-- <el-select v-model="data.slectData">
                <el-option v-for="item in data.selectValue" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>-->
            </el-col>
            <el-col :span="6">
              <el-input v-model="serach" placeholder="请输入搜索条件"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" @click="handleRcover">回到第一页</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="handleAdd">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="min-height:30px"></div>
    <tableVue ref="tableRefsh" :tableCfg="data.tableConfig" :tableData.sync="data.tableBatchData">
      <template v-slot:state="slotDate">
        <el-switch
          @change="userSwitch(slotDate.data)"
          active-color="#13ce66"
          v-model="slotDate.data.state"
          inactive-value="1"
          active-value="0"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <!-- slotDate.data的data为插槽中的绑定的data数据 -->
      <template v-slot:operation="slotDate">
        <el-button size="mini" type="danger" @click="deleUser(slotDate.data)">删除</el-button>
        <el-button size="mini" type="success" @click="editUser(slotDate.data)">编辑</el-button>
      </template>
      <template v-slot:tableLeftButton>
        <el-button size="small" @click="batchData()">批量删除</el-button>
      </template>
    </tableVue>
    <!-- dialog -->
    <DialogUser :flag="dialogVisible" :editUser="data.editUserData" @close="diaClose" @addRefData="refshData"></DialogUser>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl.js";
import { delSelectUsers,changSwitch } from "@/api/addUser.js";
import selectCp from "@c/select";
import tableVue from "@c/tableVue";
import DialogUser from "./Dialog/addUserInfo.vue";
export default {
  name: "userInfo",
  components: { selectCp, tableVue, DialogUser },
  setup(props, { root, refs }) {
    const data = reactive({
      configOption: ["realname", "phone", "email"],
      // 当前搜索功能类型
      currentSelectType:'',
      editUserData: {},
      // 批量删除的数据
      tableBatchData: {
        type: "tableLeftButton",
        typename: "批量删除",
        isSlot: "slot",
        slotType: "tableLeftButton"
      },
      // 设置状态变更开关
      userStateChang: false,
      // 表格配置参数
      tableConfig: {
        // 配置选择框是否展示
        selection: true,
        // 表头
        tableThead: [
          {
            type: "email",
            typename: "邮箱/用户名"
          },
          {
            type: "realname",
            typename: "真实姓名"
          },
          {
            type: "phone",
            typename: "手机号码"
          },
          {
            type: "address",
            typename: "地区"
          },
          {
            type: "role",
            typename: "角色"
          },
          {
            type: "state",
            typename: "禁用状态",
            isSlot: "slot",
            slotType: "state"
          },
          {
            type: "operation",
            typename: "操作",
            isSlot: "slot",
            slotType: "operation"
          }
        ],
        // 配置表格请求接口
        requestUrl: {
          methods: "post",
          requestUrl: requestUrl.getUser,
          data: ""
        }
      }
    });
    // 弹窗默认不显示
    const dialogVisible = ref(false);
    const hasSubmit = ref(false);
    const serach = ref("");
    const deleUser = params => {
      // 因后台接口与批量删除接口一致，需将传入的数据格式转换成对象形式
      var reqData = JSON.parse(JSON.stringify(params));
      root
        .$confirm("此操作将永久删除选中的记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          delSelectUsers(reqData)
            .then(res => {
              console.log(res);
              const resData = res.data;
              if (resData.resCode === 0) {
                root.$message({
                  type: "success",
                  message: resData.message
                });
                // 重新请求用户列表
                refshData();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    };
    const editUser = params => {
      dialogVisible.value = true
      data.editUserData = Object.assign({},params)
    };
    // 关闭弹窗 父组件close与dialog中的emit中的close对应
    const diaClose = () => {
      dialogVisible.value = false;
      console.log(data.currentSelectType)
      console.log(serach.value)
    };
    // 刷新数据
    const refshData = () => {
      refs.tableRefsh.tableUserRefsh();
    };
    // 批量删除
    const batchData = () => {
      // 先判断 是否有选中数据
      const reqDate = data.tableBatchData;
      if (reqDate.phone.length > 0) {
        // 先提示删除不可逆
        root
          .$confirm("此操作将永久删除选中的记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            delSelectUsers(reqDate)
              .then(res => {
                const resData = res.data;
                if (resData.resCode === 0) {
                  root.$message({
                    type: "success",
                    message: resData.message
                  });
                  // 重新请求用户列表
                  refshData();
                }
              })
              .catch(err => {});
          })
          .catch(() => {
            root.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        root.$message.error("您还未选中数据！");
      }
    };
    // 变更用户状态
    const userSwitch = (params) => {
      // 设置开关
      if (data.userStateChang) { return false }
      // 使用深拷贝避免直接改变原数组的数值
      data.userStateChang = !data.userStateChang
      const reqData = {
        phone: Object.assign(params).phone,
        state: Object.assign(params).state
      }
      // 发起请求
      changSwitch(reqData).then(resp=>{
        root.$message({
          type:'success',
          message:resp.data.message
        })
        data.userStateChang = !data.userStateChang
      }).catch(err=>{
        console.log(err)
        data.userStateChang = !data.userStateChang
      })
    }

    // 新增用户 
    const handleAdd = () => {
       dialogVisible.value = true
       data.editUserData = {}
    }
    // 搜索功能
    const handleSearch = () => {
        refs.tableRefsh.searchRefsh({type:data.currentSelectType,value:serach.value})
    }

    // 用于搜索后恢复表格数据功能
    const handleRcover = () => {
      refs.tableRefsh.tableUserRefsh();
    }

    return {
      data,
      deleUser,
      editUser,
      dialogVisible,
      diaClose,
      serach,
      batchData,
      refshData,
      userSwitch,
      handleAdd,
      handleSearch,handleRcover
    };
  }
};
</script>

<style lang="scss" scoped>
.category {
  @include labelDom(left, 60, 40);
}
</style>
