<template>
  <el-container>
    <el-aside width="300px">
      <el-button type="primary" plain @click="goBack">
        <el-icon>
          <ArrowLeftBold/>
        </el-icon>
        返回
      </el-button>
      <!--      拖拽-->
      <h1/>
      <el-avatar :size="150" :src=defaultSrc fit="cover"/>
    </el-aside>

    <el-container>
      <el-header>
        <span style="font-size: 30px">
          修改个人信息
        </span>
      </el-header>
      <el-main>
        <div class="userInfo">
          <el-input placeholder="请输入新昵称" v-model="nun" clearable class="input_style"></el-input>
          <h6/>
          <el-button type="primary" @click="changename"><el-icon><EditPen /></el-icon>修改昵称</el-button>
          <h6/>
          <el-input v-model="oldpwd" placeholder="请输入原密码" show-password class="input_style"></el-input>
          <h6/>
          <el-input v-model="newpwd" placeholder="请输入新密码" show-password class="input_style"></el-input>
          <h6/>
          <el-input v-model="conpwd" placeholder="请确认新密码" show-password class="input_style"></el-input>
          <h6/>
          <el-button type="success" @click="changepwd"><el-icon><EditPen /></el-icon>修改密码</el-button>
        </div>
        <el-divider/>
      </el-main>

    </el-container>
  </el-container>


</template>

<script>
import {ElMessage} from "element-plus";
import qs from "qs";

export default {

  name: "EditPersonalCenter",
  data() {
    return {
      nun: "",
      oldpwd: "",
      newpwd: "",
      conpwd: "",
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changepwd: function () {
      this.$axios({
        methods: 'post',
        url: '/edit/',
        data: qs.stringify({
          uid: this.name,
          oldpwd: this.oldpwd,
          newpwd: this.newpwd
        }),
        timeout: 1000,
      })
          .then(res => {
            //要改
            switch (res.data.ustate) {
              case 0: {

                break;
              }
              default: {

                break;
              }
            }
          })
          .catch(err => {
                console.log(err)
                if (err.code === 'ECONNABORTED') {
                  ElMessage.error('服务器响应超时！')
                }
              }
          )
    },
    changename: function () {

    },
    changepicture: function () {

    }
  }

}
</script>

<style scoped>

</style>