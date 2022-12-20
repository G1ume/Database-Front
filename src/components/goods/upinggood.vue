<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我上架的商品
      </span>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col
            v-for="(item, index) in clothe24"
            :key="index"
            :span="24"
            :offset="0"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="item.cpi"
            ></el-image>
              <div style="padding: 14px">
                <span>衣服id:{{ item.cid }}</span>
                <span>衣服名称:{{ item.cn }}</span>
                <span>衣服价格{{ item.cpr }}元</span>
                <span>描述:{{ item.cde }}</span>
                <span>剩余{{ item.cnum }}件</span>
                <div class="bottom">
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

export default {
  data() {
    return {
      uid:"",
      clist: store.state.testClothList,
      curo: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
      clothe24: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 2,
      headIndex: 0,
    }
  },
  methods: {
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    },
    query: function () {
      this.$axios({
        method: 'post',
        url: '/querydingdan/',
        data: qs.stringify({
          cpid:store.state.logInfo.user_id,
        }),
        timeout: 1000,
      })
          .then(res => {
            this.clothe24=[]
            for (let i = 0; i < res.data.list.length; i++) {
              let o= {}
              o.cid = res.data.list.at(i).cid
              o.cpid = res.data.list.at(i).cpid
              o.cpic = res.data.list.at(i).cpic
              o.cpr = res.data.list.at(i).cpr
              o.cn = res.data.list.at(i).cn
              o.cde = res.data.list.at(i).cde
              o.cnum = res.data.list.at(i).cnum
              this.clothe24.push(o)
            }
            //debug

          }).catch(err => {
            console.log(err)
        // this.clothe24=[]
        // for (let i = 0; i < this.clist.length; i++) {
        //   let o= {}
        //   o.cpi = this.clist.at(i)
        //   o.cid = i
        //   o.cpr =i*100
        //   o.cn = "第"+i+"件上架"
        //   o.cde = "第"+i+"件上架"
        //   o.cnum = i*10
        //   this.clothe24.push(o)
        // }
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