const state = {
    id:'' || sessionStorage.getItem('id'),
    title:'' || sessionStorage.getItem('title')
}

const getters = {
    id:state=>state.id,
    title:state=>state.titlem
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
    //     sessionStorage.setItem('id',value)
    // },
    // SET_TITLE:(state,value)=>{
    //     state.title = value
    //     sessionStorage.setItem('title',value)
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