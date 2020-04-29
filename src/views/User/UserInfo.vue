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
    <tableVue/>
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
      configOption:['name','phone','email']
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
