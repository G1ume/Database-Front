// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {createApp} from 'vue'
import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import App from './App'
import router from './router/index'

//Vue.config.productionTip = false;

//Vue.use(ElementUI)
const app = createApp(App)
app.use(router)
app.mount('#app')
/* eslint-disable no-new */
/*
var app = new Vue({
    el: '#app',
    // 创建和挂载根实例
    router,
    components: {App},
    template: '<App/>'
})
*/




