<template>
  <div class="main">
    <h1>{{ msg2 }} {{ msg }}</h1>
    <el-button @click="fn">ShowParams</el-button>
    <el-button @click="t">ShowRoute</el-button>
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
