<template>
  <el-button type="primary" @click="login">login</el-button>
  <upload-avatar/>
  <div>
    <el-button type="danger" @click="getApiToken"> getToken</el-button>
  </div>
  <h2/>
  <div>
    <el-button type="danger" @click="getSmt"> getSomething</el-button>
  </div>
  <h3/>
  <div>
    <el-upload
        action=""
        class="alignContainer"
        :http-request="upload"
        :show-file-list="false"
    >
      <div class="avatar-update">修改头像</div>
    </el-upload>
  </div>
</template>
<script>
import store from "@/store";
import UploadAvatar from "@/components/userInfo/uploadAvatar.vue";
import axios from "axios";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "debug",
  components: {UploadAvatar},
  data() {
    return {
      Axios: require('axios')
    }
  },
  created() {
    this.Axios.defaults.baseURL = 'https://sm.ms/api/v2';
    //this.Axios.defaults.headers.post['Authorization'] ="zA9LiKaoxc7WQFnsly3jGtmXJqurDSd4" ;

  },
  methods: {
    login() {
      store.commit('logIn', {
        userId: "1",
        userName: "赵泓青昀",
        userAvatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        isAdmin: true
      })
      console.log(store.state.logInfo)
    },
    getApiToken() {
      this.Axios({
        method: 'post',
        url: '/token',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          username: "G1ume",
          password: "woshizhqy193939"
        }
      }).then(res => {
        console.log(res)
        console.log(res.data.message)
        console.log(res.data.data.token)
        this.Axios({
          method: 'post',
          url: '/profile',
          headers: {
            //"Content-Type":"multipart/form-data",
            Authorization: res.data.data.token,
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getSmt() {
      this.Axios({
        method: 'post',
        url: '/profile',
        // headers: {
        //   Authorization: 'zA9LiKaoxc7WQFnsly3jGtmXJqurDSd4',
        // }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    },
    upload(file) {
      const formData = new FormData();
      //formData.append("smfile", file.file)
      //console.log(formData.get('smfile'))
      formData.append("image",file.file)
      console.log(formData.get('image'))
      console.log(file.file)
      this.Axios.post('https://api.imgbb.com/1/upload',formData,{
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

<style scoped>

</style>