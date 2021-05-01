/*
 * @Author: your name
 * @Date: 2020-11-16 21:20:50
 * @LastEditTime: 2021-04-27 15:47:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/tcth-ux-commom/src/route/index.js
 */
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
// import Layout from '@/views/index.vue'

// 解决重复push相同路由报错的问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/redirect',
    //     component: Layout,
    //     meta: { hidden: true },
    //     children: [
    //         {
    //             path: '/redirect/:path(.*)',
    //             component: () => import('@/views/common/redirect.vue')
    //         }
    //     ]
    // },
    {
        path: '/',
        name: 'root',
        label: '首页',
        redirect: '/todo-list',
        component: () => import('../components/Container.vue'),
        children: [
            {
                path: '/todo-list',
                name: 'home',
                component: () => import('@/views/TodoList/index.vue'),
                meta: {
                    hidden: true,
                    name: '任务列表',
                    index: '/todo-list'
                    // icon: 'el-icon-box'
                }
            }
        ]
    }
    //     children: [
    //         {
    //             path: '/home/index',
    //             name: 'index',
    //             label: '首页',
    //             meta: {
    //                 name: '首页',
    //                 icon: 'el-icon-s-custom',
    //                 index: '/home',
    //                 show: false
    //             },
    //             component: () => import('@/views/home.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('@/views/login.vue')
    // },
    // {
    //     path: '/404',
    //     name: '404',
    //     component: () => import('@/views/common/404.vue')
    // }
]
const router = createRouter({
    // mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     const routeName = to.meta.name || to.name
//     window.document.title = (routeName ? routeName + ' - ' : '') + '会计管理系统'
//     next()
// })

export default router
