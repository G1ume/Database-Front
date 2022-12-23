<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        分享好物
      </span>
    </el-header>
    <el-main>
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <h6></h6>
        <div>
          <el-image :src="s.spi"
                    style="width: 200px ;height:200px"
                    fit="cover"/>
          <h1/>
          <el-button type="primary">
            <el-upload
                action=""
                class="alignContainer"
                :http-request="upload"
                :show-file-list="false"
            >
              <div class="avatar-update">选择图片</div>
            </el-upload>
          </el-button>
        </div>
        <h1/>
        <div class="detail">
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: large">要分享的衣物:</span></el-col>
            <el-col :span="4">
<!--              <el-input placeholder="请输入衣服的id" v-model="s.scid" clearable class="input_style"></el-input>-->
              <el-select v-model="s.scid" class="m-2" placeholder="选择衣物" >
                <el-option
                    v-for="item in clothe24"
                    :key="item.cn"
                    :label="item.cn"
                    :value="item.cid"
                />
              </el-select>
            </el-col>
          </el-row>
          <h1/>
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: larger">标题:</span></el-col>
            <el-col :span="1">
              <el-input placeholder="请输入分享的标题" v-model="s.she" clearable class="input_style"></el-input>
            </el-col>
          </el-row>
          <h1/>
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: larger">描述:</span></el-col>
            <el-col :span="1">
              <el-input
                  v-model="s.sde"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="请输入商品的描述"
                  class="input_style"
              />
            </el-col>
          </el-row>
        </div>
        <h1/>
        <div>
          <span>请选择分享类型标签</span>
          <h1/>
          <el-checkbox-group v-model="checkTypeList" size="large">
            <el-checkbox-button v-for="(type,index) in clothe1" :key="index" :label="type.value">
              {{ type.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
        <h2/>

      </el-card>
      <h6></h6>
      <h6></h6>
    </el-main>
    <el-footer>
      <div>
        <el-button @click="upshare" type="success">上传分享</el-button>
      </div>
    </el-footer>
  </el-container>

</template>

<script>
import qs from "qs";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
  name: "upshare",
  data() {
    return {
      s: {sco: "", sid: "", spi: "", sst: 0, scid: "", she: "", sde: "", sti: "", spid: ""},
      dialogOfUpload: false,
      fileList: [],
      clothe24:[],
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1: store.state.clothTypeList
    }
  },
  created() {
    this.query()
  },
  methods: {
    query(){
      this.$axios({
        method: 'post',
        url: '/find_all_cloths',
        data: qs.stringify({
          cpid:store.state.logInfo.user_id,
        }),
        timeout: 1000,
      })
          .then(res => {
            this.clothe24=[]
            for (let i = 0; i < res.data.result.length ; i++) {
              let o= {}
              o.cid = res.data.result[i].cid
              o.cpid = res.data.result[i].cpid
              o.cpi = res.data.result[i].cpi
              o.cpr = res.data.result[i].cpr
              o.cn = res.data.result[i].cn
              o.cde = res.data.result[i].cde
              o.cnum = res.data.result[i].cnum
              this.clothe24.push(o)
            }
          }).catch(err => {
            console.log(err)
          }
      )
    },
    upload(file) {
      const formData = new FormData();
      formData.append("image", file.file)
      this.$axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: "b3af80c7860822bee54611e28f1261e2",
        }
      }).then((res) => {
        console.log(res.data.data.url);
        this.s.spi = res.data.data.url
        ElMessage.success("图片上传成功！")
      }).catch(err => {
        console.log(err)
        ElMessage.error("图床服务器响应失败！")
      })
    },
    upshare: function () {
      //确认上传
      let ccolist = []
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        //console.log("item", item);
        ccolist.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1 = ccolist.join()
      //console.log("cco1", cco1)
      let aData = new Date();
      //console.log(this.s.spi)
      this.$axios({
        method: 'post',
        url: '/regist_share',
        data: qs.stringify({
          sco: this.s.sco,
          spi: this.s.spi,
          scid: this.s.scid,
          she: this.s.she,
          sde: this.s.sde,
          sti: new Date(),
          spid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(res => {
            switch (res.data.sst) {
              case 0: {
                this.fail()
                break;
              }
                //分享成功
              case 1: {
                this.success()
                // store.commit("logIn", res.data.uid, res.data.un, res.data.up, false)
                break;
              }
              default: {
                console.log("error sst")
                break;
              }
            }
          })
          .catch(err => {
                console.log();
                console.log(err);
                if (err.code === 'ECONNABORTED') {
                  ElMessage.error('服务器响应超时！')
                }
              }
          )

    }
    ,
    fail: function () {
      ElMessage.error('分享失败,请重新检查您的提交.')
    },
    success: function () {
      ElMessage.success('上传成功!')
      this.$router.push({
        name: "upingshare",
      });
    }
  }
}
</script>
<style scoped>

</style>