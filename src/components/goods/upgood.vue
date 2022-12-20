<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        上架商品
      </span>
    </el-header>
    <el-main>


      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <h6></h6>
        <div>
          商品的图片: <el-input placeholder="请输入商品的图片url" v-model="o.cpi" clearable class="input_style"></el-input>
        </div>
        <div>
          商品的价格: <el-input placeholder="请输入商品的价格" v-model="o.cpr" clearable class="input_style"></el-input>元
        </div>
        <div>
          商品的名称: <el-input placeholder="请输入商品的名称" v-model="o.cn" clearable class="input_style"></el-input>
        </div>
        <div>
          商品的描述:
          <el-input
              v-model="o.cde"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入商品的描述"
              class="input_style"
          />
        </div>
        <div>
          商品的数量: <el-input placeholder="请输入商品的数量" v-model="o.cnum" clearable class="input_style"></el-input>件
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
        <el-button @click="up">上传商品</el-button>
      </div>
    </el-footer>
  </el-container>
</template>


<script>
import qs from "qs";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      o: {cid: "", cpid: "", cpi: "", cpr: 0, cn: "", cde: "", cnum: 0},
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
    up:function () {
      //确认上传
      let ccolist=[]
      for (let index = 0; index < this.checkTypeList.length; index++) {

        let item = this.checkTypeList[index];
        console.log("item", item);
        ccolist.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1=ccolist.join("")
      console.log("cco1",cco1)

      console.log(this.o.cpi)
      this.$axios({
        method: 'post',
        url: '/regist_clothing',
        data: qs.stringify({
          cid: this.o.cid,
          cpid: this.o.cpid,
          cpi:this.o.cpi,
          cpr:this.o.cpr,
          cn:this.o.cn,
          cco: cco1,
          cde:this.o.cde,
          cnum:this.o.cnum
        }),
        timeout: 1000,
      })
          .then(res => {
            switch (res.data.cst) {
              case 0: {
                this.fail()
                break;
              }
                //用户登录成功
              case 1: {
                this.success()
                // store.commit("logIn", res.data.uid, res.data.un, res.data.up, false)
                break;
              }
              default: {
                console.log("error cst")
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
      ElMessage('上架失败,请重新检查您的提交.')
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