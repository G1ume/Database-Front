<template>
  <div class="main">
    <h1>{{ msg2 }} {{ msg }}</h1>
    <el-button @click="fn">ShowParams</el-button>
    <el-button >ShowRoute</el-button>
  </div>
</template>
<script>
import {useRoute} from "vue-router";
export default {
  data() {
    return {
      msg2: this.$route.params.username,
      msg: 'Welcome to the main vue '
    }
  },
  setup() {
    const route = useRoute()
    console.log(route)
    console.log(route.query)
    console.log(route.query.id)
  },
  methods: {
    fn: function () {
      console.log("this.$route")
      console.log(this.$route)
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
