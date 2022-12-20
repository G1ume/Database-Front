<template>
  <el-container>
    <h1>{{ o.cid }}</h1>
    <el-main>
      <el-card>
        <template #header>
          <div class="card-header">


            <el-image
                style="width: 1000px ;height: 1000px"
                :src="o.cpi">
            </el-image>
          </div>
        </template>
        <!--  衣服名称-->
        <h2>{{ o.cn }}</h2>
        <!--  衣服id-->
        <h3>cid: {{ o.cid }}</h3>
        <!--  衣服发布者id-->
        <h3>发布者id: {{ o.cpid }}</h3>
        <!--  衣服价格-->
        <h3>价格: {{ o.cpr }} 元</h3>
        <!--  剩余数量-->
        <h3>剩余: {{ o.cnum }} 件</h3>
        <el-divider>

        </el-divider>
        <h3> {{ o.cde }} </h3>
        <!--  <el-image-->
        <!--      style="width: 100px ;height: 100px"-->
        <!--      :src="o.cpi">-->

        <!--  </el-image>-->
      </el-card>

    </el-main>
    <el-footer>
      <el-button type="danger" round @click="report">举报</el-button>
      <el-button type="success" round @click="buy">购买</el-button>
    </el-footer>

  </el-container>

</template>
<style>


</style>

<script>
export default {
  data() {
    // cid: this.o.cid,
    //     cpid:this. o.cpid,
    //     cpi: this.o.cpi,
    //     cpr: this.o.cpr,
    //     cn: this.o.cn,
    //     cde: this.o.cde,
    //     cnum: this.o.cnum
    return {
      o: {
        cid: '',
        cpid: '',
        cpi: '',
        cpr: 0,
        cn: '',
        cde: '',
        cnum: 0
      }
    }
  }
  ,
  methods: {
    query: function () {
      //console.log(this.$route.query.password)
      //console.log(pwd)\
      console.log(this.o)
    },
    buy: function () {
      //---->下单界面
      this.$router.push({
        name: "goodbuy",
        query: {
          cid: this.o.cid
        }
      })
    },
    report: function () {
      //--->举报界面

    }

  },
  created() {
    console.log("aaa", this.$route.query.cid)
    this.o.cid = this.$route.query.cid
    this.o.cpid = this.$route.query.cpid
    this.o.cpi = this.$route.query.cpi
    this.o.cpr = this.$route.query.cpr
    this.o.cn = this.$route.query.cn
    this.o.cde = this.$route.query.cde
    this.o.cnum = this.$route.query.cnum
    console.log(this.o.cid)

  }
}
</script>