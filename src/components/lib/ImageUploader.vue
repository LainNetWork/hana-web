<template>
  <div >
    <el-button @click="openUploadBox">
      上传
      <el-icon class="el-icon--right">
        <upload />
      </el-icon>
    </el-button>
    <el-dialog
        title="新增图片"
        v-model="showUploadBox"
        :show-close="true"
        @closed="onclose"
        width="900px">
      <el-row type="flex" justify="space-around">
        <el-scrollbar style="width: 500px" height="600px">
          <el-upload
              action="#"
              :file-list="fileList"
              list-type="picture-card"
              :auto-upload="false"
              :multiple="true"
              :on-change="fileChange"
              :on-preview="showPreview"
              ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-image-viewer :hide-on-click-modal="true" v-if="showUploadPreview" :url-list="[uploadPreviewUrl]" @close="showUploadPreview=false"/>
        </el-scrollbar>
        <div style="width: 300px;height: 600px;">
          <el-form ref="form" :model="form" label-width="80px" size="small" label-position="top">
            <el-form-item label="图片标题:">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                pid:
                <el-button @click="searchPixivByPid(form.pid)" type="text" icon="el-icon-search"/>
              </template>
              <el-input v-model="form.pid"></el-input>
            </el-form-item>
            <el-form-item label="图片作者:">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="作者id:">
              <el-input v-model="form.authorId"></el-input>
            </el-form-item>
            <el-form-item label="存储方式:">
              <el-select v-model="form.storageType">
                <el-option value="LOCAL" label="本地存储"></el-option>
                <el-option value="TENXUN" label="腾讯云COS"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片标签:">
              <el-scrollbar height="100px">
                <el-tag style="margin: 2px"
                        :key="tag"
                        v-for="tag in form.tags"
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
              </el-scrollbar>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <template #footer>
          <span class="dialog-footer">
            <el-button style="margin-bottom: 15px" @click="clearSelectedImages">清空</el-button>
            <el-button type="primary" @click="upload">上传</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { searchPixivByPid } from "../../api/pixiv";
import { uploadImage } from "../../api/image"
import {Upload} from "@element-plus/icons-vue";
export default {
  name: "ImageUploader",
  emits:["OnClose"],
  components:{Upload},
  data(){
    return {
      form:{
        pid:'',
        title: '',
        author:'',
        authorId:'',
        originalUrl:'',
        storageType:'LOCAL',
        tags:[]
      },
      inputVisible: false,
      inputValue: '',
      showUploadBox: false,
      showUploadPreview:false,
      uploadPreviewUrl:'',
      fileList: [],
      realFileList:[],
    }
  },methods: {
    onclose(){
      this.$emit("OnClose")
    },
    async searchPixivByPid(pid){
      const { data } = await searchPixivByPid(pid)
      this.form = data
      this.form.storageType = "TENXUN"
    },
    showPreview(val){
      this.showUploadPreview = true
      this.uploadPreviewUrl = val.url
    },
    openUploadBox(){
      this.showUploadBox = true
    },
    cleanUploadBox() {
      this.$refs.upload.clearFiles()
      this.form = {
        pid:'',
        title: '',
        author:'',
        authorId:'',
        originalUrl:'',
        storageType:'LOCAL',
        tags:[]
      }
    },
    fileChange(file,fileList){
      this.realFileList = fileList
    },
    clearSelectedImages(){
      this.$refs.upload.clearFiles()
    },
    async upload() {
      const formData = new FormData()
      formData.append("pid",this.form.pid)
      formData.append("title",this.form.title)
      formData.append("author",this.form.author)
      formData.append("authorId",this.form.authorId)
      formData.append("storageType",this.form.storageType)
      formData.append("originalUrl",this.form.originalUrl)
      for(let i=0;i<this.realFileList.length;i++){
        formData.append("file",this.realFileList[i].raw);
      }
      this.form.tags.forEach(e=>{
        formData.append("tags",e);
      })
      await uploadImage(formData)
      this.$message.success("上传成功！")
    },
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
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
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>

</style>