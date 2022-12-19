<template>
  <el-container>
    <el-header>
      <h1>
        浏览分享
      </h1>
    </el-header>
    <el-main>

      <div>
        <el-checkbox-group v-model="checkTypeList" size="large">
          <el-checkbox-button v-for="(type,index) in laobelList" :key="index" :label="type.value">
            {{ type.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <el-button @click="query">筛选</el-button>
      <el-divider/>
      <el-row type="flex">
        <el-col
            v-for="(item, index) in clothe24"
            :key="index"
            :span="5.5"
            :offset="1"
        >


          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="item.cpi"
            >

            </el-image>
            <div style="padding: 14px" >
              <span>Yummy hamburger</span>
              <div class="bottom">
                <el-button text class="button" @click="singleobj(index)">查看详情{{index}}</el-button>
              </div>
            </div>
          </el-card>
          <h6></h6>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      //翻页部分
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      laobelList: [
        {label: "上衣", value: 1},
        {label: "长袖", value: 2},
        {label: "短袖", value: 3},
        {label: "下装", value: 4},
        {label: "长裤", value: 5},
        {label: "短裤", value: 6},
        {label: "鞋", value: 0},
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>