<template>
  <el-container>
    <el-header>
      <span style="font-weight:900;font-size: 30px">注册您的账号</span>
    </el-header>
    <el-divider/>
    <el-main>
      <div>
        <el-input size="large" style="width: 250px;" placeholder="昵称" v-model="n" clearable :maxlength="16"
                  class="input_style"></el-input>
        <span v-if="error.n" class="err-msg">{{ error.n }}</span>
      </div>
      <div class="input-userId">
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-input size="large" style="width: 250px;" placeholder="邮箱地址" v-model="uid" clearable :maxlength="16"
                      class="input_style">
            </el-input>
            <span v-if="error.uid" class="err-msg">{{ error.uid }}</span>
          </el-col>
          <el-col :span="8"/>
        </el-row>
      </div>
      <div class="input-password">
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-input size="large"
                      style="width: 250px;"
                      placeholder="密码(8-16个字符组成，区分大小写)"
                      v-model="pwd"
                      show-password
                      class="input_style"
                      :maxlength="16"
            >
            </el-input>
            <span v-if="error.pwd" class="err-msg">{{ error.pwd }}</span></el-col>
          <el-col :span="1">
            <el-button v-show="is_password_legal()" size="large" icon="Check" circle type="success"/>
            <el-tooltip
                class="box-item"
                effect="light"
                content="密码长度应在8-16位"
                placement="right"
            >
              <el-button v-show="pwd_show()" size="large" icon="Close" circle type="danger"/>
            </el-tooltip>
          </el-col>
          <el-col :span="8"/>
        </el-row>
      </div>
      <div class="input-password-confirm">
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-input size="large" style="width: 250px;" placeholder="确认密码" v-model="cfmpwd"
                      show-password class="input_style">
            </el-input>
            <span v-if="error.cfmpwd" class="err-msg">{{ error.cfmpwd }}</span>
          </el-col>
          <el-col :span="1">
            <el-button v-show="password_confirm()" size="large" icon="Check" circle type="success"/>
            <el-tooltip
                class="box-item"
                effect="light"
                content="两次输入密码不同"
                placement="right"
            >
              <el-button v-show="pwd_cfm_show()" size="large" icon="Close" circle type="danger"/>
            </el-tooltip>
          </el-col>
          <el-col :span="8"/>
        </el-row>

      </div>
      <div>
        <el-button type="primary" @click="register" class="login_style">注册</el-button>
      </div>
    </el-main>
  </el-container>

</template>
<script>
import qs from "qs";
import {ElMessage} from "element-plus";
import store from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      uid: '',
      pwd: '',
      n: '',
      cfmpwd: '',
      error: {
        uid: '',
        pwd: '',
        n: '',
        cfmpwd: '',
      }
    }
  },
  methods: {
    pwd_show() {
      return (this.pwd.length > 0 && !this.is_password_legal())
    },
    is_password_legal() {
      return this.pwd.length >= 8 && this.pwd.length <= 16
    },
    pwd_cfm_show() {
      return (this.cfmpwd.length > 0 && !this.password_confirm())
    },
    password_confirm() {
      if (this.pwd.length >= 8 && this.cfmpwd.length >= 8) {
        return this.pwd === this.cfmpwd;
      } else {
        return false
      }
    },
    register: function () {
      if (this.uid === '' || this.pwd === '' || this.n === '') {
        ElMessage.error("用户名或密码不能为空！")
        return
      }
      if (!this.password_confirm()) {
        ElMessage.error("请检查输入选项")
        return;
      }
      this.$axios({
        method: 'post',
        url: '/register',
        data: qs.stringify({
          uid: this.uid,
          upwd: this.pwd,
          un: this.n,
          up:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        }),
        timeout: 1000,
      }).then(res => {
        switch (res.data.result) {
          case 0:
            console.log(res.data.message)
            ElMessage.error('注册失败:' + res.data.message)
            break
          case 2:
            ElMessage({
              message: res.data.message,
              type: 'success',
            })
            store.commit("logIn", {
              userId: res.data.uid,
              userName: res.data.un,
              userAvatar: res.data.up,
              isAdmin: false
            })
            this.$router.push({
              name: "Main"
            })
            break
          default:
            console.log(res)
            ElMessage.error('不知道发生了什么错误TAT')
            break
        }
      }).catch(err => {
        console.log(err)
        if (err.code === 'ECONNABORTED') {
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