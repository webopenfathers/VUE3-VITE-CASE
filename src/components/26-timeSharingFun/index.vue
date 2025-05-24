<template>
  <div style="height: 80vh; overflow: auto; border: 1px solid red">
    <el-button :disabled="disabled" type="primary" @click="insetEl"
      >插入500000个元素</el-button
    >
    <div v-for="(item, index) in list" :key="index">{{ item }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const list = ref([])
const disabled = ref(false)

const tasks = Array.from({ length: 500000 }, (_, i) => () => {
  return `Task ${i}`
})

const insetEl = () => {
  // 直接插入500000个元素会导致页面卡顿
  // list.value = tasks

  // 分时函数---此方法不会卡顿
  performTasks(tasks)
}

// 空闲时间来分批执行任务
const performTasks = (tasks) => {
  if (tasks.length === 0) return
  let index = 0
  disabled.value = true
  function _run() {
    // 利用 requestIdleCallback
    requestIdleCallback((idle) => {
      while (index < tasks.length && idle.timeRemaining() > 0) {
        list.value.push(tasks[index++]())
      }

      if (index < tasks.length) {
        _run()
      } else {
        disabled.value = false
      }
    })
  }

  _run()
}
</script>
