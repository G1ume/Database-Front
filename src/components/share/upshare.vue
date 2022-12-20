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
            分享的图片: <el-input placeholder="请输入分享的图片url" v-model="s.spi" clearable class="input_style"></el-input>
          </div>
          <div>
            衣服的id: <el-input placeholder="请输入衣服的id" v-model="s.scid" clearable class="input_style"></el-input>元
          </div>
          <div>
            分享的标题: <el-input placeholder="请输入分享的标题" v-model="s.she" clearable class="input_style"></el-input>
          </div>
          <div>
            分享的描述:
            <el-input
                v-model="s.sde"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入商品的描述"
                class="input_style"
            />
          </div>


          <el-checkbox-group v-model="checkTypeList" size="large">
            <el-checkbox-button v-for="(type,index) in clothe1" :key="index" :label="type.value">
              {{ type.label }}
            </el-checkbox-button>
          </el-checkbox-group>

        </el-card>
        <h6></h6>
        <h6></h6>
      </el-main>
      <el-footer>
        <div>
          <el-button @click="upshare">上传分享</el-button>
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
      s: {sco: "", sid: "", spi: "",sst:0, scid: "", she: "", sde: "", sti: "",spid:""},
      dialogOfUpload: false,
      fileList: [],
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1: store.state.clothTypeList
    }
  },
  methods: {
    upshare:function () {
      //确认上传
      let ccolist=[]
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        console.log("item", item);
        ccolist.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1=ccolist.join()
      console.log("cco1",cco1)
      let aData = new Date();
      let dateValue = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      console.log(dateValue)
      console.log(this.s.spi)
      this.$axios({
        method: 'post',
        url: '/?',
        data: qs.stringify({
          sco: this.s.sco,
          spi: this.s.spi,
          scid:this.s.scid,
          she:this.s.she,
          sde:this.s.sde,
          sti: dateValue,
          spid:this.s.spid
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
    fail:function (){
      ElMessage('分享失败,请重新检查您的提交.')
    },
    success:function (){
      ElMessage('上架成功,即将前往个人中心.')
      this.$router.push({
        name: "PersonalCenter",
      });
    }
  }
}
</script>
<style scoped>

</style>