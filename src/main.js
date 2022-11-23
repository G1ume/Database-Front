
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false;

Vue.use(ElementUI)

/* eslint-disable no-new */
var app = new Vue({
    el: '#app',
    /* 创建和挂载根实例 */
    router,
    components: { App },
    template: '<App/>'
})

