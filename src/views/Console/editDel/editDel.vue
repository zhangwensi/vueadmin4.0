<template>
    <div class="edit-form">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="信息分类">
                <el-select v-model="form.categoryType" placeholder="请选择类型">
                    <el-option v-for="item in data.category" :key="item.id"  :value="item.id" :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题" class="edit-form-title">
                <el-input v-model="form.title"  disabled></el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                缩略图
            </el-form-item>
            <el-form-item label="新闻标题">
                <el-date-picker
                v-model="form.dateTime"
                type="datetime"
                placeholder="选择日期时间" disabled>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="详细内容" class="edit-form-content">
                <template>
                    <quillEditor v-model="form.content"></quillEditor>
                </template>
            </el-form-item>
        </el-form>
        <el-button type="primary">保存</el-button>
    </div>
</template>

<script>
import { ref, reactive, onMounted ,beforeMount, watch} from "@vue/composition-api";
import { GetList, DeletList ,seacrchList,GetFirstCategory,editeSearch} from "@/api/news.js";
import { quillEditor  } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill';
export default {
    name:'editDel',
    components:{quillEditor},
    setup(props,{refs,root}) {
        const data = reactive({
            id:root.$route.params.id || root.$store.getters["Id"],
            category:[]
        })
        const form = reactive({
            title:'',
            dateTime:'',
            categoryType:'',
            content:''
        })
        // 调用获取新闻列表接口,渲染select组件
        const getInform =()=>{
            GetFirstCategory().then(resp=>{
                data.category = resp.data.data.data
            }).catch(err=>{
                root.$message({
                    message:"调用GetList接口错误",
                    type:'error'
                })
            })
        }
        const getdetInfo=() =>{
            editeSearch({id:data.id}).then(resp=>{
                form.dateTime = resp.data.data[0].date
                form.categoryType = resp.data.data[0].category
                form.content = resp.data.data[0].content
                form.title = resp.data.data[0].title
            }).catch(err=>{
                root.$message({
                    message:"调用editeSearch接口错误",
                    type:'error'
                })
            })
        }
        // let id = root.$route.params.id || root.$store.getters["Id"]
        // let title = root.$route.params.title  || root.$store.getters["Title"]
        onMounted(()=>{
            getInform(),
            getdetInfo()
        })
        return {
            data,form,
            getInform
        }
    }
}
</script>

<style lang="scss">
.edit-form {
    .edit-form-title{
        .el-form-item__content{
            width: 480px !important;
        }
    }
    .edit-form-content{
        .el-form-item__content{
            min-height: 300px;
            margin: 0 200px 40px 80px;
            .quill-editor{
                div:nth-child(2){
                    height: 300px;
                }
            }
        }
    }
}
</style>