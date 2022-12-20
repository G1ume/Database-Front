<template>
  <div class="login">
    <h1>请登录</h1>
    <div>
      <el-input placeholder="请输入用户名" v-model="name" clearable class="input_style">输入内容为：</el-input>
      <span v-if="error.name" class="err-msg">{{ error.name }}</span>
    </div>
    <div>
      <el-input placeholder="请输入密码" v-model="pwd" show-password class="input_style"></el-input>
      <span v-if="error.pwd" class="err-msg">{{ error.pwd }}</span>
    </div>
    <div>
      <el-button type="primary" @click="login" class="login_style">登录</el-button>
    </div>
    <div>
      <p v-show="true"><span>没有账号？<el-link type="primary" @click="toRegister">立即注册</el-link></span></p>
    </div>
  </div>
</template>
<script>
import qs from "qs"
import {useRouter} from "vue-router"
import store from "@/store";
import {ElMessage} from "element-plus";

let router = useRouter()
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      name: '',
      pwd: '',
      error: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    login: function () {
      if (this.name === '' || this.pwd === '') {
        ElMessage.error("请输入用户名或密码!")
      } else {
        this.$axios({
          method: 'post',
          url: '/login',
          data: qs.stringify({
            uid: this.name,
            upwd: this.pwd
          }),
          timeout: 1000,
        })
            .then(res => {
              switch (res.data.result) {
                case 0:{
                  ElMessage.error("用户名或密码错误！")
                  break;
                }
                  //用户登录成功
                case 1: {
                  store.commit("logIn", {
                    userId: res.data.uid,
                    userName: res.data.un,
                    userAvatar: res.data.up,
                    isAdmin: false
                  })
                  this.$router.push({
                    name: "Main",
                  });
                  break;
                }
                //管理员登录成功
                case 3:{
                  store.commit("logIn", {
                    userId: res.data.uid,
                    userName: res.data.un,
                    userAvatar: res.data.up,
                    isAdmin: true
                  })
                  this.$router.push({
                    name: "Main",
                  });
                  break;
                }
                //登录失败
                default: {
                  console.log(res.data)
                  ElMessage.error("登录失败！用户不存在")
                  break;
                }
              }
            })
            .catch(err => {
                  console.log(err);
                  if (err.code === 'ECONNABORTED') {
                    ElMessage.error('服务器响应超时！')
                  }
                }
            )
      }
    },
    toRegister: function () {
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<style>
.login {
  margin-top: 200px;
}

.input_style {
  width: 200px;
  margin-bottom: 10px;
}

.login_style {
  width: 200px;
}
</style>

