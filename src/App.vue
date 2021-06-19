<template>
  <el-row style="height: 100%">
    <el-col :span="menuSpan" style="height: 100%">
      <el-menu style="height: 100%" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div :class="isCollapse?'isCollapse':'notCollapse'">
          <div :style="collapseStyle">chi</div>
          <el-button style="width: 20px;justify-content: flex-end" type="text" :icon="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'" @click="isCollapse = !isCollapse"></el-button>
        </div>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col  :span="mainSpan" >
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      collapseStyle:{
        display: "inline-block",
        width :"200px"
      },
      isCollapse: false,
      menuSpan:3,
      mainSpan:21
    };
  },
  watch:{
    isCollapse(val){
      if(val){
        this.menuSpan = 1
        this.mainSpan = 23
        this.collapseStyle.width = "45px";
      }else {
        this.menuSpan = 3
        this.mainSpan = 21
        this.collapseStyle.width = "200px";
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
html ,body, #app{
  height: 100%;
  margin: 0;
}
.isCollapse{
  display: inline-block;
  height: 60px;
  width: 80px;
}
.notCollapse{
  display: inline-block;
  height: 60px;
  width: 220px;
}
</style>