<template>
  <el-container>
    <el-header height="100px" style="margin-bottom: 20px">
      <div style="padding-top: 20px">
        <el-input placeholder="搜索画作" style="width: 500px" v-model="imageForm.keyWord" @keypress="keyPressSearch"/>
        <div>
          <el-radio v-model="imageForm.like" :label="true">收藏</el-radio>
          <el-radio v-model="imageForm.like" :label="false">未收藏</el-radio>
          <el-switch v-model="imageForm.r18" name="R18" active-text="ON" inactive-text="R18-OFF" @change="fetchImageList"/>
        </div>
      </div>
      <el-checkbox style="margin: 0 5px" v-model="selectAll" :indeterminate="indeterminate"  @change="allChange">全选</el-checkbox>
      <el-dialog title="收藏图片" v-model="showLikeBox" show-close>
        <LikeCheckBox :selected="likeBoxVal" v-on:beClosed="likeBoxClosed"/>
      </el-dialog>
      <el-button @click="cancelLikeSelect">
        <el-icon>
          <star-filled></star-filled>
        </el-icon>
        取消收藏
      </el-button>
      <el-button @click="showLikeBoxDialog">
        <el-icon color="red">
          <star></star>
        </el-icon>
        收藏
      </el-button>
      <el-button @click="deleteMany">
        <el-icon>
          <star-filled></star-filled>
        </el-icon>
        删除
      </el-button>
      <div style="display: inline-block;margin-left: 100px">
        <slot></slot>
      </div>
      <el-radio-group v-model="showType" style="float: right" >
        <el-radio-button label="pic">
          <el-icon><Grid /></el-icon>
        </el-radio-button>
        <el-radio-button label="table">
          <el-icon><List/></el-icon>
        </el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main>
      <el-row>
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
            <el-checkbox style="z-index: 2;width: 15px;height: 15px" type="text" v-model="listBind[item.id]" class="star" icon="el-icon-star-on" @change="changeOne"></el-checkbox>
            <div class="like"  >
              <el-button style="padding: 0;z-index: 2;" type="text" circle @click="deleteImage(item.id)">
                <el-icon :size="16" color="red">
                  <Delete/>
                </el-icon>
              </el-button>
              <el-button style="padding: 0;z-index: 2;" type="text" circle @click="collectImage(item)">
                <el-icon :size="16" color="red">
                  <star-filled v-if="item.like" ></star-filled>
                  <star v-else></star>
                </el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <el-scrollbar v-if="showType === 'table'" height="600px">
          <el-table ref="multipleTable" height="600px"  :data="pictures" @selection-change="selectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column width="100" prop="urls" label="预览">
              <template #default="scope" style="margin: auto">
                <el-image style="height: 80px;width: 120px" fit="contain" :src="scope.row.urls.mini" :preview-src-list="[scope.row.urls.original]"/>
              </template>
            </el-table-column>
            <el-table-column prop="title" width="250" label="标题"/>
            <el-table-column prop="author" width="100" label="作者"/>
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
                <el-button type="text" circle @click="collectImage(scope.row)">
                  <el-icon size="25">
                    <star-filled v-if="scope.row.like" ></star-filled>
                    <star v-else></star>
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-row>
      <el-dialog v-model="showDetailBox" width="600px">
        <PhotoDetail :id="showDetailBoxData" v-on:isDelete="isDelete" v-on:update="fetchImageList"/>
      </el-dialog>
      <div style="height: 60px"></div>
      <el-pagination class="pagination-box"
                     :current-page="imageForm.pageNum"
                     @current-change="changePage"
                     layout="total, prev, pager, next, jumper"
                     :page-size="imageForm.pageSize"
                     :total="total">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import PhotoDetail from "./PhotoDetail.vue";
import LikeCheckBox from "./LikeCheckBox.vue";
import { likeImage,dislikeImages } from "../../api/system"
import {StarFilled,Star,Grid,List,Delete} from "@element-plus/icons-vue";
import {deleteImage, deleteImages} from "../../api/image";
import {ElMessage, ElMessageBox} from "element-plus";
export default {
  name: "PhotoBox",
  components: {LikeCheckBox, PhotoDetail, Star, StarFilled, Grid,List,Delete},
  props:{
    fetchImgFunc:{
      type:Function,
      required:true
    },
    keyWord:{
      type:String,
    },
    taskId:{
      type:String,
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
        like:true,
        r18:false,
        taskId:this.taskId,
        keyWord:this.keyWord,
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
  // inject:['isCollapse'],
  watch:{
    // isCollapse:{
    //   immediate: true,
    //   deep: true,
    //   handler(){
    //     this.fetchImageList()
    //   }
    // },
    keyWord:function (newVal){
      this.imageForm.keyWord = newVal
      this.fetchImageList()
    },
    "imageForm.like":function (){
      this.fetchImageList()
    }
  },
  methods:{
    changeOne(){
      let select = 0
      for(let i in this.listBind){
        if(this.listBind[i]){
          select++
        }
      }
      if(select === 0){
        this.selectAll = false
        this.indeterminate = false;
      }else if (Object.getOwnPropertyNames(this.listBind).length !== select) {
        this.selectAll = false
        this.indeterminate = true
      }else {
        this.selectAll = true
        this.indeterminate = false
      }

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
      this.handlerSelect()
      this.showLikeBox = true
    },
    likeBoxClosed() {
      this.showLikeBox = false
      this.fetchImageList()
    },
    async deleteMany(){
      await ElMessageBox.confirm('确定要批量删除图片吗？');
      this.handlerSelect()
      let ids = this.likeBoxVal.map(e=>e.id);
      await deleteImages(ids)
      await this.fetchImageList()
    },
    deleteImage(id){
      ElMessageBox.confirm("确定要删除此图片吗？").then(async () => {
        await deleteImage(id)
        await this.fetchImageList()
      }).catch(_=>{
        ElMessage.success("取消删除")
      })
    },
    async cancelLikeSelect(){
      this.handlerSelect()
      let ids = this.likeBoxVal.map(e=>e.id);
      await dislikeImages({
        ids
      })
      await this.fetchImageList()
    },
    handlerSelect(){
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
        this.likeBoxVal = selected
      }
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
    },
    async fetchImageList(){
      const { data } = await this.fetchImgFunc(this.imageForm)
      this.pictures = data.content
      this.total = data.total
      this.listBind = {}
      for (let item of this.pictures){
        this.listBind[item.id] = false
      }
      this.indeterminate = false
      this.selectAll = false
    },
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
  justify-content: center;
  align-content: center;
}

.imageBox {
  border: 1px dashed #b7b3d4;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
}

.pagination-box{
  z-index: 2040;
  height:50px;
  width: 100%;
  position:absolute;
  padding: 5px 5px 5px 20px;
  border-radius: 25px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.30);
  left: 50%;
  bottom: 10px;
  background-color: white
}

.star{ margin:5px;grid-area: 1 / 1 / 2 / 2; }
.image { grid-area: 1 / 1 / 6 / 6; }
.like { grid-area: 5 / 5 / 6 / 6; margin:auto}
</style>
