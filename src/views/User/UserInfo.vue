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
              <el-input placeholder="请输入搜索条件"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="min-height:30px"></div>
    <tableVue :tableCfg="data.tableConfig"/>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import selectCp from "@c/select"
import tableVue from "@c/tableVue"
export default {
  name: "userInfo",
  components:{selectCp ,tableVue},
  setup(props, { root }) {
    const data = reactive({
      configOption:['name','phone','email'],
      // 表格配置参数
      tableConfig:{
        // 配置选择框是否展示
        selection:false,
        // 表头
        tableThead:[
          {
            type:'email',
            typename:'邮箱/用户名'
          },
          {
            type:'name',
            typename:'真实姓名'
          },
          {
            type:'phone',
            typename:'手机号码'
          },
          {
            type:'area',
            typename:'地区'
          },
          {
            type:'role',
            typename:'角色'
          },
          {
            type:'state',
            typename:'禁用状态'
          },
          {
            type:'operation',
            typename:'操作'
          }
        ]
      },
    });
    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
.category {
  @include labelDom(left, 60, 40);
}
</style>
