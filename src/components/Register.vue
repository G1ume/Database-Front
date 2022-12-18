<template>
  <div class="register">
    <div>
      <el-input placeholder="请输入昵称" v-model="n" clearable class="input_style"></el-input>
      <span v-if="error.n" class="err-msg">{{ error.n }}</span>
    </div>
    <div>
      <el-input placeholder="请输入用户Id" v-model="uid" clearable class="input_style">输入内容为：</el-input>
      <span v-if="error.uid" class="err-msg">{{ error.uid }}</span>
    </div>
    <div>
      <el-input placeholder="请输入密码" v-model="pwd" show-password class="input_style"></el-input>
      <span v-if="error.pwd" class="err-msg">{{ error.pwd }}</span>
    </div>
    <div>
      <el-button type="primary" @click="register" class="login_style">注册</el-button>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import {ElMessage} from "element-plus";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      uid: '',
      pwd: '',
      n:'',
      error: {
        uid: '',
        pwd: '',
        n:''
      }
    }
  },
  methods:{
    register:function (){
      if (this.uid==='' || this.pwd===''){
        ElMessage.error("用户名或密码不能为空！")
        return
      }
      this.$axios({
        method: 'post',
        url: '/register/',
        data: qs.stringify({
          nuid: this.uid,
          npwd: this.pwd,
          nun:this.n
        }),
        timeout: 1000,
      }).then(res => {
        switch (res.data.result) {
          case 0:
            console.log(res.data.message)
            ElMessage.error('注册失败:'+res.data.message)
            break
          case 1:
            ElMessage({
              message: res.data.message,
              type: 'success',
            })

            this.$router.push({
              name: "Main"
            })
            break
          default:
            ElMessage.error('不知道发生了什么错误TAT')
            break
        }
      }).catch(err => {
        console.log(err)
        if(err.code==='ECONNABORTED'){
          ElMessage.error('服务器响应超时！')
        }
      })
    }
  }
}
</script>

<style scoped>
.register {
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