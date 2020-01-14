<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <!-- <div class="hr"></div> -->
    <hr class="hr-e9">
    <div>
      <el-row :gutter="16">
        <el-col :span="12">
          <div  class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon icon-class="plus" class="svg"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>增加子级</el-button>
                  <el-button size="mini" round>取消</el-button>
                </div>
              </h4>
              <ul>
                <li>国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>取消</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon icon-class="minus" class="svg"></svg-icon>
                新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="menuewrap">
            <h4>一级分类编辑</h4>
            <el-form label-width="142px" class="widt1">
              <el-form-item label="一级分类名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
export default {
  setup(props,{ref,root}){
    const formLabelAlign = reactive({
        name: '',
        region: '',
        type: ''
    })
    return {
      formLabelAlign
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
    margin-left: 22px;
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
