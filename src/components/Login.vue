<template>
  <div class="login">
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
  </div>
</template>
<script>
import qs from "qs"

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
      this.$axios({
        methods:'post',
        url: '/login/',
        data: qs.stringify({
          uid: this.name,
          upwd: this.pwd
        })
      }).then(res=>{
        switch (res.data.ustate){
          case 0:{
            this.$router.push({
                 name: "Main",
                 params: {
                   username: this.name
                 }
               });
            break;
          }
          default:{
            this.$router.push({
              name: "Login",
              params: {
                username: this.name
              }
            });
            break;
          }
        }
      } )
      // this.$router.push({
      //   name: "Main",
      //   params: {
      //     username: this.name
      //   }
      // });
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

