const state = {
    id:'' || sessionStorage.getItem('edit_id'),
    title:'' || sessionStorage.getItem('edit_title')
}

const getters = {
    Id:state=>state.id,
    Title:state=>state.title
}

const mutations = {
    UPDATE_STATE_VALUE:(state,params)=>{
        for(let key in params) {
            state[key] = params[key].value
            if(params[key].session) {
                sessionStorage.setItem(params[key].sessionKey,params[key].value)
            }
        }
    }

    // SET_ID:(state,value)=>{
    //     state.id = value
    //     sessionStorage.setItem('edit_id',value)
    // },
    // SET_TITLE:(state,value)=>{
    //     state.title = value
    //     sessionStorage.setItem('edit_title',value)
    // }
}

const actions = {

}

export default {
    namespace:true,
    state,
    getters,
    mutations,
    actions
}