<template>
  <div id="layout" :class="[navStatus ? 'close':'open']">
    <LayoutHeader />
    <LayoutNav />
    <LayoutMain />
  </div>
</template>

<script>
import LayoutNav from "../Layout/Component/Nav";
import LayoutMain from "../Layout/Component/Main";
import LayoutHeader from "../Layout/Component/Header";
import { computed } from '@vue/composition-api'
export default {
  name: "home",
  components: { LayoutNav, LayoutMain, LayoutHeader },
  setup(props, { root, refs }) {
    const navStatus = computed(()=> root.$store.state.app.isCollapse)
    return {
      navStatus
    }
  }
};
</script>

<style lang="scss" scoped></style>
