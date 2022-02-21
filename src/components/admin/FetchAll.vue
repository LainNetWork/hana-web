<template>
  <div>
    <el-form inline>
      <el-form-item label="画师UID：" prop="uid">
        <el-input placeholder="请输入画师P站UID" v-model="searchForm.uid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">采集</el-button>
      </el-form-item>
      <el-form-item v-if="data.length !== 0">
        <el-select v-model="storageType">
          <el-option value="LOCAL" label="本地存储"/>
          <el-option value="TENXUN" label="腾讯云"/>
        </el-select>
      </el-form-item>
      <el-checkbox  v-if="data.length !== 0" v-model="like" label="是否收藏作者"></el-checkbox>
      <el-form-item v-if="data.length !== 0">
        <el-button @click="fetch">入库</el-button>
      </el-form-item>
    </el-form>
    <p v-if="data.length !== 0">已采集到{{ data.length }}张图片</p>
  </div>
</template>

<script lang="ts">
import {fetchImages, fetchPidsByUid} from "../../api/pixiv"
import {defineComponent, reactive, toRefs, watch} from "vue";

export default defineComponent({
  name: "FetchAll",
  setup(){
    const state = reactive({
      searchForm:{
        uid:''
      },
      storageType:'TENXUN',
      like:false,
      data:[] as string[]
    })
    const search = async ()=>{
      if (state.searchForm.uid === '') {
        return
      }
      state.data = await fetchPidsByUid(state.searchForm.uid)
    }
    const fetch = async()=>{
      if (state.data.length === 0) {
        return
      }
      const pids = [] as string[]
      state.data.forEach(e=>{
        pids.push(e)
      })
      const form = {
        storageType: state.storageType,
        pids: pids,
        authorId: state.searchForm.uid,
        like: state.like
      }
      await fetchImages(form)
      reset()
    }
    const reset = ()=>{
      state.data = []
      state.searchForm.uid = ''
    }
    return {
      ...toRefs(state),
      search,
      fetch
    }
  }
})
</script>

<style scoped>

</style>
