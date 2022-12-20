<template>
  <el-container>
    <el-header>
      <span style="font-size: 30px;font-weight: bold">
        我的消息
      </span>
    </el-header>
    <el-main>
      <el-row type="flex">
        <el-col
            v-for="(item, index) in messagelist"
            :key="index"
            :span="24"
            :offset="0"
        >
          <el-card :body-style="{ padding: '2px' }">
            <el-image
                style="width: 150px ;height: 150px"
                fit="cover"
                :src="item.spic"
            ></el-image>
            <div style="padding: 14px">
              <span>消息id:{{ item.mid }}</span>
              <span>时间:{{ item.mt }}</span>
              <span>内容{{ item.mc }}</span>

              <div class="bottom">

              </div>

            </div>
          </el-card>
          <h6></h6>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "message",
  data(){
    return{
      messagelist:[],
      message:{uid:"",	oid:""	,mid:"",	mt:"",	mc:""	,mst:"",	sid:"",	spic:""	,ppic:""}
    }
  }
}
</script>

<style scoped>

</style>