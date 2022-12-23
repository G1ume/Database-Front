<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我的分享
      </span>
    </el-header>
    <el-main>
      <el-card>
        <el-table :data="shareList" :border="true">
          <el-table-column prop="pic" label="缩略图">
            <template #default="scope">
              <el-image
                  style="width: 50px ;height: 50px"
                  fit="cover"
                  :src="shareList[scope.$index].spi"
              />
            </template>
          </el-table-column>
          <el-table-column prop="she" label="分享标题">
          </el-table-column>
          <el-table-column prop="sde" label="分享内容">

          </el-table-column>
          <el-table-column prop="sti" label="创建时间">

          </el-table-column>
          <el-table-column prop="" label="操作">
            <template #default="scope">
              <el-button @click="deleteShare(shareList[scope.$index])" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
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
    deleteShare(share){
      this.$axios({
        method:'post',
        url:'/del_share',
        data:qs.stringify({
          uid:store.state.logInfo.user_id,
          sid:share.sid
        })
      }).then(res=>{
        console.log(res)
        if(res.data.result===1){
          ElMessage.success("删除成功！")
          this.query()
        }else {
          ElMessage.error("删除失败！")
        }
      }).catch(err=>{
        console.log(err)
        ElMessage.error("服务器响应失败！")
      })
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