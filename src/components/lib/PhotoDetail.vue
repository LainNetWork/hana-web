<template>
  <el-row type="flex" justify="center">
    <el-image style="margin: 10px" :src="imageData.urls.regular" fit="contain" :preview-src-list="[imageData.urls.original]" hide-on-click-modal></el-image>
    <el-descriptions style="width: 100%" border size="small" :column="2">
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
      <div v-if="!editMode">
        <el-descriptions-item label="图片标题:">
          <template #label>
            <p>图片标题:</p>
          </template>
          <p>{{ imageData.title }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="pid:">
          <p style="white-space:nowrap">{{ imageData.pid }}</p>
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
            <el-button type="text" @click="jumpToSearch(imageData.author)">{{ imageData.author }}</el-button>
          </div>
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <p style="white-space:nowrap">作者id:</p>
          </template>
          <el-button type="text" @click="jumpToSearch(imageData.authorId)">{{ imageData.authorId }}</el-button>
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
          <el-tag style="margin: 2px"
                  :key="tag"
                  v-for="tag in imageData.tags">
            {{ tag }}
          </el-tag>
        </el-descriptions-item>
      </div>
      <div v-if="editMode">
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片标题:</p>
          </template>
          <el-input v-model="imageForm.title"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">pid:</p>
          </template>
          <el-input v-model="imageForm.pid"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片作者:</p>
          </template>
          <el-input  v-model="imageForm.author"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">作者id:</p>
          </template>
          <el-input  v-model="imageForm.authorId"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <p style="white-space:nowrap">图片标签:</p>
          </template>
          <div style="height: 100px;overflow-y: scroll">
            <DynamicTags v-model="imageForm.tags"></DynamicTags>
          </div>
        </el-descriptions-item>
      </div>
    </el-descriptions>
  </el-row>
</template>

<script lang="ts" setup>
import {updateImageInfo,fetchImageDetail,deleteImage} from "../../api/image"
import {likeAuthors} from "../../api/author"
import {likeImage} from "../../api/system"
import {ElMessage, ElMessageBox} from 'element-plus'
import {StarFilled,Star, Edit, Check, Delete} from "@element-plus/icons-vue";
import {defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch} from "vue";
import {useRouter} from "vue-router";
import DynamicTags from "./DynamicTags.vue";


const props = defineProps({
  id:{
    type:String,
    required:true
  }
});

const emit = defineEmits(["isDelete","update"]);
const storageTypeMap = {
  "LOCAL": "本地存储",
  "TENXUN": "腾讯云"
}
const inputVisible = ref(false)
const inputValue = ref('')
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
})
onMounted(()=>{
  refreshImageInfo(props.id)
})
</script>

<style scoped>

</style>