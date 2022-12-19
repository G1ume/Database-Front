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

      </el-card>
      <h6></h6>
      <h6></h6>
    </el-main>
    <el-footer>
      <div>
        <el-button @clcik="up">上传商品</el-button>
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
    }
  },
  method: {
    up:function () {
      this.$axios({
        methods: 'post',
        url: '/?',
        data: qs.stringify({
          cid: this.o.cid,
          cpid: this.o.cpid,
          cpi:this.o.cpi,
          cpr:this.o.cn,
          cn:this.o.cde,
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