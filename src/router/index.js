import Vue from 'vue'
//import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/allMain.vue'

import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()
const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
        keepalive: false
    }
},
    {
        path: '/Main',
        name: 'Main',
        component: Main,
        meta: {
            keepalive: true
        }
    }]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router
//Vue.use(Router)

