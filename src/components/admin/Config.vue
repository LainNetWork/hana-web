<template>
  <el-form style="width: 800px;margin-left: auto;margin-right: auto;margin-top: 100px"  label-position="left" label-width="170px" size="medium">
    <el-divider content-position="left">
      <p style="font-weight: bold">Api设置</p>
    </el-divider>
    <el-form-item label="系统BaseUrl: ">
      <el-input v-model="config.projectBaseUrl"></el-input>
    </el-form-item>
<!--    <el-form-item label="系统管理员账号: ">-->
<!--      <el-input v-model="config.adminAccount"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="系统管理员密码: ">-->
<!--      <el-input v-model="config.adminPassword"></el-input>-->
<!--    </el-form-item>-->

    <el-divider content-position="left" >
      <p style="font-weight: bold">Pixiv相关设置</p>
    </el-divider>
    <el-form-item label="Pixiv代理地址: ">
      <el-input v-model="config.proxy"></el-input>
    </el-form-item>
    <el-form-item label="Pixiv Cookies: ">
      <el-input show-password v-model="config.pixivCookie"></el-input>
    </el-form-item>
    <el-form-item label="System Token">
      <el-input show-password v-model="config.systemToken"></el-input>
      <el-button @click="generateSystemKey">重置token</el-button>
    </el-form-item>
    <el-divider content-position="left">
      <p style="font-weight: bold">OSS相关设置</p>
    </el-divider>
    <el-form-item label="腾讯云COS bucket地址: ">
      <el-input show-password v-model="config.tencentOssBaseUrl"></el-input>
    </el-form-item>
    <el-form-item label="腾讯云COS Secret Id: ">
      <el-input show-password v-model="config.tencentOssSecretID"></el-input>
    </el-form-item>
    <el-form-item label="腾讯云COS Secret Key: ">
      <el-input show-password v-model="config.tencentOssSecretKey"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveSystemConfig()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import {fetchSystemConfig, generateKey, saveConfig, SystemConfig} from '../../api/system'
import {ElMessage} from "element-plus";

export interface SystemConfigData {
  config:SystemConfig
}
export default defineComponent({
  name: "Config",
  setup(){
    const state = reactive<SystemConfigData>({
      config: {
        proxy: '',
        projectBaseUrl: '',
        pixivCookie:'',
        systemToken:'',
        adminAccount:'',
        adminPassword:'',
        tencentOssBaseUrl:'',
        tencentOssSecretID:'',
        tencentOssSecretKey:'',
      },
    })
    const getSysConfig = async ()=>{
      state.config = await fetchSystemConfig()
    }
    onMounted(()=>{
      getSysConfig()
    })
    const saveSystemConfig = async ()=>{
      await saveConfig(state.config)
      ElMessage.success("保存成功！")
    }
    const generateSystemKey = async ()=>{
      const { data } = await generateKey();
      state.config.systemToken = data
    }
    return {
      ...toRefs(state),
      saveSystemConfig,
      generateSystemKey
    }
  }
})
</script>

<style scoped>

</style>