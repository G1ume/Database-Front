<template>
  <el-upload
      action=""
      list-type="picture-card"
      :http-reques="upload"
  >
    <el-icon>
      <EditPen/>
    </el-icon>
  </el-upload>
</template>
<script>
import store from "@/store";
import {ElMessage} from "element-plus";
import qs from "qs";

export default {
  name: "uploadAvatar",
  methods: {
    upload(file) {
      const formData = new FormData();
      formData.append("image", file.file)
      console.log("fk u")
      this.$axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: "b3af80c7860822bee54611e28f1261e2",
        }
      }).then((res) => {
        console.log(res.data.data.url);
        this.$axios({
          method: 'post',
          url: '/account/edit/pic',
          data:qs.stringify({
            nup: res.data.data.url,
            uid: store.state.logInfo.user_id
          })
        }).then(result => {
          console.log(result)
          if (result.data.result === 1) {
            store.commit('editUserAvatar',res.data.data.url)
            ElMessage.success('修改成功')
          } else {
            ElMessage.error("修改失败")
          }
        }).catch(err => {
          console.error(err)
          ElMessage.error("连接服务器失败")
        })
      }).catch(err => {
        console.log(err)
      })
    },
    fk(){
      let uid = store.state.logInfo.user_id
      this.$axios({
        method: 'post',
        url: '/account/edit/pic',
        data:qs.stringify({
          nup: "https://i.ibb.co/Pzrphkj/1.jpg",
          uid: uid
        })
      }).then(result => {
        console.log(uid)
        console.log(result)
        if (result.data.result === 1) {
          store.commit('editUserAvatar',"https://i.ibb.co/Pzrphkj/1.jpg")
          ElMessage.success('修改成功')
        } else {
          ElMessage.error("修改失败")
        }
      }).catch(err => {
        console.error(err)
        ElMessage.error("连接服务器失败")
      })
    }
  }
}
</script>

<style>

</style>