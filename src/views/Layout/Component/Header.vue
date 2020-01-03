<template>
  <div id="header-wrap">
    头部
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scopde>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0px;
  left: $MenuNav;
  right: 0px;
  height: 75px;
  background-color: #fff;
  // -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>
