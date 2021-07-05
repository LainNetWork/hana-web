<template>
  <el-row type="flex" justify="center">
    <el-image style="margin: 10px" :src="imageData.urls.regular" fit="contain" :preview-src-list="[imageData.urls.original]" hide-on-click-modal></el-image>
    <el-descriptions style="width: 100%" border size="small" :column="2">
      <template #extra>
        <el-button v-if="!editMode" circle icon="el-icon-edit" @click="showEditBox()"></el-button>
        <el-button v-if="editMode" circle icon="el-icon-check" @click="saveEdit()"></el-button>
<!--        <el-button circle icon="el-icon-delete" type="danger"></el-button>-->
      </template>
      <div v-if="!editMode">
        <el-descriptions-item label="图片标题:">
          <p style="white-space:nowrap">{{ imageData.title }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="pid:">
          <p style="white-space:nowrap">{{ imageData.pid }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="图片作者:">
          <p style="white-space:nowrap">{{ imageData.author }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="作者id:">
          <p style="white-space:nowrap">{{ imageData.authorId }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="存储方式:">
          <p style="white-space:nowrap">{{ storageTypeMap[imageData.storageType] }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="图片标签:">
          <el-tag style="margin: 2px"
                  :key="tag"
                  v-for="tag in imageData.tags">
            {{ tag }}
          </el-tag>
        </el-descriptions-item>
      </div>
      <div v-if="editMode">
        <el-descriptions-item label="图片标题:">
          <el-input style="white-space:nowrap" v-model="imageForm.title"/>
        </el-descriptions-item>
        <el-descriptions-item label="pid:">
          <el-input style="white-space:nowrap" v-model="imageForm.pid"/>
        </el-descriptions-item>
        <el-descriptions-item label="图片作者:">
          <el-input style="white-space:nowrap" v-model="imageForm.author"/>
        </el-descriptions-item>
        <el-descriptions-item label="作者id:">
          <el-input style="white-space:nowrap" v-model="imageForm.authorId"/>
        </el-descriptions-item>
        <el-descriptions-item label="图片标签:">
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
import {updateImageInfo,fetchImageDetail} from "../../api/image"
export default {
  name: "PhotoDetail",
  props:{
    id:{
      type:String,
      required:true
    }
  },
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
        }
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
    }
  },
  methods:{
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