<template>
  <el-row style="height: 100%">
    <el-col :span="menuSpan" style="height: 100%">
      <el-menu router style="height: 100%" :collapse="isCollapse">
<!--        <div :class="isCollapse?'isCollapse':'notCollapse'">-->
<!--          <div :style="collapseStyle">-->
<!--            <img v-if="isCollapse" style="width: 50px;margin: auto" src="/logo.png" alt="Logo">-->
<!--          </div>-->
<!--        </div>-->
        <el-menu-item index="/">
          <i class="el-icon-picture-outline-round"></i>
          <template #title>图库</template>
        </el-menu-item>
        <el-menu-item index="/collection">
          <i class="el-icon-star-on"></i>
          <template #title>我的收藏</template>
        </el-menu-item>
        <el-menu-item index="/config">
          <i class="el-icon-setting"></i>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="mainSpan" >
      <el-row>
        <el-button style="width: 20px;height: 70px;justify-content: flex-end" type="text" :icon="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'" @click="isCollapse = !isCollapse"></el-button>
      </el-row>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import Config from './Config'
import {computed} from "vue";
export default {
  name: "App",
  components:{
    Config
  },
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
  provide (){
    return {
      isCollapse: computed(()=>{
        return {
          isCollapse:this.isCollapse
        }
      })
    }
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
  height: 70px;
  width: 80px;
}
.notCollapse{
  display: inline-block;
  height: 70px;
  width: 220px;
}
</style>