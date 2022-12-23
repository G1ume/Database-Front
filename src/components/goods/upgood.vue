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
          <el-image :src="o.cpi"
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
        <div>
          <span style="font-size: large">商品的价格:
          <el-input style="width: 80px" placeholder="请输入商品的价格" v-model="o.cpr" clearable
                    class="input_style"></el-input>
          元</span>
        </div>
        <h2/>
        <div class="detail">
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: larger">商品的名称:</span></el-col>
            <el-col :span="1">
              <el-input placeholder="请输入商品的名称" v-model="o.cn" clearable class="input_style"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: larger">商品的描述:</span></el-col>
            <el-col :span="1">
              <el-input
                  v-model="o.cde"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="请输入商品的描述"
                  class="input_style"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"/>
            <el-col :span="3"><span style="font-size: larger">上架数量:</span></el-col>
            <el-col :span="1">
              <el-input placeholder="请输入商品的数量" v-model="o.cnum" clearable class="input_style"></el-input>
            </el-col>
          </el-row>
        </div>
        <h1/>
        <div>
          <span>请选择商品类型</span>
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
        <el-button @click="up" type="success">上传商品</el-button>
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
    upload(file) {
      const formData = new FormData();
      formData.append("image", file.file)
      this.$axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: "b3af80c7860822bee54611e28f1261e2",
        }
      }).then((res) => {
        console.log(res.data.data.url);
        this.o.cpi=res.data.data.url
        ElMessage.success("图片上传成功！")
      }).catch(err => {
        console.log(err)
        ElMessage.error("图床服务器响应失败！")
      })
    },
    up: function () {
      //确认上传
      let ccolist = []
      for (let index = 0; index < this.checkTypeList.length; index++) {

        let item = this.checkTypeList[index];
        console.log("item", item);
        ccolist.push(item)
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      let cco1 = ccolist.join("")
      console.log("cco1", cco1)

      console.log(this.o.cpi)
      this.$axios({
        method: 'post',
        url: '/regist_clothing',
        data: qs.stringify({
          cid: this.o.cid,
          cpid: store.state.logInfo.user_id,
          cpi: this.o.cpi,
          cpr: this.o.cpr,
          cn: this.o.cn,
          cco: cco1,
          cde: this.o.cde,
          cnum: this.o.cnum
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
    fail: function () {
      ElMessage.error('上架失败,请重新检查您的提交.')
    },
    success: function () {
      ElMessage.success('上架成功!')
      this.$router.push({
        name: "upinggood",
      });
    }
  }
}
</script>