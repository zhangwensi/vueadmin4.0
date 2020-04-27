<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'subit_button_add'})">添加一级分类</el-button>
    <!-- <div class="hr"></div> -->
    <hr class="hr-e9">
    <div>
      <el-row :gutter="16">
        <el-col :span="12">
          <div  class="category-wrap">
            <div class="category" v-for="item in categoryDate.item" :key="item.id">
              <h4>
                <svg-icon icon-class="plus" class="svg"></svg-icon>
                {{item.category_name}}
                <div class="button-group">
                  <el-button type="danger" size="mini" @click="editCategory({data:item,type:'subit_button_edit'})" round>编辑</el-button>
                  <el-button type="success" size="mini" round>增加子级</el-button>
                  <el-button size="mini" @click="removeFirstCategory(item.id)" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li v-for="childItem in item.children" :key="childItem.id">
                  {{childItem.category_name}}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="menuewrap">
            <h4>一级分类编辑</h4>
            <el-form label-width="142px" class="widt1">
              <el-form-item label="一级分类名称" v-if="status.categoryFirstInput">
                <el-input v-model="formLabelAlign.name" :disabled="status_first_disabled"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称" v-if="status.categorySecondInput">
                <el-input v-model="formLabelAlign.region" :disabled="status_second_disabled"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="submit" :disabled="status_sumbit_disable">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { AddFirstCategory, GetFirstCategory, DeletFirstCategory ,EditFirstCategory} from "@/api/news.js";
import { reactive, onMounted , ref, watch } from '@vue/composition-api';
import { global } from "@/utils/globalv3";
import {common} from "@/api/common.js"
export default {
  name: 'infoCategory',
  setup(props,{refs,root}){
    const {str,confirm} = global()
    const {getCategoryInfo , cateGoryInfo} = common()
    const formLabelAlign = reactive({
        name: '',
        region: '',
        type: ''
    })
    const status_first_disabled = ref(true)
    const status_second_disabled = ref(true)
    const status_sumbit_disable = ref(true)
    const subit_botton_type = ref('') //确定按钮的类型值
    const deleteId = ref('')
    const categoryDate = reactive({
      item:[],
      current: []
    })
    const submit = ()=>{
      if( subit_botton_type.value == 'subit_button_add') {
        addFirstMenu()
      }
      if(subit_botton_type.value == 'subit_button_edit') {
        editFirstCategory()
      }
    }
    const addFirstMenu = ()=>{
      if(!formLabelAlign.name) {
        root.$message.error("输入不为空")
        return false
      }
      let categoryInfo = {categoryName: formLabelAlign.name}
      AddFirstCategory(categoryInfo).then(response =>{
        let data = response.data
        if(data.resCode !==0) {
          root.$message({
            message: "添加失败",
            type: "warning"
          })
        }else {
          root.$message({
            message: data.message,
            type: "success"
          })
          // 将取得数据push进categoryDate数组中
          categoryDate.item.push(data.data)
          formLabelAlign.name = ''
        }
      }).catch(error =>{
          root.$message({
            message: "请求失败",
            type: "warning"
          })
      })
    }
    const status = reactive({
        categoryFirstInput: true,
        categorySecondInput: true
    })
    const addFirst = (parame)=>{
        subit_botton_type.value = parame.type
        status.categorySecondInput = false
        status_first_disabled.value = false
        status_sumbit_disable.value = false
    }
    const getFirst = ()=>{
      // GetFirstCategory().then((respnse)=>{
      //   console.log(respnse.data.data.data)
      //   categoryDate.item = respnse.data.data.data
      // }).catch((error)=>{
      //   // 报错时处理啥
      // })
      getCategoryInfo()
    }
    // 监听一级分类接口返回值
    watch(()=>cateGoryInfo.item,(value)=>{
      categoryDate.item = value
    })
    // 页面（DOM渲染完成时获取数据）
    onMounted(()=>{
      getFirst()
    })
    // 删除一级菜单
    const removeFirstCategory = (categoryId)=>{
      deleteId.value =  categoryId
      confirm({
        content: "删除选择的数据，删除后将无法恢复",
        tip:"警告",
        type: "warning",
        fn: deleteFirtsC, //调用删除接口 进行数据删除
        catchFn:()=>{
          deleteId.value = ''
        }
      })
    }
    // 删除一级菜单
    const deleteFirtsC = ()=>{
      // 如需要传参  建议传deleteId.value给后端接口 本版本暂不需要传值
      DeletFirstCategory().then(response=>{
        // 删除成功后移除一级菜单内容 可以使用splice或者filter
        let index = categoryDate.item.findIndex(item => item.id == deleteId.value)
        categoryDate.item.splice(index,1)
        // let newData = categoryDate.item.filter(item => item.id != deleteId.value)
        // categoryDate.item = newData
      }).catch(error=>{

      })
    }
    // 编辑一级菜单内容
    const editCategory = (parame)=>{
      // 隐藏自己菜单 让一级菜单进行可编辑状态
      subit_botton_type.value = parame.type
      status.categorySecondInput = false
      status_first_disabled.value = false
      status_sumbit_disable.value = false
      formLabelAlign.name = parame.data.category_name
      //存储当前数据
      categoryDate.current = parame.data
    }
    const editFirstCategory = ()=>{
      if(categoryDate.current.length == 0){
        root.$message({
          message:"修改值不能为空！",
          type: 'error'
        })
        return false
      }
      let reqData = {
        id:categoryDate.current.id,
        category_name:formLabelAlign.name
      }
      EditFirstCategory(reqData).then(response=>{
        let resData = response.data
        if(resData.resCode !==0) {
          root.$message({
            message: "添加失败",
            type: "warning"
          })
        }else {
          root.$message({
            message:resData.message,
            type: "success"
          })
        }
        // 取current数据 使用filter方法找出数组id与当前id一致的  修改内容
        //let data = categoryDate.item.filter(item=>item.id == categoryDate.current.id) //对象引用  
        //data[0].category_name = resData.data.category_name//因后台未做数据库链 所以直接使用填入的值
        categoryDate.current.category_name = resData.data.category_name
        // 清空输入框
        formLabelAlign.name = ''
        categoryDate.current = []
      }).catch(error=>{
          root.$message({
            message: "请求失败",
            type: "warning"
          })
      })
    }
    return {
      formLabelAlign,status,categoryDate,status_first_disabled,status_second_disabled,status_sumbit_disable,deleteId,subit_botton_type,
      submit,addFirst,getFirst,removeFirstCategory,deleteFirtsC,editCategory,addFirstMenu,editFirstCategory
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.category-wrap {
  div:first-child {
    &:before {top: 20px;}
  }
  div:last-child {
    &:before {bottom: 19px;}
  }
}
.category {
  cursor: pointer;
  position: relative;
  line-height: 40px;
  &:before {
    position: absolute;
    content: '';
    top: 0px;
    bottom: 0px;
    left: 22px;
    border-left: 1px dotted #000;
  }
  ul {
    padding: 0px;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg.svg.svg-icon {
      position: absolute;
      left: 18px;
      top: 15px;
      width: 10px;
      height: 10px;
      background: #fff;
    }
  }
  li {
    position: relative;
    padding-left: 38px;
    margin-left: 23px;
    &:before {
      position: absolute;
      top: 20px;
      left: 0px;
      content: '';
      width: 32px;
      border-bottom: 1px dotted #000;
    }  
  }
  h4, li {
    @include webkit(transition,all 0.8s ease 0s);
    &:hover{
      background: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  top: 0px;
}
.menuewrap {
  line-height: 40px;
  h4 {
    background: #f3f3f3;
  }
  .widt1 {
    width: 420px;
    padding-top: 26px;
  }
}
// .hr {
//     border-bottom: 1px solid #e9e9e9;
//     width: 100%;
//     margin: 10px 0 10px 0;
// }
.hr-e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
