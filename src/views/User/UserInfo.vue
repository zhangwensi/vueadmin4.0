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
              <el-input></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="danger">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import selectCp from "@c/select"
export default {
  name: "userInfo",
  components:{selectCp},
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
