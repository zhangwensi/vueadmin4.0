<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="select-wrap category">
          <label for>分类:</label>
          <div class="wrap-content">
            <el-select v-model="selectKey" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="select-wrap data">
          <label for>
            <span>日期:</span>
          </label>
          <div class="wrap-content">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              style="width:100%;"
              format="yyyy 年MM月dd日 HH时mm分ss秒"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="select-wrap keywords">
          <label for>
            <span>关键字:</span>
          </label>
          <div class="wrap-content">
            <el-select v-model="key_code" style="width:100%;">
              <el-option
                v-for="item in keyWords"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="key_title"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" class="pull-right" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableDate.item"
      v-loading="loadingData"
      border
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" style="padding-left:15px"></el-table-column>
      <el-table-column prop="title" label="标题" width="552"></el-table-column>
      <el-table-column prop="category" label="类型" width="110" :formatter="toType"></el-table-column>
      <el-table-column prop="date" label="日期" width="200" :formatter="toTime"></el-table-column>
      <el-table-column prop="user" label="管理员" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deletItem(scope.row.categoryId)">删除</el-button>
          <el-button type="success" size="mini" @click="editCategory(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="editDel(scope.row)">信息详情</el-button>
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
          width="100%"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹出框 -->
    <!-- <Dialog :flag.sync="dialogInfo"/> -->
    <Dialog
      :flag="dialogInfo"
      @close="diaClose"
      :category="options.category"
      @addGetList="addGetList"
    />
    <!-- 编辑弹出框 -->
    <editDialog
      :flag="editDialogInfo"
      @close="diaClose"
      :editCategory="options.editCategory"
      :editCategoryType="options.category"
      @addGetList="addGetList"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
import "@/styles/config.scss";
import Dialog from "@/views/Console/Dialog/dialog.vue";
import editDialog from "@/views/Console/Dialog/editDialog.vue";
import { global } from "@/utils/globalv3";
import { common } from "@/api/common.js";
import { GetList, DeletList ,seacrchList} from "@/api/news.js";
export default {
  components: { Dialog, editDialog },
  setup(props, { refs, root }) {
    const { str, confirm } = global();
    const { getCategoryInfo, cateGoryInfo } = common();
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
      category: [],
      editCategory: []
    });
    const dialogInfo = ref(false);
    const editDialogInfo = ref(false);
    const selectKey = ref("");
    const dateValue = ref("");
    const loadingData = ref(false);
    const keyWords = reactive([
      { value: "ID", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    const key_code = ref("ID");
    const deleteListId = ref("");
    const tableDate = reactive({
      item: []
    });
    const key_title = ref('');
    const total = ref(0);
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });
    const toType = row => {
      let a = row.category;
      return a;
    };
    const toTime = row => {
      // 处理格林威志时间
      const add0 = m => {
        return m < 10 ? "0" + m : m;
      };
      let time = new Date(row.date);
      let reltime =
        time.getFullYear() +
        "-" +
        add0(time.getMonth() + 1) +
        "-" +
        add0(time.getDate()) +
        " " +
        add0(time.getHours()) +
        ":" +
        add0(time.getMinutes()) +
        ":" +
        add0(time.getSeconds());
      return reltime;
    };
    const diaClose = () => {
      // 可以处理逻辑复杂的事情
      dialogInfo.value = false;
      editDialogInfo.value = false;
    };
    const handleSizeChange = val => {
      page.pageSize = val;
    };
    const handleCurrentChange = val => {
      page.pageNumber = val;
      getList();
    };
    // 删除
    const deletItem = id => {
      // 取table实例的id
      deleteListId.value = id;
      confirm({
        content: "删除此数据，删除后将无法恢复",
        tip: "警告",
        type: "warning",
        fn: delList
      });
    };
    // 编辑
    const editCategory = item => {
      editDialogInfo.value = true;
      options.editCategory = item;
    };
    const deletAll = () => {
      if (!deleteListId.value || deleteListId.value.length === 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
        return false;
      }
      confirm({
        content: "删除选择的数据，删除后将无法恢复",
        tip: "",
        type: "warning",
        fn: delAll
      });
    };
    const handleSelectionChange = val => {
      let delA = val.map(item => item.categoryId);
      deleteListId.value = delA;
    };
    const delAll = data => {
      DeletList({ id: deleteListId.value })
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            getList();
          }
        })
        .catch(error => {
          root.$message({
            message: "删除失败",
            type: "danger"
          });
        });
    };
    const delList = data => {
      // 做删除动作
      DeletList({ id: deleteListId.value })
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            // console.log(deleteListId.value)
            // let newData = tableDate.item.filter(item => item.id != resData.data.id)
            // console.log(newData)
            // return false
            // tableDate.item.splice(index,1)
            getList();
          }
        })
        .catch(error => {
          root.$message({
            message: "删除失败",
            type: "danger"
          });
        });
    };

    // 页面加载完成时获取数据
    onMounted(() => {
      getCategoryInfo();
      getList();
    });

    // 监听初始值  监听的为categoryInfo对象，监听的值为value
    watch(
      () => cateGoryInfo.item,
      value => {
        options.category = value;
      }
    );
    // 初始化请求数据
    const requData = () =>{
      let requstData = {
        'id':selectKey.value,
        'startTiem':dateValue.value[0],
        'endTime':dateValue.value[1],
        'type':key_code.value,
        'typeConten':key_title.value
      }
      return requstData
    }
    // 搜索
    const search = () => {
      console.log(requData())
      return false
      seacrchList(requData()).then(resp=>{
      })
    };
    // 信息详情跳转
    const  editDel=(data) =>{
      // 预先存值
      root.$store.commit('UPDATE_STATE_VALUE',{
        id:{
          value:data.categoryId,
          sessionKey:'id',
          session:true
        },
        title:{
          value:data.title,
          sessionKey:'title',
          session:true
        }
      })
      root.$router.push({
        name:'EditDel',
        params:{
          id:data.categoryId,
          title:data.title
        }
      })
    } 
    // 获取列表信息
    const getList = () => {
      let reqListData = {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      loadingData.value = true;
      GetList(reqListData)
        .then(response => {
          let resData = response.data;
          tableDate.item = resData.data;
          total.value = resData.total[0].cnt;
          loadingData.value = false;
        })
        .catch(error => {
          loadingData.value = false;
        });
    };
    //新增按钮子组件传值给父组件调用getList方法刷新列表
    const addGetList = () => {
      getList();
    };
    return {
      options,
      key_title,
      page,
      total,
      loadingData,
      deleteListId,
      editDialogInfo,
      selectKey,
      dateValue,
      keyWords,
      key_code,
      tableDate,
      dialogInfo,
      diaClose,
      deletItem,
      deletAll,
      delList,
      getList,
      handleSizeChange,
      handleCurrentChange,
      toType,
      toTime,
      addGetList,
      editCategory,
      handleSelectionChange,
      search,
      requData,
      editDel
    };
  }
};
</script>

<style lang="scss" scoped>
.select-wrap {
  width: 100%;
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.data {
    @include labelDom(center, 100, 40);
  }
  &.keywords {
    @include labelDom(center, 90, 40);
  }
}
.el-table {
  margin: 40px 0 40px 0;
}
</style>
