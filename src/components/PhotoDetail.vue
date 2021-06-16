<template>
  <el-row>
    <el-col :span="12">
      <div >
        <el-image style="width: 500px;height: 600px;" :src="imgData.url" :preview-src-list="[imgData.url]"></el-image>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="width: 300px;height: 600px;">
        <el-descriptions>
          <el-descriptions-item label="图片标题:">
            <el-input v-model="imgData.title"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="pid:">
            <el-input v-model="imgData.pid"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="图片作者:">
            <el-input v-model="imgData.author"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="作者id:">
            <el-input v-model="imgData.authorId"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="存储方式:">
            <el-select v-model="imgData.storageType">
              <el-option value="LOCAL" label="本地存储"></el-option>
              <el-option value="QINIU" label="七牛云OSS"></el-option>
              <el-option value="ALIYUN" label="阿里云OSS"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="图片标签:">
            <el-tag style="margin: 2px"
                    :key="tag"
                    v-for="tag in imgData.tags">
              {{ tag }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PhotoDetail",
  props:{
    imgData:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      // imgData:{
      //   pid:'',
      //   title: '',
      //   author:'',
      //   authorId:'',
      //   url:'',
      //   tags:[]
      // },
    }
  },
}
</script>

<style scoped>

</style>