import {createStore} from 'vuex'
import Cookies from "js-cookie"
import qs from 'qs'

export default createStore({
    state: {
        // state里面定义了一些要使用的变量
        logInfo: {access_token: false, user_name: '游客', user_id: '',
            user_avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', admin: false},
        clothList:[],
        clothTypeList:[
            {label: "上衣", value: 1},
            {label: "长袖", value: 2},
            {label: "短袖", value: 3},
            {label: "下装", value: 4},
            {label: "长裤", value: 5},
            {label: "短裤", value: 6},
            {label: "鞋", value: 0},
        ],
    },
    mutations: {
        getLogInfo(state) {
            state.logInfo = qs.parse(Cookies.get("logInfo"))
        },
        logOut(state) {
            state.logInfo.access_token = false
            state.logInfo.user_name = '游客'
            state.logInfo.user_id = ''
            state.logInfo.user_avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            state.logInfo.isAdmin = false
            Cookies.set('logInfo', state.logInfo)
        },
        logIn(state, userInfo) {
            state.logInfo.access_token = true
            state.logInfo.user_avatar = userInfo.userAvatar
            state.logInfo.user_id =userInfo.userId
            state.logInfo.user_name = userInfo.userName
            state.logInfo.admin = userInfo.isAdmin

            Cookies.set('logInfo', state.logInfo)
        },
    }
})