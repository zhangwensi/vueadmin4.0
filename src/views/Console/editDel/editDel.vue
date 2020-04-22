<template>
    <div>信息详情</div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
    name:'editDel',
    setup(props,{refs,root}) {
        let id = root.$route.params.id || root.$store.getters["Id"]
        let title = root.$route.params.title  || root.$store.getters["Title"]
    }
}
</script>

<style lang="scss">
    
</style>