<template>
  <el-upload
      action=""
      list-type="picture-card"
      :auto-upload="false"
      :http-reques="upload"
  >
    <el-icon>
      <EditPen/>
    </el-icon>
  </el-upload>
</template>
<script>
export default {
  name: "uploadAvatar",
  methods: {
    upload(file) {
      const formData = new FormData();
      formData.append("image",file.file)
      this.$axios.post('https://api.imgbb.com/1/upload',formData,{
        params: {
          key: "b3af80c7860822bee54611e28f1261e2",
        }
      }).then((res) => {
        console.log(res)
        console.log(res.data.data.url);
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>