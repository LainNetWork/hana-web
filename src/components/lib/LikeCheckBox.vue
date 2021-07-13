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
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "LikeCheckBox",
  props:{
    selected:{
      type:Array,
      required: true
    }
  },
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