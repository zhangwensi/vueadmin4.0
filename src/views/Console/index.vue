<template>
  <div>
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
                v-model="dateValue"
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
          <el-button type="danger" class="pull-right" @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableDate" border style="width:100%">
        <el-table-column type="selection" width="45" style="padding-left:15px"></el-table-column>
        <el-table-column prop="title" label="标题" width="552"></el-table-column>
        <el-table-column prop="category" label="类型" width="110"></el-table-column>
        <el-table-column prop="date" label="日期" width="200"></el-table-column>
        <el-table-column prop="user" label="管理员" width="100"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="danger" size="mini" @click="deletItem">删除</el-button>
            <el-button type="success" size="mini" @click="dialogInfo = true">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页-->
      <el-row>
        <el-col :span="12">
          <el-button @click="deletAll">批量删除</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next,jumper"
            :total="100"
            width="100%">
          </el-pagination>
        </el-col>
      </el-row>
      <!-- 新增弹出框 -->
      <!-- <Dialog :flag.sync="dialogInfo"/> -->
      <Dialog :flag="dialogInfo"  @close="diaClose"/>
  </div>
</template>

<script>
import {ref,reactive} from "@vue/composition-api"
import "@/styles/config.scss"
import Dialog  from "@/views/Console/Dialog/dialog.vue"
import { global } from "@/utils/globalv3"
export default {
  components: { Dialog },
  setup(props, {refs , root}){
    const { str,confirm } = global()
    // watch(()=>{console.log(str.value)})
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
    const dialogInfo = ref(false)
    const selectKey = ref('')
    const dateValue = ref('')
    const keyWords = reactive([
      {value: "ID",label: "ID"},
      {value: "title",label: "标题"}
    ])
    const key_code = ref('ID')
    const tableDate = reactive([
      {
        title: '上海市普陀区金沙江路 1516 弄',
        category: '国内信息',
        date: '2020-01-09 16:25:32',
        user: '管理员'
      },
      {
        title: "上海市普陀区金沙江路 1516 弄",
        category: "国内信息",
        date: '2020-01-09 16:25:32',
        user: "管理员"
      },
      {
        title: "上海市普陀区金沙江路 1516 弄",
        category: "国内信息",
        date: '2020-01-09 16:25:32',
        user: "管理员"
      },
      {
        title: "可以获取到 row, column, $index 和 store（table 内部的状态管理）",
        category: "国内信息",
        date: '2020-01-09 16:25:32',
        user: "管理员"
      }
    ])
    const diaClose =()=>{
      // 可以处理逻辑复杂的事情
      dialogInfo.value = false
    }

    // 
    const deletItem = ()=>{
      confirm({
        content: "删除此数据，删除后将无法恢复",
        tip: "警告",
        type: "warning",
        fn: aaa
      })
    }
    const deletAll = ()=> {
      confirm({
        content: "删除选择的数据，删除后将无法恢复",
        tip: "",
        type: "warning",
        fn: aaa
      })
    }

    const aaa = ()=>{
      // 做删除动作
      console.log("aaaa")
    }
    return {
      options,
      selectKey,
      dateValue,
      keyWords,
      key_code,
      tableDate,
      dialogInfo,
      diaClose,
      deletItem,
      deletAll
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
.el-table {
  margin: 40px 0 40px 0;
}
</style>
