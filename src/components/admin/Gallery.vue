<template>
  <div style="margin-left: 5px;margin-right: 5px">
    <PhotoBox ref="picBox" :fetch-img-func="fetchImageList" :key-word="inKeyWord" :task-id="inTaskId">
      <image-uploader v-on:OnClose="imgUploadClose"/>
    </PhotoBox>
  </div>
</template>

<script>
import { fetchImageList } from "../../api/image";
import PhotoBox from "../../components/lib/PhotoBox.vue";
import ImageUploader from '../../components/lib/ImageUploader.vue'
import {defineComponent } from 'vue'

export default  defineComponent({
  name: "HomePage",
  components:{
    PhotoBox,
    ImageUploader
  },
  props:{
    keyWord:{
      type: String
    },
    taskId:{
      type: String
    }
  },
  data(){
    return {
      inKeyWord: this.keyWord,
      inTaskId: this.taskId
    }
  },setup(){
    return {fetchImageList}
  }
  ,methods:{
    imgUploadClose(){
      this.$refs["picBox"].fetchImageList()
    }
  }
})
</script>

<style scoped>

</style>
