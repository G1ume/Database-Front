<template>
  <div class="main">
    <h1>{{ fk }}{{msg}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to the main vue ',
      fk:this.$route.toString()
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
