<template>
  <el-container>
    <el-header>
      <h1>
        全部商品
      </h1>
    </el-header>
    <el-main>
      <div>
        <el-checkbox-group v-model="checkTypeList" size="large">
          <el-checkbox-button v-for="(type,index) in clothe1" :key="index" :label="type.value">
            {{ type.label }}
          </el-checkbox-button>
        </el-checkbox-group>
        <h1/>
        <el-button @click="getCloth" type="success">查询</el-button>
      </div>

      <el-divider/>
      <el-row type="flex">
        <el-col
            v-for="index in pageElemNum"
            :key="index"
            :span="5.5"
            :offset="1"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 200px ;height: 150px"
                fit="cover"
                :src="clothe24[index+headIndex-1].cpi"
            >

            </el-image>
            <!--            <img-->
            <!--                :src="item.cpi"-->
            <!--                width="50px"-->
            <!--                class="image"-->
            <!--             alt=""-->
            <!--            />-->
            <div style="padding: 14px">
              <span style="font-weight: bold;font-size: large">{{ clothe24[index + headIndex - 1].cn }}</span>
              <el-divider/>
              <span>{{clothe24[index + headIndex - 1].cde}}</span>
              <h1/>
              <span>价格：<span style="color: crimson;">{{clothe24[index + headIndex - 1].cpr}}</span> /元</span>
              <div class="bottom">
                <el-button text class="button" @click="singleobj(index+headIndex-1)" type="warning">查看详情</el-button>

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
            :total=clothe24.length
            :page-size=pageSize
            @current-change="changePage"
        />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import qs from "qs";
import store from "@/store";
import {ElMessage} from "element-plus";
import {onMounted} from 'vue'
import {waitFor} from "@babel/core/lib/gensync-utils/async";

export default {
  name: 'Good',
  created() {
    this.$axios({
      method: 'post',
      url: '/find_cco_cloths',
      data: qs.stringify({
        cco: "",
        uid: store.state.logInfo.user_id
      }),
      timeout: 1000,
    })
        .then(res => {
          console.log("get response")
          this.clothe24 = []
          for (let i = 0; i < res.data.result.length; i++) {
            this.clothe24.push({
              cid: res.data.result[i].cid,
              cpid: res.data.result[i].cpid,
              cpi: res.data.result[i].cpi,
              cpr: res.data.result[i].cpr,
              cn: res.data.result[i].cn,
              cde: res.data.result[i].cde,
              cnum: res.data.result[i].cnum
            })
          }
          this.pageElemNum = this.pageSize > this.clothe24.length ? this.clothe24.length : this.pageSize
        }).catch(err => {
      console.log(err)
      ElMessage.error("获取衣服列表失败")
    })


    console.log("num in created", this.clothe24.length, this.pageElemNum)
    console.log("created end")
  },
  data() {
    return {
      clist: store.state.testClothList,
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1: store.state.clothTypeList,
      o: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
      clothe24: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 0,
      headIndex: 0,
    }
  }
  ,
  methods: {
    getCloth() {
      let cco_list = []
      // console.log("begin get ")
      // console.log(this.checkTypeList)
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        cco_list.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1 = cco_list.join("")
      console.log("cco1=", cco1)
      this.$axios({
        method: 'post',
        url: '/find_cco_cloths',
        data: qs.stringify({
          cco: cco1,
          uid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
            console.log(res)
            this.clothe24 = []
            for (let i = 0; i < res.data.result.length; i++) {
              this.clothe24.push({
                cid: res.data.result[i].cid,
                cpid: res.data.result[i].cpid,
                cpi: res.data.result[i].cpi,
                cpr: res.data.result[i].cpr,
                cn: res.data.result[i].cn,
                cde: res.data.result[i].cde,
                cnum: res.data.result[i].cnum
              })
            }
            this.pageElemNum = this.pageSize > this.clothe24.length ? this.clothe24.length : this.pageSize
          }).catch(err => {
        console.log(err)
        ElMessage.error("获取衣服列表失败")
      })
    }
    ,

    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    }
    ,
    singleobj: function (index) {
      console.log("single begin")
      console.log(typeof index, index)
      //跳转到特定的

      this.o = this.clothe24.at(index)
      this.$router.push(
          {
            name: "singleGood",
            query: {
              cid: this.o.cid,
              cpid: this.o.cpid,
              cpi: this.o.cpi,
              cpr: this.o.cpr,
              cn: this.o.cn,
              cde: this.o.cde,
              cnum: this.o.cnum
            }
          }
      )
    }
  },

}
</script>
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

</style>