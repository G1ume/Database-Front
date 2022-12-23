<template>

  <div class="main">

    <h1>{{ msg }}</h1>
    <h6 v-show="online()">您好：{{getName()}}</h6>
    <el-divider/>
<!--    <el-button @click="fn">ShowParams</el-button>-->
<!--    <el-button @click="t">ShowRoute</el-button>-->
<!--    <el-button @click="toLogin">login</el-button>-->
    <div class="block text-center">
<!--    <span class="demonstration"-->
<!--    >Switch when indicator is hovered (default)</span-->

      <el-carousel height="750px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <el-image
          :src="item">

          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

</template>

<script>

import store from "@/store";

export default {
  data() {
    return {
      msg2: this.$route.query.message,
      msg: '欢迎来到OurCloth ',
      imgs:[
        "https://tse1-mm.cn.bing.net/th/id/OIP-C.UR-SLHIN9eLOjyNhKCGb4QHaLW?pid=ImgDet&rs=1",
        "https://img.zcool.cn/community/01eba55b9e894da8012099c8f8841b.jpg@1280w_1l_2o_100sh.jpg",
        "https://ts1.cn.mm.bing.net/th/id/R-C.7aecb298a0147ff308c211649c53f124?rik=yFAOjy35OEl%2fFw&riu=http%3a%2f%2fimg1.selfimg.com.cn%2fuedvoguecms%2f2019%2f11%2f19%2f1574121462_LQitYC.jpg&ehk=rC%2fBi%2bOCzoG7DmKqWxzFVqhNxvVmTFpweTlo2bg0WvM%3d&risl=&pid=ImgRaw&r=0",
        "https://ts1.cn.mm.bing.net/th/id/R-C.54421f052e8d0e617de24b463f098b5c?rik=ak%2fTvzJUWeHR%2fQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20210420ac%2f704%2fw640h864%2f20210420%2f783a-kpamyih6523432.jpg&ehk=V9xO6wEg%2bH3tigKHnnXF9TbzbT1U8mRK3CNpQftlbcw%3d&risl=&pid=ImgRaw&r=0"]
    }
  },
  methods: {
    fn: function () {
      console.log("this.$route")
      console.log(this.$route)
      //console.log(this.$route.query.password)
      //console.log(pwd)
    },
    toLogin:function () {
      this.$router.push({name:'Login'})
    },
    online(){
      return store.state.logInfo.access_token
    },
    getName(){
      return store.state.logInfo.user_name
    }
  }
}

</script>

<style>
.main {
  font-size: 30px;
  color: #000000;
}
</style>
