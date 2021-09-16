<template>
  <el-container>
    <el-header>
      <el-input placeholder="搜索画作" style="width: 500px" v-model="imageForm.keyWord" @keypress="keyPressSearch"/>
      <div style="display: inline-block;margin-left: 100px">
        <slot></slot>
      </div>
      <div>
        <el-radio v-model="imageForm.like" :label="true">收藏</el-radio>
        <el-radio v-model="imageForm.like" :label="false">未收藏</el-radio>
      </div>
    </el-header>
    <el-main style="padding-left: 0;padding-right: 0">
      <el-row style="margin-bottom: 10px">
        <el-col :span="2">
          <el-radio-group v-model="showType">
            <el-radio-button label="pic"><i class="el-icon-s-grid"/></el-radio-button>
            <el-radio-button label="table"><i class="el-icon-tickets"/></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-star-on" @click="showLikeBoxDialog">收藏</el-button>
          <el-dialog title="收藏图片" v-model="showLikeBox" show-close>
            <LikeCheckBox :selected="likeBoxVal" v-on:beClosed="showLikeBox = false"/>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-checkbox style="margin: 10px" v-model="selectAll" :indeterminate="indeterminate"  @change="allChange">全选</el-checkbox>
      </el-row>
      <el-row >
        <div v-if="showType === 'pic'" class="wrapper">
          <div :key="index"  v-for="(item, index) in pictures " class="imageBox" style="width: 240px;height: 160px;">
            <el-image :hide-on-click-modal="true" fit="contain" class="image"
                      :src="item.urls.mini" @click="openImageDetailBox(item.id)">
              <template #error>
                <div class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </template>
            </el-image>
            <el-checkbox style="z-index: 2" type="text" v-model="listBind[item.id]" class="star" icon="el-icon-star-on" @change="changeOne"></el-checkbox>
            <el-button  style="font-size: 20px;z-index: 2" type="text" class="like" :icon="item.like?'el-icon-star-on':'el-icon-star-off'" circle @click="collectImage(item)"></el-button>
          </div>
        </div>
        <el-table v-if="showType === 'table'" @select-all="" ref="multipleTable" fit :data="pictures" @selection-change="selectionChange" height="700">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column prop="urls" label="预览">
            <template #default="scope">
              <el-image style="height: 80px;width: 120px" fit="contain" :src="scope.row.urls.mini" :preview-src-list="[scope.row.urls.original]"/>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"/>
          <el-table-column prop="author" label="作者"/>
          <el-table-column prop="authorId" label="作者Id"/>
          <el-table-column prop="pid" label="Pid"/>
          <el-table-column prop="storageType" label="存储类型" :formatter="formatTable"/>
          <el-table-column prop="urls" label="标签" :width="600">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.tags">{{tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="like" label="收藏">
            <template #default="scope">
              <el-button style="font-size: 20px" type="text" :icon="scope.row.like?'el-icon-star-on':'el-icon-star-off'" circle @click="collectImage(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-dialog v-model="showDetailBox" width="600px">
        <PhotoDetail :id="showDetailBoxData" v-on:isDelete="isDelete"/>
      </el-dialog>
    </el-main>
    <el-footer>
      <el-pagination
          style="float: right"
          background
          :current-page="imageForm.pageNum"
          @current-change="changePage"
          layout="total, prev, pager, next"
          :page-size="imageForm.pageSize"
          :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import PhotoDetail from "./PhotoDetail";
import LikeCheckBox from "./LikeCheckBox";
import { likeImage } from "../../api/system"
export default {
  name: "PhotoBox",
  components: {LikeCheckBox, PhotoDetail},
  props:{
    fetchImgFunc:{
      type:Function,
      required:true
    }
  },
  data(){
    return {
      storageTypeMap: {
        "LOCAL": "本地存储",
        "TENXUN": "腾讯云"
      },
      showImageDetail:false,
      showDetailBox:false,
      showDetailBoxData:'',
      imageForm:{
        like:false,
        keyWord:"",
        pageSize:24,
        pageNum:1,
      },
      selectAll:false,
      indeterminate:false,
      listBind:{}, //图片框模式下绑定勾选状态
      showType:'pic',
      showLikeBox:false,
      likeBoxVal:[],
      pictures: [],
      selections: [],
      total:0
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
    },
    "imageForm.like":function (){
      this.fetchImageList()
    }
  },
  methods:{
    changeOne(){
      let flag = false //是否全部选中
      let notFlag = false //是否未全部选中
      for(let item in this.listBind){
        if(this.listBind[item]){
          flag= true
        }else {
          notFlag = true
        }
      }
      if (flag) {
        this.selectAll = true
      }
      if (notFlag) {
        this.selectAll = false
      }
      this.indeterminate = flag
    },
    allChange(val){
      this.indeterminate = false
      for (let item of this.pictures){
        this.listBind[item.id] = val
      }
    },
    async collectImage(row){
      row.like = !row.like
      await likeImage(row.id,row.like)
      await this.fetchImageList()
    },
    showLikeBoxDialog(){
      let selected = []
      if(this.showType === "table"){
        this.likeBoxVal = this.selections
      }else {
        for(let item in this.listBind){
          if(this.listBind[item] === true){
            selected.push({
              id:item,
              url:this.pictures.filter(i=>i.id === item)[0].urls.mini
            })
          }
        }
        console.log(selected)
        this.likeBoxVal = selected
      }
      this.showLikeBox = true
    },
    selectionChange(val){
      let array = [];
      val.forEach( e =>{
        array.push({
          id:e.id,
          url:e.urls.mini
        })
      })
      this.selections = array;
    },
    isDelete(){
      this.showDetailBox = false
      this.fetchImageList()
    },
    openImageDetailBox(id){
      this.showDetailBoxData = id
      this.showDetailBox = true
    },
    async changePage(val){
      this.imageForm.pageNum = val
      await this.fetchImageList()
      this.listBind = {}
    },
    async fetchImageList(){
      if (this.isCollapse.value.isCollapse) {
        this.imageForm.pageSize=28
      }else {
        this.imageForm.pageSize=24
      }
      const { data } = await this.fetchImgFunc(this.imageForm)
      this.pictures = data.content
      this.total = data.total
    },
    // toggleSelection(rows){
    //   if (rows) {
    //     rows.forEach(row => {
    //       if (this.selections.includes(row.id)){
    //         this.$refs.multipleTable.toggleRowSelection(row);
    //       }
    //     })
    //   }
    // },
    async keyPressSearch(event){
      if (event.keyCode === 13){
        await this.fetchImageList()
      }
    },formatTable(row, column, cellValue, index){
      return this.storageTypeMap[row.storageType]
    }
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

.imageBox {
  border: 1px dashed #b7b3d4;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.star{ margin:5px;grid-area: 1 / 1 / 2 / 2; }
.image { grid-area: 1 / 1 / 6 / 6; }
.like { grid-area: 5 / 5 / 6 / 6; }
</style>
