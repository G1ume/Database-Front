<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我上架的商品
      </span>
    </el-header>
    <el-main>
      <el-card>
        <el-table :data="clothe24" :border="true">
          <el-table-column prop="pic" label="缩略图">
            <template #default="scope">
              <el-image
                  style="width: 50px ;height: 50px"
                  fit="cover"
                  :src="clothe24[scope.$index].cpi"
              />
            </template>
          </el-table-column>
          <el-table-column prop="cn" label="商品名称">
          </el-table-column>
          <el-table-column prop="cde" label="商品简介">

          </el-table-column>
          <el-table-column prop="cpr" label="价格(￥)/元">
          </el-table-column>
          <el-table-column prop="cnum" label="剩余数量">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template #default="scope">
              <el-button @click="deleteCloth(clothe24[scope.$index])" type="danger">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
    <el-affix position="bottom" :offset="20">
      <el-button @click="toUpgood" type="primary" circle><el-icon><Plus/></el-icon></el-button>
    </el-affix>
  </el-container>
</template>
<script>
import qs from "qs";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      uid:"",
      clist: store.state.testClothList,
      curo: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
      clothe24: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 0,
      headIndex: 0,
    }
  },
  methods: {
    toUpgood(){
      this.$router.push({
        name:"upgood"
      })
    },
    deleteCloth(cloth){
      this.$axios({
        method:'post',
        url:'/del_clothing',
        data:qs.stringify({
          uid:store.state.logInfo.user_id,
          cid:cloth.cid
        })
      }).then(res=>{
        console.log(res)
        if(res.data.result===1){
          ElMessage.success("下架成功！")
          this.query()
        }else {
          ElMessage.error("下架失败！")
        }
      }).catch(err=>{
        console.log(err)
        ElMessage.error("服务器响应失败！")
      })
    },
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    },
    query: function () {
      this.$axios({
        method: 'post',
        url: '/find_all_cloths',
        data: qs.stringify({
          cpid:store.state.logInfo.user_id,
        }),
        timeout: 1000,
      })
          .then(res => {
            this.clothe24=[]
            for (let i = 0; i < res.data.result.length ; i++) {
              let o= {}
              o.cid = res.data.result[i].cid
              o.cpid = res.data.result[i].cpid
              o.cpi = res.data.result[i].cpi
              o.cpr = res.data.result[i].cpr
              o.cn = res.data.result[i].cn
              o.cde = res.data.result[i].cde
              o.cnum = res.data.result[i].cnum
              this.clothe24.push(o)
            }
            this.pageElemNum=this.pageSize>this.clothe24.length?this.clothe24.length:this.pageSize
            //debug

          }).catch(err => {
            console.log(err)

        }
      )
    }
  },
  created(){
    this.query()
    console.log("num in created",this.clothe24.length)
    console.log("created end")
  }
}

</script>