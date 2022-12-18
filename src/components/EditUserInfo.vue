<template>
  <el-container>
    <el-aside width="300px">
      <el-button type="primary" plain @click="goBack"><el-icon><ArrowLeftBold /></el-icon>返回</el-button>
<!--      拖拽-->
    </el-aside>

    <el-container>
      <el-header>
        <h1>
          修改个人信息
        </h1>
      </el-header>
      <el-main>
        <div class="userInfo">
          <el-input  placeholder="请输入新昵称" v-model="nun" clearable class="input_style"></el-input>
          <h6/>
          <el-button type="primary" @click="changename">修改昵称</el-button>
          <h6/>
          <el-input v-model="oldpwd" placeholder="请输入原密码" show-password class="input_style"></el-input>
          <h6/>
          <el-input v-model="newpwd" placeholder="请输入新密码" show-password class="input_style"></el-input>
          <h6/>
          <el-input v-model="conpwd" placeholder="请确认新密码" show-password class="input_style"></el-input>
          <h6/>
          <el-button type="success" @click="changepwd">修改密码</el-button>
        </div>
        <el-divider/>
      </el-main>

    </el-container>
  </el-container>



</template>

<script>
import qs from "qs";

export default {

  name: "EditPersonalCenter",
  data(){
    return{
      nun:"",
      oldpwd:"",
      newpwd:"",
      conpwd:""
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    changepwd: function () {
      this.$axios({
        methods: 'post',
        url: '/edit/',
        data: qs.stringify({
          uid: this.name,
          oldpwd: this.oldpwd,
          newpwd:this.newpwd
        }),
        timeout: 1000,
      })
          .then(res => {
            //要改
            switch (res.data.ustate) {
              case 0: {
                this.$router.push({
                  name: "Main",
                  params: {
                    username: this.name
                  }
                });
                break;
              }
              default: {
                this.$router.push({
                  name: "Main",
                  params: {
                    username: "shit"
                  }
                });
                break;
              }
            }
          })
          .catch(err => {
                console.log(err);
                this.$router.push({
                  name: "Main", query: {
                    password: this.pwd,
                    id: "this is id"
                  }
                });
              }
          )
    },
    changename:function () {

    },
    changepicture:function () {

    }
  }

}
</script>

<style scoped>

</style>