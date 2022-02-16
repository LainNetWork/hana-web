<template>
  <el-tooltip content="刷新" placement="right" effect="light">
    <el-button type="text" circle @click="queryTaskList">
      <el-icon size="30">
        <Refresh />
      </el-icon>
    </el-button>
  </el-tooltip>
  <el-table :data="task.content">
    <el-table-column label="任务名" prop="task_name"/>
    <el-table-column label="图片数" prop="count"/>
    <el-table-column label="下载进度" prop="remain_count">
      <template #default="scope">
        <el-progress :text-inside="true" :stroke-width="15" :percentage="(scope.row.count - scope.row.remain_count)*100/scope.row.count" />
      </template>
    </el-table-column>
    <el-table-column label="处理进度" prop="not_handled_count">
      <template #default="scope">
        <el-progress width="50" :stroke-width="5" :percentage="Math.round((scope.row.total_pic - scope.row.not_handled_pic)*100/scope.row.total_pic)" type="circle"></el-progress>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="create_at"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="text" @click="jumpToGallery(scope.row.id)">跳转详情</el-button>
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
import {Refresh} from "@element-plus/icons-vue";
export default {
  name: "UpdateTask",
  components:{Refresh},
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
