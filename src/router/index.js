import Vue from 'vue'
//import Router from 'vue-router'
import Login from '@/components/userInfo/Login.vue'
import Main from '@/components/Main.vue'
import register from "@/components/userInfo/Register.vue";
import personalCenter from "@/components/userInfo/PersonalCenter.vue";
import editUserInfo from "@/components/userInfo/EditUserInfo.vue"
import good from "@/components/goods/Good.vue"
import singlegood from "@/components/goods/singlegood.vue"
import goodbuy from "@/components/trade/buypage.vue"
import upgood from "@/components/goods/upgood.vue";
import upinggood from "@/components/goods/upinggood.vue";
import shares from "@/components/share/Shares.vue";
import upshare from "@/components/share/upshare.vue";
import myorder from "@/components/order/myorder.vue";
import message from "@/components/message/message.vue";
import {createRouter, createWebHistory} from 'vue-router'
import debug from "@/debug.vue";
import sampleOrder from "@/components/order/sampleOrder.vue";
import upingshare from "@/components/share/upingshare.vue";

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
        path: '/goods',
        name: 'Good',
        component: good,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/goods/sample',
        name: 'singleGood',
        component: singlegood,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/good/buy',
        name: 'goodbuy',
        component: goodbuy,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/good/up',
        name: 'upgood',
        component: upgood,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/good/uping',
        name: 'upinggood',
        component: upinggood,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/debug',
        name: 'debug',
        component: debug,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/share/up',
        name: 'upshare',
        component: upshare,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/share/uping',
        name: 'upingshare',
        component: upingshare,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/shares',
        name: 'shares',
        component: shares,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/account/order',
        name: 'myorder',
        component: myorder,
        meta: {
            keepalive: false
        }
    },
    {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/account/order/sample',
        name: 'sampleOrder',
        component: sampleOrder,
        meta: {
            keepalive: false
        }
    },
]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router
//Vue.use(Router)

