<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我的分享
      </span>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col
            v-for="index in pageElemNum"
            :key="index"
            :span="24"
            :offset="0"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="shareList[index-1+headIndex].spi"
            ></el-image>
            <div style="padding: 14px">
              <span>Share Body {{ shareList[index - 1 + headIndex]}}</span>
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
  name: "upingshare",
  data() {
    return {
      shareList: [],
      pageNum: 0,
      pageSize: store.state.pagecfg.pagesize,
      pageElemNum: 0,
      headIndex: 0,
    }
  },
  methods:{
    async query() {
      this.$axios({
        method: 'post',
        url: '/find_cco_cloths',
        data: qs.stringify({
          uid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
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
      this.pageElemNum = (this.pageNum) * this.pageSize > this.clothe24.length ? this.clothe24.length - this.headIndex : this.pageSize
    },
  }
}
</script>

<style scoped>

</style>