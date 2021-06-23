<template>
  <el-form style="width: 800px;margin-left: auto;margin-right: auto;margin-top: 100px"  label-position="left" label-width="170px" size="medium">
    <el-divider content-position="left">
      <p style="font-weight: bold">登陆相关设置</p>
    </el-divider>
    <el-form-item label="系统BaseUrl: ">
      <el-input v-model="config.projectBaseUrl"></el-input>
    </el-form-item>
    <el-form-item label="系统管理员账号: ">
      <el-input v-model="config.adminAccount"></el-input>
    </el-form-item>
    <el-form-item label="系统管理员密码: ">
      <el-input v-model="config.adminPassword"></el-input>
    </el-form-item>

    <el-divider content-position="left" >
      <p style="font-weight: bold">Pixiv相关设置</p>
    </el-divider>
    <el-form-item label="Pixiv代理地址: ">
      <el-input v-model="config.proxy"></el-input>
    </el-form-item>
    <el-form-item label="Pixiv Cookies: ">
      <el-input v-model="config.pixivCookie"></el-input>
    </el-form-item>

    <el-divider content-position="left">
      <p style="font-weight: bold">OSS相关设置</p>
    </el-divider>
    <el-form-item label="腾讯云COS bucket地址: ">
      <el-input v-model="config.tencentOssBaseUrl"></el-input>
    </el-form-item>
    <el-form-item label="腾讯云COS Secret Id: ">
      <el-input v-model="config.tencentOssSecretId"></el-input>
    </el-form-item>
    <el-form-item label="腾讯云COS Secret Key: ">
      <el-input v-model="config.tencentOssSecretKey"></el-input>
    </el-form-item>

  </el-form>
</template>

<script>
import {reactive, toRefs} from 'vue'
export default {
  name: "Config",
  setup(){
    const state = reactive({
      config: {
        proxy: '',
        projectBaseUrl: '',
        pixivCookie:'',
        adminAccount:'',
        adminPassword:'',
        tencentOssBaseUrl:'',
        tencentOssSecretId:'',
        tencentOssSecretKey:'',
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>