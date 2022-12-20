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
              <span>时间:{{ item.mt}}</span>
              <span>内容{{ item.mc}}</span>

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
      message:{uid:"",	oid:""	,mid:"",	mt:"",	mc:""	,mst:"",	sid:"",	spic:""	,ppic:""}
    }
  },
  methods:{
    async query() {
      this.$axios({
        method: 'post',
        url: '/find_message',
        data: qs.stringify({
          uid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
            for (let i = 0; i < res.data.list.length; i++) {
              this.messagelist.push({
                uid: res.data.list.at(i).uid,
                oid: res.data.list.at(i).oid,
                mid: res.data.list.at(i).mid,
                mt: res.data.list.at(i).mt,
                mc: res.data.list.at(i).mc,
                mst: res.data.list.at(i).mst,
                sid: res.data.list.at(i).sid,
                spic: res.data.list.at(i).spic,
                ppic: res.data.list.at(i).ppic
              })
            }
          }).catch(err => {
        console.log(err)
        ElMessage.error("获取分享列表失败")
      })
    },
    changePage(val) {
      this.pageNum = val
      this.headIndex = (this.pageNum - 1) * this.pageSize
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    }
  }
}
</script>


<style scoped>

</style>