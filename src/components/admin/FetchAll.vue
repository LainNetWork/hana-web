<template>
  <div>
    <el-form inline>
      <el-form-item label="画师uid：" prop="uid">
        <el-input v-model="searchForm.uid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-image v-for="item in data" :src="item.url">

    </el-image>
  </div>
</template>

<script>
import { fetchImagesByUid } from "../../api/pixiv"
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
    }
  }
}
</script>

<style scoped>

</style>