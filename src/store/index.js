import {createStore} from 'vuex'
import Cookies from "js-cookie"

export default createStore({
    state: {
        // state里面定义了一些要使用的变量
        logInfo:{},
    },
    mutations: {
        getLogInfo(state){
            state.logInfo=Cookies.get("logInfo")
        }
    }
})