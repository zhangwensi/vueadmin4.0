<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialogTableVisible" @close="close" width="580px">
            <el-form :model="form">
                <el-form-item label="类型:"  :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="1" value="section1"></el-option>
                        <el-option label="2" value="section2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="概况:" :label-width="formLabelWidth">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogTableVisible =false">取消</el-button>
                <el-button type="danger" size="small" @click="dialogTableVisible =false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {ref,reactive,watch } from '@vue/composition-api'
export default {
    name: 'Dialog',
    props: {
        flag: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { refs,root,emit}){
        const dialogTableVisible = ref(false)
        const formLabelWidth = ref("70px")
        const form = reactive({
            region: '',
            name: ''
        })
        const close = () => {
            dialogTableVisible.value = false
            // emit("update:flag",false)
            emit("close",false)  //此处的clsoe为父组件中的@close
        }
        watch(()=>{
            dialogTableVisible.value = props.flag
        })
        return {
            dialogTableVisible,
            formLabelWidth,
            form,
            close
        }
    }
}
</script>