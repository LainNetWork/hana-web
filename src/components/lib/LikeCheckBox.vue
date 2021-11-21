<template>
  <el-form label-position="top">
    <el-form-item>
      <el-scrollbar height="400px">
        <el-image v-for="item in selected" :src="item.url"></el-image>
      </el-scrollbar>
    </el-form-item>
    <el-form-item label="新增标签">
      <el-tag style="margin: 2px"
              :key="tag"
              v-for="tag in form.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="like">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { likeImages } from "../../api/system"
import {ElMessageBox} from "element-plus";
export default {
  name: "LikeCheckBox",
  props:{
    selected:{
      type:Array,
      required: true
    }
  },
  emits:["beClosed"],
  // watch:{
  //   selected(newVal){
  //     console.log(newVal)
  //     this.showDetailBox = true
  //   }
  // },
  data(){
    return {
      inputVisible:false,
      inputValue:'',
      form:{
        tags:[]
      }
    }
  },methods:{
    like(){
      ElMessageBox.confirm("确定将图片添加到收藏吗？").then(e=>{
        let ids = []
        this.selected.forEach(e=>{
          ids.push(e.id)
        })
        likeImages({ids:ids,tags:this.form.tags})
        this.form.tags = []
        this.$emit("beClosed")
      }).catch()

    },
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>

</style>