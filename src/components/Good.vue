<template>
  <el-container>
    <el-header>
      <h1>
        全部商品
      </h1>
    </el-header>
    <el-main>
      一个查询
      <div>
        <el-checkbox-group v-model="checkTypeList" size="large">
          <el-checkbox-button v-for="(type,index) in clothe1" :key="index" :label="type.value">
            {{ type.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>

     各个商品信息，类似那20个问题，每个商品card都对应链接
      <el-button @click="query">查询</el-button>
      <el-divider/>
        <el-row :gutter="10">
          <el-col
              v-for="(o, index) in 24"
              :key="o"
              :span="6"
              :offset="0"
          >
            <el-card :body-style="{ padding: '7px' }" >
              <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
              />
              <div style="padding: 14px">
                <span>Yummy hamburger</span>
                <div class="bottom">
                  <el-button text class="button">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
    </el-main>
    <el-footer>
      //翻页部分
    </el-footer>
  </el-container>
</template>
<style>


.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
<script>
export default {
  data() {
    return {
      checkTypeList: [],
      checkboxGroup1: 0,
      clothe1:[
        {label:"上衣",value:1},
        {label:"长袖",value:2},
        {label:"短袖",value:3},
        {label:"下装",value:4},
        {label:"长裤",value:5},
        {label:"短裤",value:6},
        {label:"鞋",value:0},

      ]

    }
  }
  ,
  methods: {
    query: function () {
      for (let index = 0; index < this.checkTypeList.length; index++) {
        let item = this.checkTypeList[index];
        console.log("item",item);
        //dubug使用，正式的使用可以直接发送 checkTypeList到后端
      }
      //console.log(this.$route.query.password)
      //console.log(pwd)
    },
    toLogin:function () {
      this.$router.push({name:'Login'})
    }
  }
}
</script>