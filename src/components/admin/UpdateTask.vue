<template>
  <el-tooltip content="刷新" placement="right" effect="light">
    <el-button type="text" circle @click="queryTaskList">
      <el-icon size="30">
        <Refresh />
      </el-icon>
    </el-button>
  </el-tooltip>
  <el-table :data="task.content">
    <el-table-column label="任务名" prop="taskName"/>
    <el-table-column label="图片数" prop="count"/>
    <el-table-column label="下载进度" prop="remainCount">
      <template #default="scope">
        <el-progress :text-inside="true" :stroke-width="15" :percentage="(scope.row.count - scope.row.remainCount)*100/scope.row.count" />
      </template>
    </el-table-column>
    <el-table-column label="处理进度" prop="notHandledPic">
      <template #default="scope">
        <el-progress width="50" :stroke-width="5" :percentage="Math.round((scope.row.totalPic - scope.row.notHandledPic)*100/scope.row.totalPic)" type="circle"></el-progress>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createAt"/>
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

<script lang="ts">
import {fetchTaskList, TaskInfo} from "../../api/task"
import {Refresh} from "@element-plus/icons-vue";
import {defineComponent, onMounted, reactive, toRefs} from "vue";
import {useRouter} from "vue-router"
import {PageableMO} from "../../types/common";

export default defineComponent({
  name: "UpdateTask",
  components:{Refresh},
  setup(){
    const state = reactive({
      taskForm:{
        pageSize:12,
        pageNum:1
      },
      task:{} as PageableMO<TaskInfo>
    })
    const router = useRouter();
    const jumpToGallery = (id:string)=>{
      let routeUrl = router.resolve({
        path: "/task/" + id
      });
      window.open(routeUrl .href, '_blank');
    }
    const changePage = (val:number)=>{
      state.taskForm.pageNum = val
      queryTaskList()
    }
    const queryTaskList = async ()=>{
      state.task = await fetchTaskList(state.taskForm)
    }
    onMounted(()=>{
      queryTaskList()
    })
    return{
      ...toRefs(state),
      jumpToGallery,
      changePage,
      queryTaskList,
    }
  },
})
</script>

<style scoped>

</style>
