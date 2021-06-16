<template>
  <el-container>
    <el-header>
      <el-input placeholder="搜索画作" style="width: 500px" v-model="imageForm.keyWord" @keypress="keyPressSearch"/>
    </el-header>
    <el-main>
      <el-row >
        <div class="wrapper">
          <el-image :hide-on-click-modal="true" :key="index" fit="contain" v-for="(item, index) in pictures " style="width: 240px;height: 160px;"
                    :src="item.url" @click="openImageDetailBox(item)">
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
        </div>
      </el-row>
      <el-dialog v-model="showDetailBox">
        <PhotoDetail :imgData="showDetailBoxData" />
      </el-dialog>
    </el-main>
    <el-footer>
      <el-pagination
          style="float: right"
          background
          :current-page="imageForm.pageNum"
          @current-change="changePage"
          layout="prev, pager, next"
          :page-size="imageForm.pageSize"
          :total="imageForm.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import fetchImageList from "../api/image";
import PhotoDetail from "./PhotoDetail.vue";
export default {
  name: "PhotoBox",
  components: {PhotoDetail},
  data(){
    return {
      showImageDetail:false,
      showDetailBox:false,
      showDetailBoxData:{},
      imageForm:{
        keyWord:"",
        pageSize:28,
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
    openImageDetailBox(item){
      this.showDetailBoxData = item
      this.showDetailBox = true
    },
    async changePage(val){
      this.imageForm.pageNum = val
      await this.fetchImageList()
    },
    async fetchImageList(){
      const { data } = await fetchImageList(this.imageForm)
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
.wrapper {
  width: 100%;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-template-rows: repeat(auto-fill, 160px);
}
</style>