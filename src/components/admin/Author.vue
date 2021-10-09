<template>
  <div style="height:700px;" >
    <div class="masonry" v-infinite-scroll="load">
      <el-card v-for="item in resultData.content" style="width: 100%;break-inside: avoid;margin-bottom: 10px" :body-style="{ padding: '0px' }">
        <div v-if="item.no_preview" @click="jumpToGallery(item._id)" style="text-align: center">
          <h1>不可描述</h1>
        </div>
        <el-image v-else  @click="jumpToGallery(item._id)" style="width: 100%" fit="contain" :src="item.urls.regular"></el-image>
        <div style="padding: 14px;">
          <h3>画师：{{ item.author_name }}</h3>
          <h3>UID:{{ item._id }}</h3>
        </div>
      </el-card>
    </div>
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
        pageSize:5,
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
      let routeUrl = this.$router.resolve({
        path: "/keyWord/" + id
      });
      window.open(routeUrl .href, '_blank');
    },
    load() {
      if (this.resultData.pageSize * this.resultData.pageNum <= this.resultData.total) {
        this.formData.pageNum = this.formData.pageNum + 1
        fetchAuthors(this.formData).then(e=>{
          let data = e.data
          this.resultData.content = this.resultData.content.concat(data.content)
          this.resultData.pageNum = data.pageNum
          this.resultData.pageSize = data.pageSize
        })
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
.masonry {
  padding: 30px;
  width: 1440px;
  margin: 20px auto;
  columns: 4;
  column-gap: 30px;
}
</style>