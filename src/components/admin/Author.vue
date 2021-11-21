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
        <el-button @click="likeAuthor(item)" type="text" style="position: absolute;right: 10px;bottom: 10px;color: #ff4d51;">
          <el-icon size="30">
            <StarFilled  v-if="item.like" ></StarFilled>
            <Star v-else></Star>
          </el-icon>
        </el-button>
      </div>
    </el-card>
  </div>
  <div>
    <el-pagination background layout="prev, pager, next" :total="resultData.total" :page-size="formData.pageSize" @current-change="changePage"></el-pagination>
  </div>

</template>

<script>
import { fetchAuthors, likeAuthors } from "../../api/author"
import {defineComponent } from 'vue'
import {Star,StarFilled} from "@element-plus/icons";

export default defineComponent({
  name: "Author",
  created() {
    this.fetchAuthorList()
  },
  components: {
    Star,
    StarFilled
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
})
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