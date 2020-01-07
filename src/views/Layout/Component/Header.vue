<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="changeNav">
      <svg-icon className="menu" iconClass="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="@/assets/user.jpg" alt="">
        {{userRole}}
      </div>
      <div class="exit-icon pull-right">
        <svg-icon className="exit" iconClass="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed } from '@vue/composition-api'
import { mapState , mapMutations ,mapActions } from 'vuex' 
export default {
  name: 'Header',
  setup(props, { root ,refs}){
    const userRole = computed(() =>{
      return root.$store.state.app.username
    })
    const changeNav = ()=> {
      // root.$store.commit('SET_COLLOSPE')
      root.$store.commit('app/SET_COLLOSPE') //使用Vuex的命名空间更安全
    }

    return {
      changeNav,
      userRole
    }
  }
};
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
  // -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);  v-2019-12-29老版本
  @include webkit(box-shadow,0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition,all 0.3s ease 0s);
  line-height: 75px;
  svg {
    width: 25px;
    height: 25px;
    font-size: 25px;
    cursor: pointer;
    margin-bottom: -8px;
  }
}
.header-icon {
  padding: 0 32px;
}
.user-info {
  padding: 0 28px;
  border-right: 1px solid #f7f7f7;
  img {
    width: 25px;
    border-radius: 50%;
    padding: 0px 28px;
    margin-bottom: -8px;
  }
}
.exit-icon {
  padding: 0 28px;
  + svg {
    margin-bottom: -8px;
  }
}
.open {
  #header-wrap {
    left: $MenuNav;
  }
}
.close {
  #header-wrap {
    left: $MinMenu;
  }
}
</style>
