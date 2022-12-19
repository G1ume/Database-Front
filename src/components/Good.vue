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
    </el-main>
    <el-footer>
      <div>
        <el-button type="warning" @click="dialogVisible = true">注销</el-button>
        <el-dialog
            v-model="dialogVisible"
            title="请注意！"
            width="25%">
          <span style="font-size: 15px">确定要注销吗？</span>
          <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="toOffLine">
                  确认
                </el-button>
              </span>
          </template>
        </el-dialog>
      </div>
    </el-footer>
  </el-container>
</template>

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