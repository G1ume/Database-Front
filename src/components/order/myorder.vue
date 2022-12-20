<template>
  <el-container>
    <el-header>
      <h1>
        <span style="font-size: larger;font-weight: bolder">我的订单</span>
      </h1>
    </el-header>
    <el-main>
      <el-card>
        <el-table :data="myOrder">
          <el-table-column prop="pic" label="缩略图">
            <template #default="scope">
              <el-image
                  style="width: 50px ;height: 50px"
                  fit="cover"
                  :src="myOrder[scope.$index].pic"
              />
            </template>
          </el-table-column>
          <el-table-column prop="cid" label="衣服id">
          </el-table-column>
          <el-table-column prop="pri" label="订单总价">

          </el-table-column>
          <el-table-column prop="time" label="创建时间">

          </el-table-column>
          <el-table-column prop="" label="操作">
            <template #default="scope">
              <el-button @click="orderSample(scope.$index)" type="primary">查看详情</el-button>
              <el-button @click="buy" type="danger">结算</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import store from "@/store";
import qs from "qs";
import {ElMessage} from "element-plus";

export default {
  name: "myporder",
  data() {
    return {
      myOrder: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 2,
      headIndex: 0,
    }
  },
  methods: {
    demo() {
      this.myOrder = []
      for (let i = 0; i < 10; i++) {
        this.myOrder.push({
          did: i,
          sid: "卖家id" + i,
          cid: "衣服id" + i,
          pri: i * 100.3,
          status: 0,
          time: new Date(),
          num: i * 30,
          pic: store.state.testClothList[i],
        })
      }
    },
    async getOrder() {
      this.$axios(
          {
            method: 'post',
            url: '/find_all_order',
            data: qs.stringify({
              uid: store.state.logInfo.user_id
            })
          }
      ).then(res => {
        this.myOrder = []
        for (let i = 0; i < res.data.result.length; i++) {
          this.myOrder.push(
              {
                did: res.data.result[i].did,
                sid: res.data.result[i].sid,
                bid: res.data.result[i].bid,
                cid: res.data.result[i].cid,
                pri: res.data.result[i].pri,
                time: res.data.result[i].time,
                status: res.data.result[i].status,
                num: res.data.result[i].num,
                pic: res.data.result[i].pic
              })
        }
        console.log("获取订单列表成功!")
      }).catch(err => {
        console.log(err)
        ElMessage.error("获取订单列表失败！")
      })
    },
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.myOrder.length ? this.myOrder.length - this.headIndex : this.pageSize
    },
    orderSample(index) {
      this.$router.push({
        name: 'sampleOrder',
        query: {
          order: this.myOrder[index]
        }
      })
    }
  },
  created() {
    this.getOrder()
    //this.demo()
  }
}
</script>

<style scoped>

</style>