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
      </div>
      <el-button @click="query">查询</el-button>
      <el-divider/>
      <el-row type="flex">
        <el-col
            v-for="(item, index) in clothe24"
            :key="index"
            :span="5.5"
            :offset="1"
        >


          <el-card :body-style="{ padding: '2px' }">
            <el-image
            style="width: 150px ;height: 150px"
            fit="cover"
            :src="item.cpi"
            >

            </el-image>
<!--            <img-->
<!--                :src="item.cpi"-->
<!--                width="50px"-->
<!--                class="image"-->
<!--             alt=""-->
<!--            />-->
            <div style="padding: 14px" >
              <span>Yummy hamburger</span>
              <div class="bottom">
                <el-button text class="button" @click="singleobj(index)">查看详情{{index}}</el-button>
              </div>
            </div>
          </el-card>
          <h6></h6>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      //翻页部分
    </el-footer>
  </el-container>
</template>
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
<script>
import qs from "qs";

export default {
  data() {
    return {
      clist:[
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
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1: [
        {label: "上衣", value: 1},
        {label: "长袖", value: 2},
        {label: "短袖", value: 3},
        {label: "下装", value: 4},
        {label: "长裤", value: 5},
        {label: "短裤", value: 6},
        {label: "鞋", value: 0},
      ],
      o: {cid: "",cpid: "",cpi: "",cpr: 0,cn: "",cde: "",cnum: 0},
      clothe24: []
    }
  }
  ,
  methods: {
    query: function () {
      let ccolist=[]
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        console.log("item", item);
        ccolist.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1=ccolist.join()
      console.log("cco1",cco1)
      this.$axios({
        methods: 'post',
        url: '/query/',
        data: qs.stringify({
          cco: cco1,
        }),
        timeout: 1000,
      })
          .then(res => {
            this.clothe24=[]
            for (let i = 0; i < res.data.list.length; i++) {
              this.o.cid = res.data.list[i].cid
              this.o.cpid = res.data.list[i].cpid
              this.o.cpr = res.data.list[i].cpr
              this.o.cn = res.data.list[i].cn
              this.o.cde = res.data.list[i].cde
              this.o.cnum = res.data.list[i].cnum
              this.clothe24.add(this.o)
            }
            //debug
            for (let i = 0; i < 2; i++) {
              this.o.cpr = i
              this.clothe24.push(this.o)
            }
          })
          .catch(err => {
                console.log(err);
                for (let i = 0; i < this.clist.length; i++) {
                  let m= {}
                  m.cid =  "00"+i
                  m.cpid = "10"+i
                  m.cpr = i
                  m.cn = "衣服"+i
                  m.cde = "这是衣服"+i
                  m.cnum = i*100
                  m.cpi=this.clist.at(i)
                  this.clothe24.push(m)
                  console.log("+1")
                }
                console.log("num of clothe",this.clothe24.length)
                console.log("query end")
              }
          )

      //console.log(this.$route.query.password)
      //console.log(pwd)
    },
    singleobj: function (index) {
      console.log("single begin")
      console.log(typeof index, index)
      //跳转到特定的
      // this.$router.push({name:'Login'})

      this.o = this.clothe24.at(index)
      this.$router.push(
          {
            name: "singleGood",
            query: {
              cid: this.o.cid,
              cpid:this. o.cpid,
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
    this.query()
    console.log("num in created",this.clothe24.length)
    console.log("created end")
  }
}
</script>