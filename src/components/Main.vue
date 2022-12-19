<template>

  <div class="main">

    <h1>{{ msg2 }} {{ msg }}</h1>
    <el-button @click="fn">ShowParams</el-button>
    <el-button @click="t">ShowRoute</el-button>
    <el-button @click="toLogin">login</el-button>
    <div class="block text-center">
    <span class="demonstration"
    >Switch when indicator is hovered (default)</span
    >
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
function t(){
  console.log("hello world")
  console.log(route.query)
}

console.log(route)
console.log(route.query)
//console.log(route.query.id)
</script>
<script>

export default {
  data() {
    return {
      msg2: this.$route.query.message,
      msg: 'Welcome to the main vue '
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
