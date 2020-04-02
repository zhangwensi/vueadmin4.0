import  { MessageBox } from "element-ui";
export default {
   install (Vue , options) {
       Vue.prototype.confirm = (params)=>{
            MessageBox.confirm(params.content, params.tip || "提示" ,{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true,
                type: params.type
            }).then(()=>{
                if(params.fn) {
                    params.fn()
                }
            }).catch(()=>{
                // root.message({
                //     type: "info",
                //     message: "已取消删除"
                // })
            })
       }
   }
}