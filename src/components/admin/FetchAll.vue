<template>
  <div>
    <el-form inline>
      <el-form-item label="画师uid：" prop="uid">
        <el-input v-model="searchForm.uid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="fetch">采集</el-button>
      </el-form-item>
    </el-form>
    <p v-if="data.length !== 0">已采集到{{data.length}}张图片</p>
  </div>
</template>

<script>
import { fetchImagesByUid } from "../../api/pixiv"
import { fetchImages } from "../../api/pixiv"

export default {
  name: "FetchAll",
  data(){
    return {
      searchForm:{
        uid:''
      },
      data:[]
    }
  },
  methods:{
    async search(){
      const { data } = await fetchImagesByUid(this.searchForm.uid)
      this.data = data
    },fetch(){
      fetchImages(this.data)
    }
  }
}
</script>

<style scoped>

</style>