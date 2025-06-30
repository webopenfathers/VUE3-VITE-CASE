<template>
  <div>
    <el-input v-model="inputValue"></el-input>
    <el-button @click="handleSerach">搜索</el-button>
  </div>
  <h4>搜索历史</h4>
  <p v-for="(item, index) in storageValue" :key="index">{{ item }}</p>
</template>
<script setup>
import { HISTORY_SEARCH_KEY } from './constants'
import { ref } from 'vue'
const inputValue = ref('')

// 使用自定义hook读取本地存储
import useReadLocalStorage from './useReadLocalStorage'
const { storageValue } = useReadLocalStorage(HISTORY_SEARCH_KEY)

// 搜索并存储并触发自定义事件
const handleSerach = () => {
  if (!inputValue.value) return

  const arr = JSON.parse(localStorage.getItem(HISTORY_SEARCH_KEY)) || []

  // 先删除后添加
  deleteArrItem(arr, inputValue.value)

  arr.unshift(inputValue.value)
  localStorage.setItem(HISTORY_SEARCH_KEY, JSON.stringify(arr))

  // 触发自定义事件，通知其他组件更新
  // 这里使用了 CustomEvent 来创建一个自定义事件
  window.dispatchEvent(
    new CustomEvent('local-storage', { detail: { key: HISTORY_SEARCH_KEY } })
  )
  inputValue.value = ''
}

// 删除数组中的某个值
const deleteArrItem = (arr, value) => {
  const index = arr.findIndex((item) => item === value)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}
</script>
