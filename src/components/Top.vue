<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router="true"
  >
    <el-menu-item index="/">主页
      <el-icon>
        <HomeFilled/>
      </el-icon>
    </el-menu-item>
    <el-menu-item index="/goods">商品
      <el-icon>
        <Shop/>
      </el-icon>
    </el-menu-item>
    <el-menu-item index="3">分享
      <el-icon>
        <Share/>
      </el-icon>
    </el-menu-item>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="请登录后查看"
        placement="bottom"
        :disabled="!offline()"
    >
      <el-menu-item index="4" :disabled="offline">消息
        <el-icon>
          <Promotion/>
        </el-icon>
      </el-menu-item>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="请登录后查看"
        placement="bottom"
        :disabled="!offline()"
    >
      <el-menu-item index="/account/home" :disabled="offline">个人
        <el-icon>
          <UserFilled/>
        </el-icon>
      </el-menu-item>
    </el-tooltip>
    <el-menu-item index="/Login" v-show="offline">登录</el-menu-item>
    <!--<el-sub-menu index="2">-->
    <!--  <template #title>我的工作台</template>-->
    <!--  <el-menu-item index="2-1">选项1</el-menu-item>-->
    <!--  <el-menu-item index="2-2">选项2</el-menu-item>-->
    <!--  <el-menu-item index="2-3">选项3</el-menu-item>-->
    <!--  <el-sub-menu index="2-4">-->
    <!--    <template #title>选项4</template>-->
    <!--    <el-menu-item index="2-4-1">选项1</el-menu-item>-->
    <!--    <el-menu-item index="2-4-2">选项2</el-menu-item>-->
    <!--    <el-menu-item index="2-4-3">选项3</el-menu-item>-->
    <!--  </el-sub-menu>-->
    <!--</el-sub-menu>-->
    <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <!--<el-menu-item index="4">订单管理</el-menu-item>-->
  </el-menu>
  <div class="h-6"/>
  <!--<div class="line"></div>-->

  <!--<el-menu-->
  <!--    :default-active="activeIndex2"-->
  <!--    class="el-menu-demo"-->
  <!--    mode="horizontal"-->
  <!--    @select="handleSelect"-->
  <!--    background-color="#545c64"-->
  <!--    text-color="#fff"-->
  <!--    active-text-color="#ffd04b"-->
  <!--&gt;-->
  <!--<el-menu-item index="1">处理中心</el-menu-item>-->
  <!--<el-sub-menu index="2">-->
  <!--  <template #title>我的工作台</template>-->
  <!--  <el-menu-item index="2-1">选项1</el-menu-item>-->
  <!--  <el-menu-item index="2-2">选项2</el-menu-item>-->
  <!--  <el-menu-item index="2-3">选项3</el-menu-item>-->
  <!--  <el-sub-menu index="2-4">-->
  <!--    <template #title>选项4</template>-->
  <!--    <el-menu-item index="2-4-1">选项1</el-menu-item>-->
  <!--    <el-menu-item index="2-4-2">选项2</el-menu-item>-->
  <!--    <el-menu-item index="2-4-3">选项3</el-menu-item>-->
  <!--  </el-sub-menu>-->
  <!--</el-sub-menu>-->
  <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
  <!--<el-menu-item index="4">订单管理</el-menu-item>-->
  <!--</el-menu>-->
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  methods: {
    offline() {
      return !store.state.logInfo.access_token
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>