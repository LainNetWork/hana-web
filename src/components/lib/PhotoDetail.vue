<template>
  <el-dialog :title="imageData.title" @before-close="closeDialog" destroy-on-close center v-model="showDetail" width="80%" top="3vh" >
    <template #footer>
      <el-button size="large"	:icon="ArrowLeftBold" circle @click="pre"></el-button>
      <el-button circle @click="collectImage">
        <el-icon color="#f56c6c">
          <star-filled v-if="imageData.like" ></star-filled>
          <star v-else></star>
        </el-icon>
      </el-button>
      <el-button circle @click="showImageData = true">
        <el-icon>
          <Document/>
        </el-icon>
      </el-button>
      <el-button circle type="danger" @click="deleteImageData">
        <el-icon>
          <Delete/>
        </el-icon>
      </el-button>
      <el-button size="large" :icon="ArrowRightBold" @click="next" circle></el-button>
    </template>

    <el-image style="height: 700px;width: 100%" lazy :src="imageData.urls.original" fit="contain" :preview-src-list="[imageData.urls.original]" hide-on-click-modal></el-image>

    <el-dialog v-model="showImageData">
      <el-descriptions style="margin: auto" border size="small" :column="2">
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
      </el-descriptions>
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
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup>
import {deleteImage, fetchImageDetail, ImageInfo, updateImageInfo} from "../../api/image"
import {likeAuthors} from "../../api/author"
import {likeImage} from "../../api/system"
import {ElMessage, ElMessageBox} from 'element-plus'
import {ArrowLeftBold, ArrowRightBold,StarFilled,Star, Edit, Check, Delete,Document} from "@element-plus/icons-vue";
import {onMounted, PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import DynamicTags from "./DynamicTags.vue";


const props = defineProps({
  show: {
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

const calImagePosition = (id:string)=>{
  return props.pageData.findIndex(e=>e.id === id)
}
const currentImagePosition = ref(calImagePosition(props.id))
const showDetail =ref(false)
const emit = defineEmits(["isDelete","update:show","close"]);
const storageTypeMap = {
  "LOCAL": "本地存储",
  "TENXUN": "腾讯云"
}
onMounted(()=>{
  showDetail.value = props.show
})
const imageData = ref({
  id:'',
  authorId:'',
  urls:{
    regular:'',
    original:''
  },
  title:'',
  pid:'',
  tags:[] as string[],
  author:'',
  storageType:'',
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
  imageForm.value.tags = imageData.value.tags
  imageForm.value.pid = imageData.value.pid
  imageForm.value.title = imageData.value.title
  imageForm.value.author = imageData.value.author
  imageForm.value.authorId = imageData.value.authorId
}
const saveEdit = async ()=>{
  await updateImageInfo(props.id,imageForm.value)
  editMode.value = false
  await refreshImageInfo(props.id)
}
const closeDialog = ()=> {
  emit("close")
}
const deleteImageData = ()=>{
  ElMessageBox.confirm("确定要删除此图片吗？").then(async _ => {
    await deleteImage(props.id)
    emit("isDelete")
  }).catch(_=>{
    ElMessage.success("取消删除")
  })
}

const pre = ()=>{
  //当前图片的index
  let index = calImagePosition(imageData.value.id);
  if (index <= 0) {
    imageData.value = props.pageData[props.pageData.length - 1]
  }else {
    imageData.value = props.pageData[index -1]
  }
}
const next = ()=>{
  //当前图片的index
  const total = props.pageData.length;
  let index = calImagePosition(imageData.value.id);
  console.log(total,index)
  if (index >= total - 1) {
    imageData.value = props.pageData[0]
  }else {
    imageData.value = props.pageData[index + 1]
  }
}
const refreshImageInfo = async (id:string)=>{
  imageData.value = await fetchImageDetail(id)
}
watch(()=>props.id,(newVal:string)=>{
  refreshImageInfo(newVal)
  editMode.value = false
  currentImagePosition.value = calImagePosition(imageData.value.id)
})
watch(()=>props.pageData,(newVal:ImageInfo[])=>{
  cachedPageData.value = newVal
  cachedImageUrls.value = newVal.map(e=>e.urls.regular)
  currentImagePosition.value = calImagePosition(imageData.value.id)
})
watch(()=>props.show,(newVal:boolean)=>{
  showDetail.value = newVal
})
watch(showDetail,(newVal:boolean)=>{
  emit("update:show",newVal)
})
</script>

<style scoped>

</style>