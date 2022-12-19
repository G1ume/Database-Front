<template>
  <el-container>
    <el-header>
      <h1>
        个人中心
      </h1>
    </el-header>
    <el-main>
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <h2/>
        <el-avatar :size="150" :src=defaultSrc fit="cover"/>
        <div style="padding: 14px">
          <span style="font-size: larger">{{ name }}</span>
          <div/>
          <span style="font-size: small">uid:{{ userId }}</span>
          <div class="bottom">
            <el-button text @click="toEditUserInfo">修改个人信息</el-button>
          </div>
        </div>
      </el-card>
      <h6></h6>
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
        <el-button type="warning" @click="dialogVisible = true">注销</el-button>
        <el-dialog
            v-model="dialogVisible"
            title="请注意！"
            width="25%">
          <span style="font-size: 15px">确定要注销吗？</span>
          <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="toOffLine">
                  确认
                </el-button>
              </span>
          </template>
        </el-dialog>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import store from "@/store";

export default {
  name: "PersonalCenter",
  data() {
    return {
      name: '用户昵称',
      userId: 0,
      defaultSrc: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
      dialogVisible:false,
    }
  },
  created() {

  },
  methods: {
    toShare() {

    },
    toEditUserInfo() {
      this.$router.push({
        name: "EditUserInfo"
      })
    },
    toIndent() {

    },
    toOffLine() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>