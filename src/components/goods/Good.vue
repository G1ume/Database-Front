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
        <el-button @click="getCloth">查询</el-button>
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
                style="width: 150px ;height: 150px"
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
              <span>{{ clothe24[index + headIndex - 1].cn }}</span>
              <div class="bottom">
                <el-button text class="button" @click="singleobj(index)">查看详情{{ index }}</el-button>
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

export default {
  data() {
    return {
      clist: store.state.testClothList,
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1: store.state.clothTypeList,
      o: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
      clothe24: [],
      pageNum: 0,
      pageSize: 2,
      pageElemNum: 2,
      headIndex: 0,
    }
  }
  ,
  methods: {
    async getCloth() {
      let cco_list = []
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        cco_list.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1 = cco_list.join()
      console.log("cco1", cco1)
      this.clothe24 = []
      for (let i = 0; i < this.clist.length; i++) {
        let m = {}
        m.cid = "00" + i
        m.cpid = "10" + i
        m.cpr = i
        m.cn = "衣服" + i
        m.cde = "这是衣服" + i
        m.cnum = i * 100
        m.cpi = this.clist.at(i)
        this.clothe24.push(m)
      }
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
            for (let i = 0; i < res.data.list.length; i++) {
              this.clothe24.push({
                cid: res.data.list[i].cid,
                cpid: res.data.list[i].cpid,
                cpi: res.data.list[i].cpi,
                cpr: res.data.list[i].cpr,
                cn: res.data.list[i].cn,
                cde: res.data.list[i].cde,
                cnum: res.data.list[i].cnum
              })
            }
          }).catch(err=>{
            console.log(err)
        ElMessage.error("获取衣服列表失败")
      })

    },
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    },
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
  created() {
    this.getCloth()
    console.log("num in created", this.clothe24.length)
    console.log("created end")
  }
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

/*.image {*/
/*  width: 100%;*/
/*  display: block;*/
/*}*/
</style>