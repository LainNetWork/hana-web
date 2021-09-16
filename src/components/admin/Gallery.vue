<template>
  <div style="margin: 10px">
    <PhotoBox ref="picBox" :fetch-img-func="fetchImageList" :key-word="inKeyWord">
      <image-uploader v-on:OnClose="imgUploadClose"/>
    </PhotoBox>
  </div>
</template>

<script>
import { fetchImageList } from "../../api/image";
import PhotoBox from "../../components/lib/PhotoBox";
import ImageUploader from '../../components/lib/ImageUploader'
export default {
  name: "HomePage",
  components:{
    PhotoBox,
    ImageUploader
  },
  props:{
    keyWord:{
      type: String
    }
  },
  data(){
    return {
      inKeyWord: this.keyWord
    }
  },setup(){
    return {fetchImageList}
  },
  created() {
    console.log(this.keyWord)
    console.log(this.inKeyWord)
  }
  ,methods:{
    imgUploadClose(){
      this.$refs["picBox"].fetchImageList()
    }
  }
}
</script>

<style scoped>

</style>