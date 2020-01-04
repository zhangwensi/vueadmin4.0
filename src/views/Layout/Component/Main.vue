<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  background-color: #f7f7f7;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $Header +30;
  padding-left: $MenuNav +30;
  padding-right: 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
