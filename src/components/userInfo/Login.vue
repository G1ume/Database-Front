<template>
  <el-container>
    <el-header>
      <span style="font-weight:900;font-size: 30px">登录</span>
    </el-header>
    <el-divider/>
    <el-main>
      <h1>请输入邮箱和密码</h1>
      <div>
        <el-input size="large" placeholder="请输入邮箱" v-model="name" clearable class="input_style">输入内容为：
        </el-input>
        <span v-if="error.name" class="err-msg">{{ error.name }}</span>
      </div>
      <h3/>
      <div>
        <el-input size="large" placeholder="请输入密码" v-model="pwd" show-password class="input_style"></el-input>
        <span v-if="error.pwd" class="err-msg">{{ error.pwd }}</span>
      </div>
      <h3/>
      <div>
        <el-button type="primary" @click="login" class="login_style">登录</el-button>
      </div>
      <p/>
      <div>
        <el-row :gutter="15">
          <el-col :span="10"/>
          <el-col :span="0.5"><span style="font-size: 16px" >没有账号？</span></el-col>
          <el-col :span="0.5">
            <el-link style="font-size:16px" type="primary" @click="toRegister">立即注册</el-link>
          </el-col>
          <el-col :span="11"/>
        </el-row>
      </div>
    </el-main>
  </el-container>
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
                case 0: {
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
                case 3: {
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

