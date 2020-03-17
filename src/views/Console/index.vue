<template>
  <div>
      <el-row :gutter="16">
        <el-col :span=4>
          <div class="select-wrap category">
            <label for="">分类:</label>
            <div class="wrap-content">
              <el-select v-model="selectKey" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in options.category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id">
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
          <el-button type="danger" class="pull-right" @click="dialogInfo = true" >新增</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableDate.item[0]" v-loading="loadingData" border style="width:100%">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next,jumper"
            :total="total"
            width="100%">
          </el-pagination>
        </el-col>
      </el-row>
      <!-- 新增弹出框 -->
      <!-- <Dialog :flag.sync="dialogInfo"/> -->
      <Dialog :flag="dialogInfo"  @close="diaClose" :category="options.category"/>
  </div>
</template>

<script>
import {ref,reactive, onMounted, watch} from "@vue/composition-api"
import "@/styles/config.scss"
import Dialog  from "@/views/Console/Dialog/dialog.vue"
import { global } from "@/utils/globalv3"
import { common } from "@/api/common.js"
import { GetList } from "@/api/news.js"
export default {
  components: { Dialog },
  setup(props, {refs , root}){
    const { str,confirm } = global()
    const { getCategoryInfo,cateGoryInfo } = common()
    // watch(()=>{console.log(str.value)})
    const options = reactive({
      // [{
      //   value: '1',
      //   label: '国际信息'
      // }, {
      //   value: '2',
      //   label: '国内信息'
      // }, {
      //   value: '3',
      //   label: '公司信息'
      // }]
      category: []
    })
    const dialogInfo = ref(false)
    const selectKey = ref('')
    const dateValue = ref('')
    const loadingData = ref(false)
    const keyWords = reactive([
      {value: "ID",label: "ID"},
      {value: "title",label: "标题"}
    ])
    const key_code = ref('ID')
    const tableDate = reactive({
      item:[]
    })
    const total = ref(0)
    const page = reactive({
      pageNumber:1,
      pageSize:10
    })
    const diaClose =()=>{
      // 可以处理逻辑复杂的事情
      dialogInfo.value = false
    }
    const handleSizeChange =(val)=>{
        page.pageSize = val
    }
    const handleCurrentChange =(val)=>{
        page.pageNumber = val
        getList()
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

    // 页面加载完成时获取数据
    onMounted(()=>{
      getCategoryInfo()
      getList()
    })

    // 监听初始值  监听的为categoryInfo对象，监听的值为value
    watch(()=>cateGoryInfo.item,(value)=>{
      options.category = value
    })

    // 获取列表信息
    const getList = ()=>{
      let reqListData = {
        categoryId: '',
        startTiem: '',
        endTime: '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      }
      loadingData.value = true
      GetList(reqListData).then(response=>{
        let resData = response.data
        tableDate.item = resData.data.data
        total.value = resData.total
        loadingData.value = false
      }).catch(error=>{
        loadingData.value = false
      })
    }
    return {
      options,page,total,loadingData,
      selectKey,
      dateValue,
      keyWords,
      key_code,
      tableDate,
      dialogInfo,
      diaClose,
      deletItem,
      deletAll,
      getList,handleSizeChange,handleCurrentChange
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
