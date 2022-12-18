<template>
  <el-container>
    <el-aside width="300px">
      <el-image style="width: 300px; height: 300px"
                src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
                fit="cover"
      >
      </el-image>
    </el-aside>
    <el-container>
      <el-header>
        <h1>
          个人中心
        </h1>
      </el-header>
      <el-main>
        <div class="userInfo">

          <h1>name</h1>
          <h6>uid:123456</h6>

        </div>
        <el-divider/>
        <div class="">
          <el-button type="success" plain @click="toIndent">我的订单</el-button>
        </div>
        <h6></h6>
        <div class="myShare">
          <el-button type="success" plain @click="toShare">我的分享</el-button>
        </div>
      </el-main>
      <el-footer>
        <div>
          <el-button text @click="toEditUserInfo">修改个人信息</el-button>
        </div>
        <div>
          <el-button type="warning" @click="dialogVisible=true">注销</el-button>

        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

import {ref} from "vue";

const dialogVisible = ref(false)
export default {
  name: "PersonalCenter",
  methods: {
    toShare() {

    },
    toEditUserInfo() {

    },
    toIndent() {

    }
  }
}
</script>

<style scoped>

</style>