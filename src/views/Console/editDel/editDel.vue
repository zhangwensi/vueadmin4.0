<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="信息分类">
                <el-select v-model="form.categoryId" placeholder="请选择类型">
                    <el-option v-for="item in data.category" :key="item.id"  :value="item.id" :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题">
                <el-input v-model="form.title" disabled></el-input>
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
            <el-form-item label="详细内容">
                详细内容
            </el-form-item>
        </el-form>
        <el-button type="primary">保存</el-button>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import { GetList, DeletList ,seacrchList,GetFirstCategory} from "@/api/news.js";
export default {
    name:'editDel',
    setup(props,{refs,root}) {
        const data = reactive({
            category:[]
        })
        const form = reactive({
            categoryId:root.$route.params.id || root.$store.getters["Id"],
            title:'',
            dateTime:''
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
        // let id = root.$route.params.id || root.$store.getters["Id"]
        // let title = root.$route.params.title  || root.$store.getters["Title"]
        // 

        onMounted(()=>{
            getInform()
        })
        return {
            data,form,
            getInform
        }
    }
}
</script>

<style lang="scss">
    
</style>