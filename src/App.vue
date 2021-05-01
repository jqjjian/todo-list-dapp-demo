<!--
 * @Author: your name
 * @Date: 2021-04-22 14:57:38
 * @LastEditTime: 2021-04-27 16:50:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/src/App.vue
-->
<template>
    <router-view></router-view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
    setup() {
        const form = reactive({
            inputVlaue: ''
        })
        return {
            form,
            ...toRefs(form)
        }
    }
})
</script>

<style lang="postcss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
