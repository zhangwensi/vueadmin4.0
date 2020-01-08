<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-row :gutter="16">
        <el-col :span=4>
          <div class="select-wrap category">
            <label for="">类型:</label>
            <div class="wrap-content">
              <el-select v-model="selectKey" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="select-wrap data">
            <label for=""><span>日期:</span></label>
            <div class="wrap-content">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']" style="width:100%;">
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span=4>
          <div class="select-wrap keywords">
            <label for=""><span>关键字:</span></label>
            <div class="wrap-content">
              <el-select v-model="key_code" style="width:100%;">
                <el-option
                  v-for="item in keyWords"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入搜索内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger pull-right">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {ref,reactive} from "@vue/composition-api"
import "@/styles/config.scss"
export default {
  setup(props, {refs , root}){
    const options = reactive(
      [{
        value: '1',
        label: '国际信息'
      }, {
        value: '2',
        label: '国内信息'
      }, {
        value: '3',
        label: '公司信息'
      }]
    )
    const selectKey = ref('')
    const value2 = ref('')
    const keyWords = reactive([
      {value: "ID",label: "ID"},
      {value: "title",label: "标题"}
    ])
    const key_code = ref('ID')
    return {
      options,
      selectKey,
      value2,
      keyWords,
      key_code
    }
  }
};
</script>

<style lang="scss" scoped>
.select-wrap {
  width: 100%;
  &.category{@include labelDom(left,60,40)}
  &.data {@include labelDom(center,100,40)}
  &.keywords{@include labelDom(center,90,40)}
}
</style>
