<template>
    <div class="userArea">
        <el-row :gutter="2">
            <el-col :span="6">
                <el-select placeholder="请选择" v-model="data.province" @change="handlerChange">
                    <el-option
                        v-for="item in data.provinceData"
                        :key='item.province'
                        :value="item.province"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select  placeholder="请选择"  v-model="data.city" @change="handlerCity">
                    <el-option
                        v-for="item in data.cityData"
                        :key="item.code"
                        :value="item.city"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select  placeholder="请选择"  v-model="data.area" @change="handlerArea">
                    <el-option
                        v-for="item in data.areaData"
                        :key="item.code"
                        :value="item.area"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select  placeholder="请选择"  v-model="data.town" @change="handlerTown">
                    <el-option
                        v-for="item in data.townData"
                        :key="item.code"
                        :value="item.town"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {ref,reactive, onMounted, onBeforeMount, watch} from'@vue/composition-api'
// import {getCityPicker} from '@/api/common.js'
import { getCityPicker } from '@/api/getUserInfo.js'
export default {
    name:'cityPicker',
    props:{
        cityPickerData:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props,{root ,refs,emit}){
        const data = reactive({
            province:'',
            city:'',
            area:'',
            town:'',
            provinceData:[],
            cityData:[],
            areaData:[],
            townData:[]
        })
        // 返回给外部的省市编码数据
        const resultData = reactive({
            province:'',
            city:'',
            area:'',
            town:'',
        })
        // 返回给外部的省市名称数据
        const resultDataName = reactive({
            provinceName:'',
            cityName:'',
            areaName:'',
            townName:'',
        })

        // 获取省
        const getPerviceData = () =>{
            getCityPicker({type:'province'}).then(response=>{
                data.provinceData = response.data.data
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        // 当省份选择完后 通过onchang事件 选择市
        const handlerChange =(val) =>{
            resetPickerData({type:'city'})
            getCityPicker({type:'city',province:val}).then(response=>{
                data.cityData = response.data.data
                // 获取省级级级名称
                data.provinceData.map(item=>{
                    if(item.province=== val) {
                        resultDataName.provinceName = item.name
                    }
                })
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        // 获取县数据
        const handlerCity = (val) => {
            resetPickerData({type:'area'})
            getCityPicker({type:'area',province:data.province,city:val}).then(response=>{
                data.areaData = response.data.data
                // 获取市级级名称
                data.cityData.map(item=>{
                    if(item.city=== val) {
                        resultDataName.cityName = item.name
                    }
                })
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        // 获取乡镇数据
        const handlerArea =(val) =>{
            resetPickerData({type:'town'})
            getCityPicker({type:'town',province:data.province,city:data.city,area:val}).then(response=>{
                data.townData = response.data.data
                // 获取县级名称
                data.areaData.map(item=>{
                    if(item.area=== val) {
                        resultDataName.areaName = item.name
                    }
                })
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        const handlerTown = (val) => {
            // 获取镇及名称
            data.townData.map(item=>{
                if(item.town=== val) {
                    resultDataName.townName = item.name
                }
            })
            resetPickerData({type:''})
        }
        // 重置省市区县街道
        const resetPickerData =(params) =>{
            // 根据不同的type值 确定需要重置下属区域 先定义一个json对象
            let typeData = {
                city:['city','area','town'],
                area:['area','town'],
                town:['town']
            }
            // 使用forEach函数循环 置空
            const arrObj = typeData[params.type]
            if(arrObj) {
                // 考虑乡镇选择时可能不传值 为后续抽离此业务时做预留 防止报错
                arrObj.forEach(item=>data[item] = '')
            }
            addResult()
        }

        // 将data中的省市县街道数据存在result中，放在重置函数里，因为每次点击选择时会优先调用该函数
        const addResult = () =>{
            for (let key in resultData) {
                resultData[key] = data[key]
            }
        }

        onBeforeMount(()=>{
        // 获取省份信息
            getPerviceData()
        })
        // 监听省市县乡镇值返回给cityPicker组件,主要监听resultData中的值及resultDataName中的值
        watch([
            ()=>{resultData.province},
            ()=>{resultData.city},
            ()=>{resultData.area},
            ()=>{resultData.town},
            ()=>{resultDataName.provinceName},
            ()=>{resultDataName.cityName},
            ()=>{resultDataName.areaName},
            ()=>{resultDataName.townName}
        ],([province,city,area,town,provinceName,cityName,areaName,townName])=>{
            emit("update:cityPickerData",{resultData,resultDataName})
        })
        // 清除该组件的绑定数据
        const clearPickerCityData = () => {
            data.province = ''
            data.city = ''
            data.area = ''
            data.town = ''
        }
        return {
            data,resultData,
            getPerviceData,handlerChange,handlerCity,handlerArea,resetPickerData,addResult,handlerTown,clearPickerCityData
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>