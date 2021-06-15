<template>
  <div>
    <el-input placeholder="搜索画作" style="width: 500px" v-model="imageForm.keyWord" @keypress="keyPressSearch"/>
    <el-image :key="index" fit="contain" v-for="(item, index) in pictures " style="width: 250px;height: 180px;margin: 15px"
              :src="item.url" :previewSrcList="[item.url]">
      <template #error>
        <div class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </template>
    </el-image>
    <el-pagination
        style="float: right"
        background
        :current-page.sync="imageForm.pageNum"
        @current-change="changePage"
        layout="prev, pager, next"
        :page-size="imageForm.pageSize"
        :total="imageForm.total">
    </el-pagination>
  </div>
</template>

<script>
import fetchImageList from "../api/image";
export default {
  name: "PhotoBox",
  props:{

  },
  data(){
    return {
      imageForm:{
        keyWord:"",
        pageSize:16,
        pageNum:1,
        total:0
      },
      pictures: []
    }
  },
  created() {
    this.fetchImageList()
  },
  methods:{
    async changePage(val){
      this.imageForm.pageNum = val
      await this.fetchImageList()
    },
    async fetchImageList(){
      const { data } = await fetchImageList(this.imageForm)
      console.log(this.pictures)
      this.pictures = data.content
      this.imageForm.total = data.total
    },
    async keyPressSearch(event){
      if (event.keyCode === 13){
        await this.fetchImageList()
      }
    },
  },
}
</script>

<style scoped>

</style>