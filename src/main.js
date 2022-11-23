// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.provide('$axios', axios)

axios.defaults.baseURL = 'http://localhost:8888'
app.config.globalProperties.$axios = axios // 使用globalProperties挂载，util全局挂在也一样


app.mount('#app')
