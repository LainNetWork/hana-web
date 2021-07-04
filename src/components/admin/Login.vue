<template>
  <div>
    <el-form label-position="left" label-width="50px" style="margin: auto;width: 300px;height: 300px">
      <el-form-item label="账号:">
        <el-input v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input show-password type="" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginFunc">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/system";
import {toRefs, reactive} from "vue";
import router from '../../config/route'
export default {
  name: "Login",
  setup(){
    const state = reactive({
      account: '',
      password:''
    })
    const loginFunc = async ()=>{
      await login(state.account,state.password)
      router.push("/")
    }
    return {
      ...toRefs(state),
      loginFunc
    }
  }
}
</script>

<style scoped>

</style>