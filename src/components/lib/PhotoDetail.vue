<template>
  <el-row type="flex" justify="center">
    <el-image :src="imgData.urls.regular" fit="contain" :preview-src-list="[imgData.urls.original]" hide-on-click-modal></el-image>
    <el-descriptions title=" " border size="small" column="2">
      <el-descriptions-item label="图片标题:">
        <p>{{imgData.title}}</p>
      </el-descriptions-item>
      <el-descriptions-item label="pid:">
        <p>{{imgData.pid}}</p>
      </el-descriptions-item>
      <el-descriptions-item label="图片作者:">
        <p>{{imgData.author}}</p>
      </el-descriptions-item>
      <el-descriptions-item label="作者id:">
        <p>{{imgData.authorId}}</p>
      </el-descriptions-item>
      <el-descriptions-item label="存储方式:">
        <p>{{storageTypeMap[imgData.storageType]}}</p>
      </el-descriptions-item>
      <el-descriptions-item label="图片标签:">
        <el-tag style="margin: 2px"
                :key="tag"
                v-for="tag in imgData.tags">
          {{ tag }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
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
      storageTypeMap: {
        "LOCAL": "本地存储",
        "TENXUN": "腾讯云"
      }
    }
  },
}
</script>

<style scoped>

</style>