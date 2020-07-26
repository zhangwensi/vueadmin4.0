<template>
    <el-select v-model="data.slectData" @change="handleChange">
        <el-option v-for="item in data.optionSelet" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
    name: "selectCp",
    props:{
        choseData:{
            type:Array,
            default:()=>[]
        },
        currentSelectType:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props,{root,emit}){
        const data = reactive({
        slectData:'',
        optionSelet:[],
        selectValue:[
            {value:"realname",label:"姓名"},
            {value:"phone",label:"电话"},
            {value:"email",label:"邮箱"}
        ]
        });

        const limitOption=()=>{
            // 考虑性能问题  组件值的匹配默认会匹配一条渲染一次 可以先定义一个变量，等匹配完所有之后 一次性塞入组件中
            let optionArr = []
            props.choseData.forEach(item=>{
                let arr = data.selectValue.filter(element=>element.value == item)[0] //filter 返回的是值是数组
                optionArr.push(arr)
                data.optionSelet = optionArr// 渲染时不能更改selectValue原始值  故新增变量 直接渲染该变量即可
                data.slectData = optionArr[0].value  //设置默认选中值
                // 更新父组件中搜索类型
                emit('update:currentSelect',data.slectData)
            })
        }
        // 在组件挂载完成时调用方法 完成默认值
        onMounted(()=>{
            limitOption()
        })
        // 选中时触发给父组件
        const handleChange = (val) => {
            data.slectData = val
            // 更新父组件中搜索类型
            emit('update:currentSelect',data.slectData)
        }
        return {
            data,limitOption,handleChange
        };
    }
}
</script>

<style lang="scss">
    
</style>