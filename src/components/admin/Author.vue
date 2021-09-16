<template>
  <div style="height:700px;" v-infinite-scroll="load">
    <el-card v-for="item in resultData.content" style="width: 300px;float: left;margin: 10px" :body-style="{ padding: '0px' }">
      <div v-if="item.no_preview" @click="jumpToGallery(item._id)" style="text-align: center">
        <h1>不可描述</h1>
      </div>
      <el-image v-else  @click="jumpToGallery(item._id)" style="width: 300px" fit="contain" :src="item.urls.regular"></el-image>
      <div style="padding: 14px;">
        <h3>画师：{{ item.author_name }}</h3>
        <h3>UID:{{ item._id }}</h3>
      </div>
    </el-card>
  </div>

</template>

<script>
import { fetchAuthors } from "../../api/author"
export default {
  name: "Author",
  created() {
    this.fetchAuthorList()
  },
  data(){
    return{
      formData:{
        pageSize:10,
        pageNum:1,
      },
      resultData:{
        content:[],
        total:0,
        pageSize:12,
        pageNum:1,
      },
    }
  },
  methods:{
    jumpToGallery(id){
      this.$router.push("/keyWord/" + id)
    },
    async load() {
      console.log("?")
      if (this.resultData.pageSize * this.resultData.pageNum <= this.resultData.total) {
        this.formData.pageNum = this.formData.pageNum + 1
        const {data} = await fetchAuthors(this.formData)
        this.resultData.content = this.resultData.content.concat(data.content)
        this.resultData.pageNum = data.pageNum
        this.resultData.pageSize = data.pageSize
        console.log(this.resultData.content)
      }
    },
    async fetchAuthorList(){
      const {data} = await fetchAuthors(this.formData)
      this.resultData = data
    }
  }
}
</script>

<style scoped>
</style>