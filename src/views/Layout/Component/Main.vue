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
  @include webkit(box-sizing,border-box);
  @include webkit(transition,all 0.3s ease 0s);
  // box-sizing: border-box;  v-2020-0104 版本
  // -webkit-box-sizing: border-box; v-2020-0104 版本
}
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 30px 30px 0 30px;
  @include webkit(box-sizing,border-box);
  // box-sizing: border-box; v-2020-0104 版本
  // -webkit-box-sizing: border-box; v-2020-0104 版本
}
.open {
  .main-content {
    padding-left: $MenuNav +30;
  }
}
.close {
  .main-content {
    padding-left: $MinMenu + 30;
  }
}
</style>
