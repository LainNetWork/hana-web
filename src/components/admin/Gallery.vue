<template>
  <div style="margin: 10px">
    <PhotoBox :fetch-img-func="fetchImageList">
      <image-uploader/>
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
  }
}
</script>

<style scoped>

</style>