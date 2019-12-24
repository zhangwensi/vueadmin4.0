<template>
    <div id="layout">
        <LayoutHeader/>
        <LayoutNav/>
        <LayoutMain/>
    </div>
</template>

<script>
import LayoutNav from '../Layout/Component/Nav'
import LayoutMain from '../Layout/Component/Main'
import LayoutHeader from '../Layout/Component/Header'
export default {
    name: 'home',
    components: { LayoutNav, LayoutMain, LayoutHeader},
    setup(props,{ root,refs }){

    }
}
</script>

<style lang="scss" scoped>

</style>