<template>
    <div id="nav-wrap">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" text-color="#fff">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
    setup(props, {refs, root}) {
        const isCollapse = ref(false)
        return {
            isCollapse
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    width: $MenuNav;
    height: 100vh;
    background-color: #344a5f;
}
</style>