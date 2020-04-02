import { GetFirstCategory } from "@/api/news.js"
const actions = {
    getCategoryInfo (content,value){
        return new Promise((reslove,reject)=>{
            GetFirstCategory(value).then((response)=>{
                console.log(response.data)
            }).catch(error=>{
                
            })
        })
    }
}

export default {
    namespace:true,
    actions
}