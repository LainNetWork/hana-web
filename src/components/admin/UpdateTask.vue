<template>
  <el-table :data="task.content">
    <el-table-column label="任务名" prop="task_name"/>
    <el-table-column label="图片数" prop="count"/>
    <el-table-column label="剩余图片数" prop="remain_count"/>
    <el-table-column label="创建时间" prop="create_at"/>
    <el-table-column label="详情">
      <template #default="scope">
        <el-button @click="jumpToGallery(scope.row.id)">跳转详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      style="float: right"
      background
      :current-page="taskForm.pageNum"
      @current-change="changePage"
      layout="total, prev, pager, next, jumper"
      :page-size="taskForm.pageSize"
      :total="task.total">
  </el-pagination>
</template>

<script>
import {fetchTaskList} from "../../api/task"
export default {
  name: "UpdateTask",
  data(){
    return{
      taskForm:{
        pageSize:12,
        pageNum:1
      },
      task:{
        content:[],
        total:0
      }
    }
  },
  created() {
    this.queryTaskList()
  },
  methods:{
    jumpToGallery(id){
      let routeUrl = this.$router.resolve({
        path: "/task/" + id
      });
      window.open(routeUrl .href, '_blank');
    },
    changePage(val){
      this.taskForm.pageNum = val
      this.queryTaskList()
    },
    async queryTaskList(){
      const { data } = await fetchTaskList(this.taskForm);
      this.task = data
    }
  }
}
</script>

<style scoped>

</style>