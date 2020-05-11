<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="category">
          <label>关键字：</label>
          <el-row :gutter="16">
            <el-col :span="3">
              <selectCp :choseData.sync="data.configOption" />
              <!-- <el-select v-model="data.slectData">
                <el-option v-for="item in data.selectValue" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select> -->
            </el-col>
            <el-col :span="6">
              <el-input v-model="serach" placeholder="请输入搜索条件"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="dialogVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="min-height:30px"></div>
    <tableVue :tableCfg="data.tableConfig">
      <template v-slot:state="slotDate">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <!-- slotDate.data的data为插槽中的绑定的data数据 -->
      <template v-slot:operation="slotDate">
        <el-button size="mini" type="danger" @click="deleUser(slotDate.data)">删除</el-button>
        <el-button size="mini" type="success" @click="editUser(slotDate.data)">编辑</el-button>
      </template>
    </tableVue>
    <!-- dialog -->
    <DialogUser 
    :flag="dialogVisible"
    @close="diaClose"></DialogUser>
  </div>
</template>
<script>
import { reactive ,ref} from "@vue/composition-api";
import {requestUrl} from "@/api/requestUrl.js"
import selectCp from "@c/select"
import tableVue from "@c/tableVue"
import DialogUser from "./Dialog/addUserInfo.vue"
export default {
  name: "userInfo",
  components:{selectCp ,tableVue,DialogUser},
  setup(props, { root }) {
    const data = reactive({
      configOption:['name','phone','email'],
      // 表格配置参数
      tableConfig:{
        // 配置选择框是否展示
        selection:true,
        // 表头
        tableThead:[
          {
            type:'email',
            typename:'邮箱/用户名'
          },
          {
            type:'realname',
            typename:'真实姓名'
          },
          {
            type:'phone',
            typename:'手机号码'
          },
          {
            type:'address',
            typename:'地区'
          },
          {
            type:'role',
            typename:'角色'
          },
          {
            type:'state',
            typename:'禁用状态',
            isSlot:'slot',
            slotType:'state'
          },
          {
            type:'operation',
            typename:'操作',
            isSlot:'slot',
            slotType:'operation'
          }
        ],
        // 配置表格请求接口
        requestUrl:{
          methods:'post',
          requestUrl:requestUrl.getUser
        }
      },
    });
    // 弹窗默认不显示
    const dialogVisible = ref(false)
    const serach = ref('')
    const deleUser=(params)=>{
      console.log(params)
    }
    const editUser=(params)=>{
      console.log(params)
    }
    // 关闭弹窗 父组件close与dialog中的emit中的close对应
    const diaClose = ()=>{
      dialogVisible.value = false
    }
    return {
      data,deleUser,editUser,dialogVisible,diaClose,serach
    };
  }
};
</script>

<style lang="scss" scoped>
.category {
  @include labelDom(left, 60, 40);
}
</style>
