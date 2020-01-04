<template>
  <div id="nav-wrap">
    <div class="logo-wrap"><img class="logo"  src="@/assets/navLogo.jpg" alt=""></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-for="(item, index) in routerdata">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  setup(props, { refs, root }) {
    const isCollapse = ref(false);
    // 获取路由信息
    const routerdata = reactive(root.$router.options.routes);
    console.log(routerdata);
    return {
      isCollapse,
      routerdata
    };
  }
};
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
  .logo-wrap {
    text-align: center;
    .logo {
      width: 92px;
      margin: 28px auto 28px;
    }
  }
  .el-menu {
    border-right: none;
  }
  svg {
    font-size: 12px;
    margin-right: 14px;
    margin-bottom: 1px;
    &.svg-icon {
      width: 1em;
      height: 1em;
      fill: currentColor;
      color: #fff;
    }
  }
  li.el-submenu, .logo-wrap {
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }
}
</style>
