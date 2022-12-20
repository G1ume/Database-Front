import {createStore} from 'vuex'
import Cookies from "js-cookie"
import qs from 'qs'

export default createStore({
    state: {
        // state里面定义了一些要使用的变量
        logInfo: {access_token: false, user_name: '游客', user_id: '',
            user_avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', admin: false},
        clothList:[],
        pagecfg:{pagesize:3},
        clothTypeList:[
            {label: "上衣", value: 1},
            {label: "长袖", value: 2},
            {label: "短袖", value: 3},
            {label: "下装", value: 4},
            {label: "长裤", value: 5},
            {label: "短裤", value: 6},
            {label: "鞋", value: 0},
        ],
        testClothList:[
            "https://pic2.zhimg.com/1ccca1f0ff810d3a319206114c1174a1_r.jpg?source=1940ef5c",
            "https://pic3.zhimg.com/v2-fb4a711b0e98565b5046fe532d33cf32_r.jpg",
            "https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/faf2b2119313b07e3ca515b10cd7912397dd8c6b.jpg",
            "https://img.zcool.cn/community/016bb45aae0236a80120be14708b57.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/01ec3c5de8caffa8012095687d15db.jpg@1280w_1l_2o_100sh.jpg",
            "https://ts1.cn.mm.bing.net/th/id/R-C.80fec10a165fffba132f12d51145c2e3?rik=Fgcgx9%2ba6M%2bLWg&riu=http%3a%2f%2fimg.china.alibaba.com%2fimg%2fibank%2f2013%2f489%2f359%2f1059953984_198386960.jpg&ehk=OgnZ3zvIBbd%2fhOqAbYogVwiIttVwOshRPMsOgMgjdyM%3d&risl=&pid=ImgRaw&r=0",
            "https://img95.699pic.com/element/40108/0378.png_860.png",
            "https://img.alicdn.com/bao/uploaded/i1/2351667738/O1CN01pwKfXO2723NgMMcRx_!!0-item_pic.jpg",
            "https://img.alicdn.com/bao/uploaded/i3/1081711059/O1CN01rKidHr1Jh409lCeh9_!!1081711059.jpg",
            "https://t00img.yangkeduo.com/goods/images/2020-04-26/1a7189885390dc552e30e77ecca3dcc6.jpeg"
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
            state.logInfo.admin = false
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