import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/allMain.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            meta:{
                keepalive:false
            }
        },
        {
            path: '/Main',
            name: 'Main',
            component: Main,
            meta:{
                keepalive:true
            }
        }
    ]
})

