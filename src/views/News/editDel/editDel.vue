<template>
    <div class="edit-form">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="信息分类">
                <el-select v-model="form.categoryType" placeholder="请选择类型">
                    <el-option v-for="item in data.category" :key="item.id"  :value="item.id" :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题" class="edit-form-title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            id:root.$route.params.id || root.$store.getters["id"],
            category:[]
        })
        const form = reactive({
            title:'',
            dateTime:'',
            categoryType:'',
            content:'',
            imageUrl:''
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
         const handleAvatarSuccess =(res, file) =>{
            form.imageUrl = URL.createObjectURL(file.raw);
        }
        const beforeAvatarUpload =(file)=> {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
        onMounted(()=>{
            getInform(),
            getdetInfo()
        })
        return {
            data,form,
            getInform,handleAvatarSuccess,beforeAvatarUpload
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
            min-height: 150px;
            margin: 0 200px 40px 80px;
            .quill-editor{
                div:nth-child(2){
                    height: 150px;
                }
            }
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>