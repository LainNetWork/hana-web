<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="采集画师所有P站作品" name="first">
        <fetch-all></fetch-all>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FetchAll from "./FetchAll";
export default {
  name: "FetchImage",
  components: {FetchAll},
  data(){
    return {
      activeName:'first'
    }
  }
}
</script>

<style scoped>

</style>