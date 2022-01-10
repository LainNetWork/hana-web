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

<script>
import { fetchImagesByUid } from "../../api/pixiv"
import { fetchImages } from "../../api/pixiv"
import {ElMessage} from "element-plus";
export default {
  name: "FetchAll",
  data(){
    return {
      searchForm:{
        uid:''
      },
      storageType:'TENXUN',
      like:false,
      data:[]
    }
  },
  watch:{
    "searchForm.uid":function () {
      this.reset()
    }
  },
  methods:{
    async search(){
      if (this.searchForm.uid === '') {
        return
      }
      const { data } = await fetchImagesByUid(this.searchForm.uid)
      this.data = data
    },async fetch(){
      if (this.data.length === 0) {
        return
      }
      const pids = []
      this.data.forEach(e=>{
        pids.push(e.id)
      })
      const form = {
        storageType: this.storageType,
        pids: pids,
        authorId: this.data[0].userId,
        like: this.like
      }
      await fetchImages(form)
      this.data = []
      this.uid = ''
    },async reset() {
      this.data = []
      this.uid = ''
    }
  }
}
</script>

<style scoped>

</style>
