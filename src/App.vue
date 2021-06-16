<template>
  <el-container>
    <el-header>
      <image-uploader></image-uploader>
    </el-header>
    <el-main>
      <PhotoBox/>
    </el-main>
  </el-container>
</template>

<script>
import PhotoBox from "./components/PhotoBox.vue";
import ImageUploader from "./components/ImageUploader.vue";
export default {
  name: 'App',
  components: {ImageUploader, PhotoBox}
}
</script>

<style>
</style>
