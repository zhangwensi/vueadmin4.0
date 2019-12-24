<template>
    <div id="main-wrap">
        <router-view />
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    position: fixed;
    top: 75px;
    right: 0px;
    left: $MenuNav;
    bottom: 0px;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    // -webkit-box-sizing: border-box;
}
</style>