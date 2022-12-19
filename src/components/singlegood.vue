<template>
  <el-container>

  </el-container>
</template>
<style>


.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
<script>
export default {
  data() {
    return {
      o:[
        {img:""},
        {name:""}
      ]
    }
  }
  ,
  methods: {
    query: function () {
      //console.log(this.$route.query.password)
      //console.log(pwd)
    },

  },
  created() {

  }
}
</script>