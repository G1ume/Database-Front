<template>
  <el-upload
      class="upload-demo"
      action="https://api.imgbb.com/1/upload"
      show-file-list
      accept=".jpg,.png,.jpeg"
      on-preview=""
      list-type="picture-card"
      :auto-upload="false"
      :multiple="false"
      :limit="1"
  >
    <el-icon><Plus /></el-icon>

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

</template>

<script>
export default {
  name: "uploadAvatar"
}
</script>

<style scoped>

</style>