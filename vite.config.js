/*
 * @Author: your name
 * @Date: 2021-04-22 14:57:38
 * @LastEditTime: 2021-04-23 11:34:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [vue()]
})
