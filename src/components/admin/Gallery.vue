<template>
  <div style="margin: 10px">
    <PhotoBox ref="picBox" :fetch-img-func="fetchImageList">
      <image-uploader v-on:OnClose="imgUploadClose"/>
    </PhotoBox>
  </div>
</template>

<script>
import fetchImageList from "../../api/image";
import PhotoBox from "../../components/lib/PhotoBox";
import ImageUploader from '../../components/lib/ImageUploader'
export default {
  name: "HomePage",
  components:{
    PhotoBox,
    ImageUploader
  },setup(){
    return {fetchImageList}
  },methods:{
    imgUploadClose(){
      this.$refs["picBox"].fetchImageList()
    }
  }
}
</script>

<style scoped>

</style>