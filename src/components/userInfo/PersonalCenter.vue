<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        个人中心
      </span>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="6"/>
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <h2/>
            <el-avatar :size="150" :src="getAvatar()" fit="cover"/>
            <div style="padding: 14px">
              <span style="font-size: larger;font-weight: bolder">{{ getName() }}</span>
              <h3/>
              <div/>
              <span style="font-size:15px">Email:{{ getId() }}</span>
              <h3/>
              <div>
                <el-button text @click="toEditUserInfo">修改个人信息</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"/>
      </el-row>
      <h6></h6>

      <div class="">
        <el-button type="success" plain @click="toUpgood">上架商品</el-button>
      </div>
      <h6></h6>

      <div class="">
        <el-button type="success" plain @click="Upinggood">已上架商品</el-button>
      </div>
      <h6></h6>

      <div class="">
        <el-button type="success" plain @click="toIndent">我的订单</el-button>
      </div>
      <h6></h6>

      <div class="myShare">
        <el-button type="success" plain @click="toUpshare">去分享</el-button>
      </div>
      <h6></h6>

      <div class="myShare">
        <el-button type="success" plain @click="Upingshare" v-if="isuser">分享</el-button>
        <el-button type="success" plain @click="Upingshare" v-if="!isuser">被举报的分享</el-button>
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
      isuser: !store.state.logInfo.admin,
      name: '用户昵称',
      userId: 0,
      defaultSrc: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
      dialogVisible: false,
    }
  },
  created() {

  },
  methods: {
    Upingshare() {
      this.$router.push({
        name: "upingshare"
      })
    },
    toUpshare() {
      this.$router.push({
        name: "upshare"
      })
    },
    Upinggood() {
      this.$router.push({
        name: "upinggood"
      })
    },
    toUpgood() {
      this.$router.push({
        name: "upgood"
      })
    },
    toEditUserInfo() {
      this.$router.push({
        name: "EditUserInfo"
      })
    },
    toIndent() {
      this.$router.push({
        name: "myorder"
      })
    },
    toOffLine() {
      store.commit("logOut")
      this.dialogVisible = false
      this.$router.push({name: 'Main'})
    },
    getAvatar() {
      return store.state.logInfo.user_avatar
    },
    getName() {
      return store.state.logInfo.user_name
    },
    getId() {
      return store.state.logInfo.user_id
    },
    online() {
      return store.state.logInfo.access_token
    }
  }
}
</script>

<style scoped>

</style>