<template>
  <el-upload
      class="upload-demo"
      action=""
      show-file-list
      accept=".jpg,.png,.jpeg"
      on-preview=""
      list-type="picture-card"
      :auto-upload="false"
      :multiple="false"
      :limit="1"
      :http-request="upload"
  >
    <el-icon>
      <Plus/>
    </el-icon>

    <template #file="{file}">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>

  <span class="dialog-footer">
    <el-button @click="avatarLoading = false">取消</el-button>
    <el-button type="primary" @click="uploadAvatar">
      确认
    </el-button>
  </span>
  <el-upload
      action=""
      class="alignContainer"
      :http-request="upload"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
  >
    <div class="avatar-update">修改头像</div>
  </el-upload>

</template>
<script setup>
import axios from "axios";

const upload = (file) => {
  const formData = new FormData();
  formData.append('key', "49ef2388d437cb4308b8a2668ebae97f")
  formData.append('image', file.file)
  formData.append('name', "ce ni ma")
  console.log(formData)
  axios({
    method: 'post',
    url: "https://api.imgbb.com/1/upload",
  }, {timeout: 2000}).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
}
</script>
<script>
export default {
  name: "uploadAvatar",

  methods: {}
}
</script>

<style scoped>

</style>