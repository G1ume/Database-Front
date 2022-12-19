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
            <el-card shadow="never">
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
                    class="upload-demo"
                    drag
                    action="https://api.imgbb.com/1/upload"
                    show-file-list
                    accept=".jpg,.png,.jpeg"
                    :auto-upload="false"
                    :multiple="false"
                    :limit="1"
                >
                  <el-icon class="el-icon--upload">
                    <upload-filled/>
                  </el-icon>
                  <div class="el-upload__text">
                    拖拽图片到此处 或 <em> 点击上传</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500kb
                    </div>
                  </template>
                </el-upload>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="avatarLoading = false">取消</el-button>
                    <el-button type="primary" @click="uploadAvatar">
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </el-card>
          </el-col>
          <el-col :span="8"/>
        </el-row>
        <h6/>
        <el-row>
          <el-col :span="8"/>
          <el-col :span="8">
            <el-card shadow="never">

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
          <el-col :span="8">

          </el-col>
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
          <el-col :span="8">
          </el-col>
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

export default {
  name: "EditPersonalCenter",
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
    goBack() {
      this.$router.go(-1)
    },
    getAvatar() {
      return store.state.logInfo.user_avatar
    },
    uploadAvatar() {
      console.log("上传")
      this.avatarLoading = false
    },
    changePwd() {
      this.pwdLoading = true
      this.$axios({
        methods: 'post',
        url: '/account/edit/pwd',
        data: qs.stringify({
          uid: this.name,
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
                this.$router.push({});
                break;
              }
              default: {

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
      this.nameLoading = true
      this.$axios({
        methods: 'post',
        url: '/account/edit/name',
        data: qs.stringify({
          uid: this.name,
          nun: this.nun,
        }),
        timeout: 1500,
      })
          .then(res => {
            //要改
            this.nameLoading = false
            switch (res.data.result) {
              case 1: {
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