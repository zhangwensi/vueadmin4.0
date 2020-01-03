<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      default: ''
      // required: true,
      // validator: ()=>{}
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 计算属性 拼出最终结果
    const svgName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.iconClass) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      svgClass,
      svgName
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: #fff;
}
</style>
