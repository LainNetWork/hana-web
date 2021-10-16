<template>
  <div class="masonry" >
    <el-card v-for="item in resultData.content" style="width: 100%;break-inside: avoid;margin-bottom: 10px" :body-style="{ padding: '0px' }">
      <div style="overflow:hidden;">
        <div v-if="item.no_preview" @click="jumpToGallery(item.uid)" style="text-align: center">
          <h1>不可描述</h1>
        </div>
        <el-image v-else  @click="jumpToGallery(item.uid)" style="width: 100%" fit="contain" :src="item.urls.regular"></el-image>
      </div>
      <div style="padding: 10px;position: relative">
        <div><h3>画师：{{ item.author_name }}</h3></div>
        <div><h3>UID:{{ item.uid }}</h3></div>
        <el-button @click="likeAuthor(item)" type="text" :icon="item.like?'el-icon-star-on':'el-icon-star-off'" style="font-size: 25px;position: absolute;right: 10px;bottom: 10px;color: #ff4d51;"/>
      </div>
    </el-card>
  </div>
  <div>
    <el-pagination background layout="prev, pager, next" :total="resultData.total" :page-size="formData.pageSize" @current-change="changePage"></el-pagination>
  </div>

</template>

<script>
import { fetchAuthors, likeAuthors } from "../../api/author"
export default {
  name: "Author",
  created() {
    this.fetchAuthorList()
  },
  data(){
    return{
      formData:{
        pageSize:20,
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
    changePage(page){
      this.formData.pageNum = page
      this.fetchAuthorList()
    },
    // load() {
    //   if (this.resultData.pageSize * this.resultData.pageNum <= this.resultData.total) {
    //     this.formData.pageNum = this.formData.pageNum + 1
    //     fetchAuthors(this.formData).then(e=>{
    //       let data = e.data
    //       this.resultData.content = this.resultData.content.concat(data.content)
    //       this.resultData.pageNum = data.pageNum
    //       this.resultData.pageSize = data.pageSize
    //     })
    //   }
    // },
    async likeAuthor(item){
      await likeAuthors({
        uid:item.uid,
        like:!item.like
      })
      await this.fetchAuthorList()
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