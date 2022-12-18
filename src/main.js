// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import store from './store/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.provide('$axios', axios)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const LocalHost = 'http://localhost'
const wxpIp='http://10.128.50.151'
const DefaultPort= '8000'
axios.defaults.baseURL = LocalHost+':'+DefaultPort
app.config.globalProperties.$axios = axios // 使用globalProperties挂载，util全局挂在也一样


app.mount('#app')
