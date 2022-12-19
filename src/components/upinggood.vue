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
  </el-container>
</template>
<script>
import qs from "qs";

export default {
  data() {
    return {
      uid:"",
      clist: [
        "https://pic2.zhimg.com/1ccca1f0ff810d3a319206114c1174a1_r.jpg?source=1940ef5c",
        "https://pic3.zhimg.com/v2-fb4a711b0e98565b5046fe532d33cf32_r.jpg",
        "https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/faf2b2119313b07e3ca515b10cd7912397dd8c6b.jpg",
        "https://img.zcool.cn/community/016bb45aae0236a80120be14708b57.jpg@1280w_1l_2o_100sh.jpg",
        "https://img.zcool.cn/community/01ec3c5de8caffa8012095687d15db.jpg@1280w_1l_2o_100sh.jpg",
        "https://ts1.cn.mm.bing.net/th/id/R-C.80fec10a165fffba132f12d51145c2e3?rik=Fgcgx9%2ba6M%2bLWg&riu=http%3a%2f%2fimg.china.alibaba.com%2fimg%2fibank%2f2013%2f489%2f359%2f1059953984_198386960.jpg&ehk=OgnZ3zvIBbd%2fhOqAbYogVwiIttVwOshRPMsOgMgjdyM%3d&risl=&pid=ImgRaw&r=0",
        "https://img95.699pic.com/element/40108/0378.png_860.png",
        "https://img.alicdn.com/bao/uploaded/i1/2351667738/O1CN01pwKfXO2723NgMMcRx_!!0-item_pic.jpg",
        "https://img.alicdn.com/bao/uploaded/i3/1081711059/O1CN01rKidHr1Jh409lCeh9_!!1081711059.jpg",
        "https://t00img.yangkeduo.com/goods/images/2020-04-26/1a7189885390dc552e30e77ecca3dcc6.jpeg"
      ],
      curo: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
      clothe24: []
    }
  }
  ,
  methods: {
    query: function () {
      this.$axios({
        methods: 'post',
        url: '/querydingdan/',
        data: qs.stringify({
          cpid: this.uid,
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
            console.log("no connection")
        this.clothe24=[]
        for (let i = 0; i < this.clist.length; i++) {
          let o= {}
          o.cpi = this.clist.at(i)
          o.cid = i
          o.cpr =i*100
          o.cn = "第"+i+"件上架"
          o.cde = "第"+i+"件上架"
          o.cnum = i*10
          this.clothe24.push(o)
        }
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