<template>
  <el-container>
    <h1>订单：{{ order.did }}</h1>
    <el-main>
      <el-card>

      </el-card>

    </el-main>
    <el-footer>
      <el-button type="danger" round @click="deleteOrder">删除</el-button>
      <el-button type="success" round @click="buy">确认购买</el-button>
    </el-footer>

  </el-container>
</template>

<script>
import qs from "qs";
import {ElMessage} from "element-plus";

export default {
  name: "sampleOrder",
  data() {
    return {
      order: {did:""},
    }
  },
  methods: {
    deleteOrder(){

    },
    buy(){

    },
  },
  created() {
    this.$axios({
      method: 'post',
      url: '',
      data: qs.stringify({
        did: this.$route.query.orderId
      })
    }, {timeout: 1000}).then(res => {
      if (res.data.result){
        this.order=res.data.order
      }
    }).catch(err=>{
      console.log(err)
      ElMessage.error("获取订单失败！")
    })
  }
}
</script>

<style scoped>

</style>