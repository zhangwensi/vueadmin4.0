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
                        :key='item.city'
                        :value="item.city"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select  placeholder="请选择"  v-model="data.area" @change="handlerArea">
                    <el-option
                        v-for="item in data.areaData"
                        :key='item.area'
                        :value="item.area"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select  placeholder="请选择"  v-model="data.town">
                    <el-option
                        v-for="item in data.townData"
                        :key='item.area'
                        :value="item.area"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {ref,reactive, onMounted} from'@vue/composition-api'
// import {getCityPicker} from '@/api/common.js'
import { getCityPicker } from '@/api/getUserInfo.js'
export default {
    name:'cityPicker',
    setup(props,{root ,refs}){
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
            getCityPicker({type:'city',province:val}).then(response=>{
                data.cityData = response.data.data
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        // 获取县数据
        const handlerCity = (val) => {
            getCityPicker({type:'area',province:data.province,city:val}).then(response=>{
                data.areaData = response.data.data
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        // 获取乡镇数据
        const handlerArea =(val) =>{
            getCityPicker({type:'town',province:data.province,city:data.city,area:val}).then(response=>{
                data.townData = response.data.data
            }).catch(err=>{
                root.$message({
                    message:'获取失败',
                    type:'success'
                })
            })
        }
        getPerviceData()
        return {
            data,
            getPerviceData,handlerChange,handlerCity,handlerArea
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>