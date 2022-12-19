<template>
  <div id="app">
    <div class="common-layout">
      <el-container v-if="$route.meta.keepalive">
        <el-header>
          <Top/>
        </el-header>
      </el-container>
      <el-container v-if="!$route.meta.keepalive">
        <el-header>
          <PageHeader/>
        </el-header>
      </el-container>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Top from "@/components/guide/Top.vue"
import PageHeader from "@/components/guide/PageHeader.vue";

export default {
  name: 'App',
  components: {
    PageHeader,
    'Top': Top
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
