<template>
  <el-container>
    <el-header>
      <h1>
        浏览分享
      </h1>
    </el-header>
    <el-main>

      <div>
        <el-checkbox-group v-model="checkTypeList" size="large">
          <el-checkbox-button v-for="(type,index) in laobelList" :key="index" :label="type.value">
            {{ type.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <el-button @click="query">筛选</el-button>
      <el-divider/>
      <el-row type="flex">
        <el-col
            v-for="index in pageElemNum"
            :key="index"
            :span="5.5"
            :offset="1"
        >


          <el-card :body-style="{ padding: '2px' }" shadow="hover">
            <template #header>
              <span >{{ shareList[index - 1 + headIndex].she }}</span>
            </template>
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="shareList[index-1+headIndex].spi"
            >

            </el-image>
            <div style="padding: 14px">
              <span>{{shareList[index-1+headIndex].sde}}</span>
              <div class="bottom">
                <el-button type="danger" round @click="report(index)">举报</el-button>
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
            :total=shareList.length
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
  data() {
    return {
      laobelList: store.state.clothTypeList,
      shareList: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 3,
      headIndex: 0,
    }
  },
  created() {
    this.demo()
    //this.query()
  },
  methods: {
    demo() {
      this.shareList=[]
      for (let i = 0; i < 10; i++) {
        this.shareList.push({
          sid:i,
          spid:"发布者"+i,
          spi:store.state.testClothList[i],
          scid:i,
          sst:0,
          she:"分享标题"+i,
          sde:"分享描述:"+i+"this is demo",
          sti:new Date(),
          sco:0,
        })
      }
    },
    async query() {
      let sco_list = []
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        sco_list.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let scco1 = sco_list.join()
      this.$axios({
        method: 'post',
        url: '/find_cco_cloths',
        data: qs.stringify({
          sco: scco1,
          uid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
            this.shareList=[]
            for (let i = 0; i < res.data.list.length; i++) {
              this.shareList.push({
                sco: res.data.list[i].sco,
                sid: res.data.list[i].sid,
                spi: res.data.list[i].spi,
                sst: res.data.list[i].sst,
                scid: res.data.list[i].scid,
                she: res.data.list[i].she,
                sde: res.data.list[i].sde,
                sti: res.data.list[i].sti,
                spid: res.data.list[i].spid
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
      this.pageElemNum = (this.pageNum) * this.pageSize > this.shareList.length ? this.shareList.length - this.headIndex : this.pageSize
    },
    report(index) {
      this.$axios({
        method: 'post',
        url: '/report_share',
        data: qs.stringify({
          sid: this.shareList[index - 1 + this.headIndex].sid,
        }),
        timeout: 1000,
      })
          .then(res => {

          }).catch(err => {
        console.log(err)
        ElMessage.error("举报失败，检查连接")
      })
    }
  }
}
</script>

<style scoped>

</style>