import { GetFirstCategory } from '@/api/news.js'
import {reactive} from "@vue/composition-api"
export function common () {
    const cateGoryInfo = reactive({
        item:[]
    })
    const getCategoryInfo =() =>{
        GetFirstCategory().then(response=>{
            cateGoryInfo.item = response.data.data.data
        }).catch(error=>{
            //
        })
    }
    return {
        getCategoryInfo,
        cateGoryInfo
    }
}