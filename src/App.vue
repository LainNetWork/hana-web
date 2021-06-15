<template>
  <el-container>
    <el-header>
      <div style="height: 200px"></div>
    </el-header>
    <el-col>
      <el-row type="flex" justify="center" style="margin: 10px">
        <el-button @click="openUploadBox">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-row>
      <el-row>
        <PhotoBox></PhotoBox>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 15px">

      </el-row>
    </el-col>
    <el-dialog
        title="新增图片"
        v-model.sync="showUploadBox"
        show-close="true"
        width="900px">
      <el-row>
        <el-button style="margin-bottom: 15px" @click="clearSelectedImages">清空</el-button>
      </el-row>
      <el-row>
        <el-col span="12">
          <div
              style="width: 485px;height: 600px;overflow-y: scroll;padding:5px;margin:5px;border: dashed #aca5a5;border-radius:10px;">
            <el-upload
                action="#"
                :file-list="fileList"
                list-type="picture-card"
                :auto-upload="false"
                :multiple="true"
                :on-change="fileChange"
                ref="upload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col span="12">
          <div style="width: 300px;height: 600px;border: dashed #aca5a5;margin:5px;padding:5px;border-radius:10px;">
            <el-form ref="form" :model="form" label-width="80px" size="small" label-position="top">
              <el-form-item label="图片标题:">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="pid:">
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
                  <el-option value="QINIU" label="七牛云OSS"></el-option>
                  <el-option value="ALIYUN" label="阿里云OSS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片标签:">
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
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="upload">上传</el-button>
          </span>
      </template>
    </el-dialog>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
import PhotoBox from "./components/PhotoBox.vue";
export default {
  name: 'App',
  components: {PhotoBox},
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      showUploadBox: false,
      fileList: [],
      realFileList:[],
      form:{
        pid:'',
        title: '',
        author:'',
        authorId:'',
        originalUrl:'',
        storageType:'',
        tags:[]
      },
    }
  },
  created(){

  },
  methods: {

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
        storageType:'',
        tags:[]
      }
    },
    fileChange(file,fileList){
      this.realFileList = fileList
    },
    clearSelectedImages(){
      this.$refs.upload.clearFiles()
    },
    upload() {
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
      this.$http.post('/api/upload',formData).then(res=>{
        this.$message.success("上传成功！")
        this.cleanUploadBox()
      }).catch(e=>{
        this.$message.error("上传失败！")
      })

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
