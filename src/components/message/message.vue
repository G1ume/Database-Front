<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我的消息
      </span>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col
            v-for="(item, index) in messagelist"
            :key="index"
            :span="24"
            :offset="0"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="item.spic"
            ></el-image>
            <div style="padding: 14px">
              <span>消息id:{{ item.mid}}</span>
              <span>时间:{{ item.mtime}}</span>
              <span>{{ item.mcontent}}</span>

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
import store from "@/store";
import qs from "qs";
import {ElMessage} from "element-plus";
export default {
  name: "message",

  data(){
    return{
      messagelist:[],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 0,
      headIndex: 0,
      message:{uid:"",	oid:""	,mid:"",	mtime:"",	mcontent:""	,mst:"",	sid:"",	spic:""	,ppic:""},
      message1:{uid:"1288",	oid:"3288"	,mid:"0000",	mtime:"2023-1-1",	mcontent:"消息实例"	,mst:"未读",	sid:"1288",	spic:"https://ts1.cn.mm.bing.net/th/id/R-C.0ae5d26331217cb9296c69f12101791a?rik=9%2b2PZBDj1MLbaQ&riu=http%3a%2f%2fbpic.588ku.com%2felement_pic%2f17%2f07%2f05%2f721dde26da8f012ee82c0e221cd0a60d.jpg&ehk=04P3IpY183ObpZdId4%2fTf4Q9Wje%2bz2aXV%2fuGGcqrzo4%3d&risl=&pid=ImgRaw&r=0"	,ppic:""}
    }
  },
  methods:{
    async query() {

    },
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    }

  },
  created() {
    this.$axios({
      method: 'post',
      url: '/find_my_message',
      data: qs.stringify({
        uid: store.state.logInfo.user_id
      }),
      timeout: 1000,
    })
        .then(res => {
          for (let i = 0; i < res.data.result.length; i++) {
            this.messagelist.push({
              uid: res.data.result[i].uid,
              oid:  res.data.result[i].oid,
              mid:  res.data.result[i].mid,
              mtime:  res.data.result[i].mtime,
              mcontent:  res.data.result[i].mcontent,
              mst:  res.data.result[i].mst,
              sid:  res.data.result[i].sid,
              spic: res.data.result[i].spic,
              // ppic: res.data.list.at(i).ppic
            })
          }
        }).catch(err => {
      this.messagelist.push(this.message1)
      console.log(err)
      ElMessage.error("获取分享列表失败")
    })
  }
}
</script>


<style scoped>

</style>