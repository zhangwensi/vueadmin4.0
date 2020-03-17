<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialogTableVisible" @close="close" width="580px" @opened="opened">
            <el-form :model="form">
                <el-form-item label="类型:"  :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option v-for="item in optionsData.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="概况:" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button type="danger" size="small" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {ref,reactive,watch } from '@vue/composition-api'
import { Addnews } from "@/api/news.js"
export default {
    name: 'Dialog',
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: ()=>[]
        }
    },
    setup(props, { refs,root,emit}){
        const dialogTableVisible = ref(false)
        const formLabelWidth = ref("70px")
        const form = reactive({
            category: '',
            region: '',
            name: '',
            textarea: ''
        })
        const optionsData = reactive({
            item:[]
        })
        const close = () => {
            dialogTableVisible.value = false
            // emit("update:flag",false)
            emit("close",false)  //此处的clsoe为父组件中的@close
        }
        watch(()=>{
            dialogTableVisible.value = props.flag
        })
        
        const submit = ()=>{
            addNews()
        }
        const opened =()=>{
            optionsData.item = props.category
        }
        const cancel = ()=>{
            dialogTableVisible.value = false
            form.region = ''
            form.name = ''
            form.textarea = ''
        }
        // 调用添加新闻接口
        const addNews = ()=>{
            let reqData = {
                type: form.region,
                title: form.name,
                content: form.textarea
            }
            if( form.region !=='' && form.name !=='' && form.textarea !== '') {
                Addnews(reqData).then(response=>{
                    if ( response.data.resCode == 0) {
                        root.$message({
                            message: "添加成功",
                            type: "success"
                        })
                    }else {
                        root.$message({
                            message: "添加失败",
                            type: "error"
                        })
                    }
                }).catch(error=>{
                    root.$message({
                            message: "接口请求失败，失败原因请看日志",
                            type: "error"
                        })
                })
            } else {
                root.$message({
                    message: "需填写完整",
                    type: "error"
                })
                dialogTableVisible.value =true
            }
        }
        return {
            dialogTableVisible,
            formLabelWidth,
            form,
            close,
            opened,
            optionsData,submit,
            addNews,cancel
        }
    }
}
</script>