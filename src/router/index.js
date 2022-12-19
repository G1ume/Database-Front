import Vue from 'vue'
//import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import register from "@/components/Register.vue";
import personalCenter from "@/components/PersonalCenter.vue";
import editUserInfo  from "@/components/EditUserInfo.vue"
import good from "@/components/Good.vue"
import singlegood from "@/components/singlegood.vue"
import {createRouter, createWebHistory} from 'vue-router'


const routerHistory = createWebHistory()
const routes = [{
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
        keepalive: false
    }
},
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/Register',
        name: 'Register',
        component: register,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/account/home',
        name: 'PersonalCenter',
        component: personalCenter,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/account/edit',
        name: 'EditUserInfo',
        component: editUserInfo,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/good',
        name: 'Good',
        component: good,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/good/single',
        name: 'singleGood',
        component: singlegood,
        meta: {
            keepalive: false
        }
    }
    ]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router
//Vue.use(Router)

