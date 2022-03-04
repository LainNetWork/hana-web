<template>
  <el-dialog v-model="showDetail" width="80%" top="3vh" >
    <el-space style="display:flex;align-items:center;justify-content:center;" :size="50">
      <el-button>左</el-button>
      <div>
        <el-image style="height: 800px;width: 1200px;margin: auto" lazy :src="imageData.urls.original" fit="contain" :initial-index="currentImagePosition" :preview-src-list="cachedImageUrls" hide-on-click-modal></el-image>
      </div>
      <el-button>右</el-button>
      <el-descriptions v-if="showImageData" style="margin: auto" border size="small" :column="2">
        <template #extra>
          <el-button circle @click="collectImage">
            <el-icon color="#f56c6c">
              <star-filled v-if="imageData.like" ></star-filled>
              <star v-else></star>
            </el-icon>
          </el-button>
          <el-button v-if="!editMode" circle @click="showEditBox">
            <el-icon>
              <Edit/>
            </el-icon>
          </el-button>
          <el-button v-if="editMode" circle @click="saveEdit">
            <el-icon>
              <Check/>
            </el-icon>
          </el-button>
          <el-button circle type="danger" @click="deleteImageData">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
        <div>
          <el-descriptions-item label="图片标题:">
            <template #label>
              <p>图片标题:</p>
            </template>
            <p v-if="!editMode">{{ imageData.title }}</p>
            <el-input v-else v-model="imageForm.title"/>
          </el-descriptions-item>
          <el-descriptions-item label="pid:">
            <p v-if="!editMode" style="white-space:nowrap">{{ imageData.pid }}</p>
            <el-input v-else v-model="imageForm.pid"/>
          </el-descriptions-item>
          <el-descriptions-item >
            <template #label>
              <p style="white-space:nowrap">
                <el-button type="text" style="display: inline-block;padding: 0" circle @click="collectAuthor">
                  <el-icon size="22" color="red">
                    <star-filled v-if="imageData.authorLiked" ></star-filled>
                    <star v-else></star>
                  </el-icon>
                </el-button>
                图片作者:</p>
            </template>
            <div>
              <el-button v-if="!editMode"  type="text" @click="jumpToSearch(imageData.author)">{{ imageData.author }}</el-button>
              <el-input v-else  v-model="imageForm.author"/>
            </div>
          </el-descriptions-item>
          <el-descriptions-item >
            <template #label>
              <p style="white-space:nowrap">作者id:</p>
            </template>
            <el-button v-if="!editMode" type="text" @click="jumpToSearch(imageData.authorId)">{{ imageData.authorId }}</el-button>
            <el-input v-else v-model="imageForm.authorId"/>
          </el-descriptions-item>
          <el-descriptions-item >
            <template #label>
              <p style="white-space:nowrap">存储方式:</p>
            </template>
            <p style="white-space:nowrap">{{ storageTypeMap[imageData.storageType] }}</p>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <p style="white-space:nowrap">图片标签:</p>
            </template>
            <el-tag v-if="!editMode" style="margin: 2px"
                    :key="tag"
                    v-for="tag in imageData.tags">
              {{ tag }}
            </el-tag>
            <div v-else style="height: 100px;overflow-y: scroll">
              <DynamicTags v-model="imageForm.tags"></DynamicTags>
            </div>
          </el-descriptions-item>
        </div>
      </el-descriptions>
    </el-space>
  </el-dialog>
</template>

<script lang="ts" setup>
import {updateImageInfo, fetchImageDetail, deleteImage, ImageInfo} from "../../api/image"
import {likeAuthors} from "../../api/author"
import {likeImage} from "../../api/system"
import {ElMessage, ElMessageBox} from 'element-plus'
import {StarFilled,Star, Edit, Check, Delete} from "@element-plus/icons-vue";
import {onMounted, PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import DynamicTags from "./DynamicTags.vue";


const props = defineProps({
  showDetail: {
    type:Boolean,
    required:true
  },
  id:{
    type:String,
    required:true
  },
  pageData: {
    type:Array as PropType<ImageInfo[]>,
    required:true
  }
});

const cachedPageData  = ref(props.pageData);
const cachedImageUrls = ref(props.pageData.map(e=>e.urls.regular))
const showImageData = ref(false)

const calCurrentImagePosition = ()=>{
  return props.pageData.findIndex(e=>e.id === props.id)
}
const calCurrentImagePosition1 = calCurrentImagePosition();
const currentImagePosition = ref(calCurrentImagePosition1)

const emit = defineEmits(["isDelete","update","showDetail"]);
const storageTypeMap = {
  "LOCAL": "本地存储",
  "TENXUN": "腾讯云"
}
const imageData = ref({
  authorId:'',
  urls:{
    regular:'',
    original:''
  },
  authorLiked: false,
  like:false
})
const imageForm = ref({
  pid:'',
  title:'',
  author:'',
  authorId:'',
  tags:[] as string[]
})
const editMode = ref(false)
const router = useRouter();
const jumpToSearch = async (authorId:string)=>{
  let routeUrl = router.resolve({
    path: "/keyWord/" + authorId
  });
  window.open(routeUrl .href, '_blank');
}
const collectImage = async ()=>{
  imageData.value.like = !imageData.value.like
  await likeImage(props.id,imageData.value.like)
  emit("update")
}
const collectAuthor = async()=>{
  await likeAuthors({
    uid:imageData.value.authorId,
    like:!imageData.value.authorLiked
  })
  await refreshImageInfo(props.id)
}
const showEditBox = ()=>{
  editMode.value = true
}
const saveEdit = async ()=>{
  await updateImageInfo(props.id,imageForm.value)
  editMode.value = false
  await refreshImageInfo(props.id)
}
const deleteImageData = ()=>{
  ElMessageBox.confirm("确定要删除此图片吗？").then(async _ => {
    await deleteImage(props.id)
    emit("isDelete")
  }).catch(_=>{
    ElMessage.success("取消删除")
  })
}
const refreshImageInfo = async (id:string)=>{
  const data  = await fetchImageDetail(id)
  imageData.value = data
  imageForm.value.pid = data.pid
  imageForm.value.title = data.title
  imageForm.value.author = data.author
  imageForm.value.authorId = data.authorId
  imageForm.value.tags = data.tags
}
watch(()=>props.id,(newVal:string)=>{
  refreshImageInfo(newVal)
  editMode.value = false
  currentImagePosition.value = calCurrentImagePosition()
})
watch(()=>props.pageData,(newVal:ImageInfo[])=>{
  cachedPageData.value = newVal
  cachedImageUrls.value = newVal.map(e=>e.urls.regular)
  currentImagePosition.value = calCurrentImagePosition()
})
watch(()=>props.showDetail,(newVal:Boolean)=>{
  emit("showDetail",newVal)
})
</script>

<style scoped>

</style>