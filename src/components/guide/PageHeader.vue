<template>
<el-page-header @back="goBack">
  <template #content>
    <div class="flex items-center">
      <el-avatar
          class="mr-3"
          :size="32"
          :src="getAvatar()"
      />
      <span class="text-large font-600 mr-3"> 欢迎回来 </span>
      <el-tag v-if="isAdmin()" type="danger">{{ getName() }}</el-tag>
      <el-tag v-if="!isAdmin()" >{{ getName() }}</el-tag>
    </div>
  </template></el-page-header>
</template>

<script>
import store from "@/store";

export default {
  name: "PageHeader",
  methods:{
    isAdmin(){
      return store.state.logInfo.admin
    },
    goBack(){
      this.$router.go(-1)
    },
    getAvatar(){
      return store.state.logInfo.user_avatar
    },
    getName(){
      return store.state.logInfo.user_name
    }
  }
}
</script>

<style scoped>

</style>