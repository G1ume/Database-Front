<template>
  <el-container>
    <el-main>
      <el-card>
        <template #header>
          <div class="card-header">


            <el-image
                style="width: 100px ;height: 100px"
                :src="o.cpi">
            </el-image>
          </div>
        </template>
        <!--  衣服名称-->
        <h2>{{ o.cn }}</h2>
        <!--  衣服id-->
        <h3>cid: {{ o.cid }}</h3>
        <!--  衣服发布者id-->
        <h3>发布者id: {{ o.cpid }}</h3>
        <!--  衣服价格-->
        <el-input-number v-model="num" :min="1" :max="o.cnum" @change="handleChange"/>
        <h3>总金额: {{ o.cpr * num }} 元</h3>
        <el-divider>

        </el-divider>
        <h3> {{ o.cde }} </h3>
        <!--  <el-image-->
        <!--      style="width: 100px ;height: 100px"-->
        <!--      :src="o.cpi">-->

        <!--  </el-image>-->
      </el-card>

    </el-main>
    <el-footer>
      <el-button type="success" round @click="finalbuy">生成订单</el-button>
    </el-footer>

  </el-container>

</template>

<script>
import {ElMessage} from 'element-plus'
import qs from "qs";
import store from "@/store";


export default {
  data() {
    return {
      uid: "",
      o: {
        cid: '',
        cpid: '',
        cpi: '',
        cpr: 10,
        cn: '',
        cde: '',
        cnum: 10
      },
      num: 1

    }
  },
  methods: {
    finalbuy: function () {
      ElMessage('购买成功,即将前往个人中心.')
      this.$axios({
        method: 'post',
        url: '/regist_order',
        data: qs.stringify({
          cid: this.o.cid,
          cbnum: this.num,
          uid: store.state.logInfo.user_id
        }),
        timeout: 1000,
      })
          .then(
              this.$router.push({
                    name: "PersonalCenter"
                  }
              )
          )
    }

  },
  created() {
    this.o.cid = this.$route.query.cid
    this.o.cpi = this.$route.query.cpi
    this.o.cpr = this.$route.query.cpr
    this.o.cpid = this.$route.query.cpid
    this.o.cn = this.$route.query.cn
    this.o.cde = this.$route.query.cde
    this.o.cnum = this.$route.query.cnum
  }
}
</script>