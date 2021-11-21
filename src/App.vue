<template>
  <el-config-provider :locale="locale">
    <el-row style="height: 100%">
      <el-col :span="menuSpan" style="height: 100vh">
        <el-menu router style="height: 100%;padding-right: 0" :collapse="isCollapse">
          <div style="height: 70px">
            <el-button style="width: 20px;height: 70px;float: right;clear: right" type="text" @click="isCollapse = !isCollapse">
              <el-icon>
                <d-arrow-right v-if="isCollapse"/>
                <d-arrow-left v-else/>
              </el-icon>
            </el-button>
          </div>
          <el-menu-item index="/">
            <template #default>
              <el-icon><picture-filled /></el-icon>
              <span>图库</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/fetchImg">
            <template #default>
              <el-icon><upload-filled /></el-icon>
              <span>图片采集</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/task">
            <template #default>
              <el-icon><star-filled /></el-icon>
              <span>采集任务</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/author">
            <template #default>
              <el-icon><goods-filled /></el-icon>
              <span>画师广场</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/config">
            <template #default>
              <el-icon><tools /></el-icon>
              <span>系统设置</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="mainSpan">
        <el-scrollbar height="100vh">
          <router-view style=""></router-view>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-config-provider>
</template>

<script>

import {computed} from "vue";
import {PictureFilled,UploadFilled,StarFilled,GoodsFilled,Tools,DArrowLeft,DArrowRight} from "@element-plus/icons";
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent( {
  name: "Index",
  components:{
    PictureFilled,
    UploadFilled,
    StarFilled,
    GoodsFilled,
    Tools,
    DArrowLeft,
    DArrowRight,
    ElConfigProvider,
  },
  setup(){
    return {
      locale :zhCn
    }
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
})
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
