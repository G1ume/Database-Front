<template>
  <el-upload
      action=""
      list-type="picture-card"
      :auto-upload="false"
  >
    <el-icon>
      <EditPen/>
    </el-icon>
  </el-upload>
</template>
<script setup>
import axios from "axios";

const upload = (file) => {
  const formData = new FormData();
  //formData.append("smfile", file.file)
  //console.log(formData.get('smfile'))
  axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    params: {
      key: "49ef2388d437cb4308b8a2668ebae97f",
      image: file.file,
    }
  }).then((res) => {
    console.log(res)
    console.log(res.data);
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

<style>

</style>