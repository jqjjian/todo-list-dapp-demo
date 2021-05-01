/*
 * @Author: your name
 * @Date: 2021-04-22 14:57:38
 * @LastEditTime: 2021-04-27 16:54:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import ElementPlus from 'element-plus'
import 'normalize.css/normalize.css'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/css/main.css'
const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.mount('#app')
