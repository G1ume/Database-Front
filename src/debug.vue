<template>
<el-button type="primary" @click="login">login

</el-button>
  <upload-avatar/>
</template>

<script>
import store from "@/store";
import uploadAvatar from "@/components/userInfo/uploadAvatar.vue";
import UploadAvatar from "@/components/userInfo/uploadAvatar.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "debug",
  components: {UploadAvatar},
  setup(){

  },
  methods:{
    login(){
      store.commit('logIn',{userId:"1",userName:"赵泓青昀",userAvatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",isAdmin:true})
      console.log(store.state.logInfo)
    },
    getApiToken(){

    },
  }
}
</script>

<style scoped>

</style>