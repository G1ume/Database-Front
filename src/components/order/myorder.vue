<template>
  <el-container>
    <el-header>
      <h1>
        <span style="font-size: larger;font-weight: bolder">我的订单</span>
      </h1>
    </el-header>
    <el-main>

      <el-row type="flex">
        <el-col
            v-for="index in pageElemNum"
            :key="index"
            :span="5.5"
            :offset="1"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="myOrder[index+headIndex-1]"
            >

            </el-image>

            <div style="padding: 14px">
              <span>{{ myOrder[index + headIndex - 1] }}</span>
              <div class="bottom">
                <el-button text class="button" @click="orderSample(index+headIndex-1)">查看详情{{ index }}</el-button>
              </div>
            </div>
          </el-card>
          <h6></h6>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div class="pageChange">
        <el-pagination
            v-model:current-page="pageNum"
            layout="prev, pager, next"
            :hide-on-single-page=true
            :total=myOrder.length
            :page-size=pageSize
            @current-change="changePage"
        />
      </div>
    </el-footer>
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
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    },
    orderSample(index) {
      this.$router.push({
        name:'sampleOrder',
        query:{
          orderId:this.myOrder[index]
        }
      })
    }
  },
  created() {
    this.getOrder()
  }
}
</script>

<style scoped>

</style>