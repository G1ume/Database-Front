<template>

  <el-container>
    <el-header>
      <span style="font-weight: bold;font-size: 30px">
        编辑个人信息
      </span>
    </el-header>
    <el-main>
      <div class="userInfo">
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-card shadow="never" v-show="!isAdmin()">
              <el-avatar :size="150" :src="getAvatar()" fit="cover"/>
              <p/>
              <el-button type="primary" @click="avatarLoading = true" :loading="avatarLoading" text>
                <el-icon v-show="!avatarLoading">
                  <EditPen/>
                </el-icon>
                上传新头像
              </el-button>
              <el-dialog
                  v-model="avatarLoading"
                  title="上传新头像！"
                  width="20%"
              >
                <el-upload
                    action=""
                    class="alignContainer"
                    :http-request="upload"
                    :show-file-list="false"
                >
                  <div class="avatar-update">选择文件</div>
                </el-upload>
              </el-dialog>
            </el-card>
          </el-col>
          <el-col :span="8"/>
        </el-row>
        <h6/>
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-card shadow="never" v-show="!isAdmin()">
              <span style="font-weight: bold;font-size: large">{{ getName() }}</span>
              <p/>
              <el-input placeholder="请输入新昵称" v-model="nun" clearable class="input_style"></el-input>
              <p/>
              <el-button type="primary" @click="changeName" :loading="nameLoading" text>
                <el-icon v-show="!nameLoading">
                  <EditPen/>
                </el-icon>
                修改昵称
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8"/>
        </el-row>
        <h6/>
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-card shadow="never">
              <el-input v-model="oldpwd" placeholder="请输入原密码" show-password class="input_style"></el-input>
              <h6/>
              <el-input v-model="newpwd" placeholder="请输入新密码" show-password class="input_style"></el-input>
              <h6/>
              <el-input v-model="conpwd" placeholder="请确认新密码" show-password class="input_style"></el-input>
              <p/>
              <el-button type="danger" @click="changePwd" :loading="pwdLoading" text>
                <el-icon v-show="!pwdLoading">
                  <EditPen/>
                </el-icon>
                修改密码
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8"/>
        </el-row>
      </div>
      <el-divider/>
    </el-main>
  </el-container>

</template>

<script>
import qs from "qs";
import {ElMessage} from "element-plus";
import store from "@/store";
import UploadAvatar from "@/components/userInfo/uploadAvatar.vue";

export default {
  name: "EditPersonalCenter",
  components: {UploadAvatar},
  data() {
    return {
      nun: "",
      oldpwd: "",
      newpwd: "",
      conpwd: "",
      pwdLoading: false,
      nameLoading: false,
      avatarLoading: false,
    }
  },
  methods: {
    upload(file) {
      const formData = new FormData();
      formData.append("image", file.file)
      this.$axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: "b3af80c7860822bee54611e28f1261e2",
        }
      }).then((res) => {
        console.log(res.data.data.url);
        this.$axios({
          method:'post',
          url:'/account/edit/pic',
          data:qs.stringify({
            uid:store.state.logInfo.user_id,
            nup:res.data.data.url
          })
        }).then(result=>{
          if(result.data.result===1){
            store.commit('editUserAvatar',res.data.data.url)
            ElMessage.success("修改头像成功")
            this.avatarLoading=false
          }else{
            ElMessage.error("修改失败")
          }
        }).catch(err=>{
          console.log(err)
          ElMessage.error("服务器响应失败！")
        })
      }).catch(err => {
        console.log(err)
        ElMessage.error("图床服务器响应失败！")
      })
    },
    isAdmin(){
      return store.state.logInfo.admin
    },
    getName() {
      return store.state.logInfo.user_name
    },
    getAvatar() {
      return store.state.logInfo.user_avatar
    },
    changePwd() {
      this.pwdLoading = true
      this.$axios({
        method: 'post',
        url: '/account/edit/pwd',
        data: qs.stringify({
          uid: store.state.logInfo.user_id,
          oldpwd: this.oldpwd,
          newpwd: this.newpwd
        }),
        timeout: 1500,
      })
          .then(res => {
            //要改
            this.pwdLoading = false
            switch (res.data.result) {
              case 0: {
                ElMessage.error(res.data.message)
                break;
              }
              case 1: {
                ElMessage.success("修改密码成功！")
                break;
              }
              default: {
                ElMessage.error("密码修改失败！")
                break;
              }
            }
          })
          .catch(err => {
                console.error(err)
                this.pwdLoading = false
                if (err.code === 'ECONNABORTED') {
                  ElMessage.error("服务器响应超时！")
                }
              }
          )
    },
    changeName() {
      if (this.nun.length === 0) {
        return
      }
      if (this.nun.length > 16) {
        ElMessage.error("修改昵称失败:昵称过长！")
        return
      }
      if (this.nun === store.state.logInfo.user_name) {
        ElMessage.error("修改昵称失败:新旧昵称相同！")
        return;
      }
      this.nameLoading = true
      this.$axios({
        method: 'post',
        url: '/account/edit/name',
        data: qs.stringify({
          uid: store.state.logInfo.user_id,
          nun: this.nun,
        }),
        timeout: 1500,
      })
          .then(res => {
            //要改
            this.nameLoading = false
            switch (res.data.result) {
              case 1: {
                store.commit('editUserName', this.nun)
                ElMessage.success("昵称修改成功！")
                break;
              }
              default: {
                ElMessage.warning("昵称修改失败！")
                break;
              }
            }
          })
          .catch(err => {
                console.error(err)
                this.nameLoading = false
                if (err.code === 'ECONNABORTED') {
                  ElMessage.error("服务器响应超时！")
                }
              }
          )
    },
  }

}
</script>

<style scoped>

</style>