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
          <el-table-column prop="dcid" label="衣服id">
          </el-table-column>
          <el-table-column prop="dpri" label="订单总价">

          </el-table-column>
          <el-table-column prop="dti" label="创建时间">

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
          dsid: "卖家id" + i,
          dcid: "衣服id" + i,
          dpri: i * 100.3,
          dst: 0,
          dti: new Date(),
          dnum: i * 30,
          pic: store.state.testClothList[i],
        })
      }
    },
    async getOrder() {
      this.myOrder = []
      this.$axios(
          {
            method: 'post',
            url: '',
            data: qs.stringify({})
          }
      ).then(res => {
        switch (res.data.result) {
          case 0:
            break;
          default:
            break;
        }
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
          orderId: this.myOrder[index]
        }
      })
    }
  },
  created() {
    this.getOrder()
    this.demo()
  }
}
</script>

<style scoped>

</style>