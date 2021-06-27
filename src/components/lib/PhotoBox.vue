<template>
  <el-container>
    <el-header>
      <el-input placeholder="搜索画作" style="width: 500px" v-model="imageForm.keyWord" @keypress="keyPressSearch"/>
      <div style="display: inline-block;margin-left: 100px">
        <slot></slot>
      </div>
    </el-header>
    <el-main style="padding-left: 0;padding-right: 0">
      <el-row >
        <div class="wrapper">
          <el-image :hide-on-click-modal="true" :key="index" fit="contain" v-for="(item, index) in pictures " style="width: 240px;height: 160px;"
                    :src="item.urls.mini" @click="openImageDetailBox(item)">
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
        </div>
      </el-row>
      <el-dialog v-model="showDetailBox" width="600px">
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
import PhotoDetail from "./PhotoDetail";
export default {
  name: "PhotoBox",
  components: {PhotoDetail},
  props:{
    fetchImgFunc:{
      type:Function,
      required:true
    }
  },
  data(){
    return {
      showImageDetail:false,
      showDetailBox:false,
      showDetailBoxData:{},
      imageForm:{
        keyWord:"",
        pageSize:24,
        pageNum:1,
        total:0
      },
      pictures: []
    }
  },
  created() {
    this.fetchImageList()
  },
  inject:['isCollapse'],
  watch:{
    isCollapse:{
      immediate: true,
      deep: true,
      handler(){
        this.fetchImageList()
      }
    }
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
      console.log("测试",this.isCollapse.value)
      if (this.isCollapse.value.isCollapse) {
        this.imageForm.pageSize=28
      }else {
        this.imageForm.pageSize=24
      }
      const { data } = await this.fetchImgFunc(this.imageForm)
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