<template>
  <div class="image-box">
<!--    左边图片展示区域-->
  </div>
  <div class="imageInfo-box">
<!--    右边图片信息展示区域-->
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {fetchImageDetail} from "../../api/image";

export interface ImagePageData {
  id:string, //当前图片的id
  ImageIds:string[]// 当前页所有图片的id
}

export default defineComponent({
  name: "PhotoViewer",
  props:{
    // data: {
    //   type: Object as PropType<ImagePageData>
    // }
  },
  async setup(props) {
    const imageData = await fetchImageDetail('6211145a3f35701341584c56')
    console.log(imageData)
  }
})
</script>

<style scoped>
.image-box{
  width: 70%;
}
.imageInfo-box{
  width: 30%;
}
</style>