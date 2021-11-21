<template>
  <el-row type="flex" justify="center">
    <el-image style="margin: 10px" :src="imageData.urls.regular" fit="contain" :preview-src-list="[imageData.urls.original]" hide-on-click-modal></el-image>
    <el-descriptions style="width: 100%" border size="small" :column="2">
      <template #extra>
        <el-button circle @click="collectImage">
          <el-icon color="#f56c6c">
            <star-filled v-if="imageData.like" ></star-filled>
            <star v-else></star>
          </el-icon>
        </el-button>
        <el-button v-if="!editMode" circle @click="showEditBox">
          <el-icon>
            <Edit/>
          </el-icon>
        </el-button>
        <el-button v-if="editMode" circle @click="saveEdit">
          <el-icon>
            <Check/>
          </el-icon>
        </el-button>
        <el-button circle type="danger" @click="deleteImage">
          <el-icon>
            <Delete/>
          </el-icon>
        </el-button>
      </template>
      <div v-if="!editMode">
        <el-descriptions-item label="图片标题:">
          <template #label>
            <p>图片标题:</p>
          </template>
          <p>{{ imageData.title }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="pid:">
          <p style="white-space:nowrap">{{ imageData.pid }}</p>
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <p style="white-space:nowrap">
              <el-button type="text" style="display: inline-block;padding: 0" circle @click="collectAuthor">
                <el-icon size="22" color="red">
                  <star-filled v-if="imageData.authorLiked" ></star-filled>
                  <star v-else></star>
                </el-icon>
              </el-button>
              图片作者:</p>
          </template>
          <div>
            <el-button type="text" @click="jumpToSearch(imageData.author)">{{ imageData.author }}</el-button>
          </div>
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <p style="white-space:nowrap">作者id:</p>
          </template>
          <p style="white-space:nowrap">{{ imageData.authorId }}</p>
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <p style="white-space:nowrap">存储方式:</p>
          </template>
          <p style="white-space:nowrap">{{ storageTypeMap[imageData.storageType] }}</p>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片标签:</p>
          </template>
          <el-tag style="margin: 2px"
                  :key="tag"
                  v-for="tag in imageData.tags">
            {{ tag }}
          </el-tag>
        </el-descriptions-item>
      </div>
      <div v-if="editMode">
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片标题:</p>
          </template>
          <el-input v-model="imageForm.title"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">pid:</p>
          </template>
          <el-input v-model="imageForm.pid"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片作者:</p>
          </template>
          <el-input  v-model="imageForm.author"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">作者id:</p>
          </template>
          <el-input  v-model="imageForm.authorId"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片标签:</p>
          </template>
          <div style="height: 100px;overflow-y: scroll">
            <el-tag style="margin: 2px"
                    :key="tag"
                    v-for="tag in imageForm.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
          </div>
        </el-descriptions-item>
      </div>
    </el-descriptions>
  </el-row>
</template>

<script>
import {updateImageInfo,fetchImageDetail,deleteImage} from "../../api/image"
import {likeAuthors} from "../../api/author"
import {likeImage} from "../../api/system"
import {ElMessage, ElMessageBox} from 'element-plus'
import {StarFilled,Star, Edit, Check, Delete} from "@element-plus/icons";
export default {
  name: "PhotoDetail",
  props:{
    id:{
      type:String,
      required:true
    }
  },
  components: {
    StarFilled,Star,Edit,Check,Delete
  },
  emits:["isDelete"],
  data(){
    return {
      storageTypeMap: {
        "LOCAL": "本地存储",
        "TENXUN": "腾讯云"
      },
      inputVisible:false,
      inputValue:'',
      imageData:{
        urls:{
          regular:'',
          original:''
        },
        authorLiked: false
      },
      imageForm: {
        pid:'',
        title:'',
        author:'',
        authorId:'',
        tags:[]
      },
      editMode:false
    }
  },
  created() {
    this.refreshImageInfo(this.id)
  },
  watch:{
    id(newVal){
      this.refreshImageInfo(newVal)
      this.editMode = false
    }
  },
  methods:{
    async jumpToSearch(authorId){
      let routeUrl = this.$router.resolve({
        path: "/keyWord/" + authorId
      });
      window.open(routeUrl .href, '_blank');
    },
    async collectImage(){
      this.imageData.like = !this.imageData.like
      await likeImage(this.id,this.imageData.like)
    },
    async collectAuthor(){
      await likeAuthors({
        uid:this.imageData.authorId,
        like:!this.imageData.authorLiked
      })
      await this.refreshImageInfo(this.id)
    },
    deleteImage(){
      ElMessageBox.confirm("确定要删除此图片吗？").then(async _ => {
        await deleteImage(this.id)
        this.$emit("isDelete")
      }).catch(_=>{
        ElMessage.success("取消删除")
      })

    },
    async refreshImageInfo(id){
      const {data}  = await fetchImageDetail(id)
      this.imageData = data
      this.imageForm.pid = data.pid
      this.imageForm.title = data.title
      this.imageForm.author = data.author
      this.imageForm.authorId = data.authorId
      this.imageForm.tags = data.tags
    },
    showEditBox(){
      this.editMode = true
    },
    async saveEdit(){
      await updateImageInfo(this.id,this.imageForm)
      this.editMode = false
      await this.refreshImageInfo(this.id)
    },
    handleClose(tag) {
      this.imageForm.tags.splice(this.imageForm.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.imageForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>

</style>