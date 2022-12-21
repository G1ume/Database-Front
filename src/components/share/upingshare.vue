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
              <span>Share Body {{ shareList[index - 1 + headIndex] }}</span>
              <div class="bottom">
                <el-button v-if="isadmin" @click="reject(index)">驳回</el-button>
                <el-button v-if="isadmin" @click="agree(index)">接受</el-button>
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
      isadmin: store.state.logInfo.admin,
      pageElemNum: 0,
      headIndex: 0,
    }
  },
  methods: {
    query() {
      this.$axios({
        method: 'post',
        url: '/find_my_shares',
        data: qs.stringify({
          spid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
            this.shareList = []
            for (let i = 0; i < res.data.result.length; i++) {
              this.shareList.push({
                sco: res.data.result[i].sco,
                sid: res.data.result[i].sid,
                spi: res.data.result[i].spi,
                sst: res.data.result[i].sst,
                scid: res.data.result[i].scid,
                she: res.data.result[i].she,
                sde: res.data.result[i].sde,
                sti: res.data.result[i].sti,
                spid: res.data.result[i].spid
              })
            }
            this.pageElemNum = this.pageSize > this.shareList.length ? this.shareList.length : this.pageSize
            console.log(this.shareList)
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
    reject(index) {
      this.$axios({
        method: 'post',
        url: '/reject',
        data: qs.stringify({
          sid: this.shareList[index - 1 + this.headIndex].sid
        }),
        timeout: 1000,
      }).catch(err => {
        console.log(err)
        ElMessage.error("驳回处理失败")
      })
      this.query()
    },
    agree(index) {
      this.$axios({
        method: 'post',
        url: '/agree',
        data: qs.stringify({
          sid: this.shareList[index - 1 + this.headIndex].sid
        }),
        timeout: 1000,
      }).catch(err => {
        console.log(err)
        ElMessage.error("接受处理失败")
      })
      this.query()
    }

  },
  created() {
    this.query()
  }
}
</script>

<style scoped>

</style>