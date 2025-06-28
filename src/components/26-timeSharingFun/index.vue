<template>
  <div style="height: 80vh; overflow: auto; border: 1px solid red">
    <el-button :loading="done" :disabled="done" type="primary" @click="insetEl"
      >插入500000个元素</el-button
    >
    <div v-for="(item, index) in list" :key="index">
      <p>序号：{{ item.id }}-----名称：{{ item.name }}</p>
    </div>
  </div>
</template>
<script setup>
import usePerformTasks from './performTasks'

const tasks = Array.from({ length: 500000 }, (_, i) => ({
  id: i + 1,
  name: `任务${i + 1}`,
}))

const { list, start, done } = usePerformTasks(tasks)
const insetEl = () => {
  // 直接插入500000个元素会导致页面卡顿
  // list.value = tasks

  // 分时函数---此方法不会卡顿
  start()
}
</script>
