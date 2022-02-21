<template>
  <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    +
  </el-button>
</template>

<script lang="ts" setup>
import {ref, nextTick, PropType, watch, onMounted,} from 'vue'
import type { ElInput } from 'element-plus'
import config from "../admin/Config.vue";

const inputValue = ref('')
const dynamicTags = ref([] as string[])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const emits = defineEmits(['update:modelValue']);
const props = defineProps(
    {
      modelValue:{
        required:true,
        type:Array as PropType<string[]>
      }
    }
)
onMounted(()=>{
  dynamicTags.value = props.modelValue
})
watch(()=>props.modelValue,(newVal)=>{
  dynamicTags.value = newVal
})
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
  emits('update:modelValue',dynamicTags)
}
</script>