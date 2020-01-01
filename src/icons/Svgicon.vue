<template>
    <div>
        <svg :class="svgClass" aria-hidden="true">
            <use :xlinkhref="name"></use>
        </svg>
    </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
    name: 'svgIcon',
    setup(){
        const msg = ref('dsadsad')
        return {
            msg
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>