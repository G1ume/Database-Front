<template>
<el-page-header @back="goBack">

</el-page-header>
</template>

<script>
export default {
  name: "PageHeader",
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>