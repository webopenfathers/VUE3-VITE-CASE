<template>
  <div>
    <h2>竞态条件演示</h2>
    <div>当前用户ID: {{ userId }}</div>
    <button @click="changeUser">切换用户</button>
    <div v-if="loading">加载中...</div>
    <div v-else>用户数据: {{ userData }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userId = ref(1)
const userData = ref(null)
const loading = ref(false)

// 模拟API请求
const fetchUserData = async (id) => {
  // 模拟不同请求的响应时间
  const delay = Math.random() * 2000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, timestamp: Date.now() })
    }, delay)
  })
}

// 有竞态问题的版本
// const fetchUserWithRace = async () => {
//   loading.value = true
//   const data = await fetchUserData(userId.value)
//   userData.value = data
//   loading.value = false
// }

// 解决竞态的版本
let currentRequest = 0
const fetchUserWithoutRace = async () => {
  loading.value = true
  const requestId = ++currentRequest

  const data = await fetchUserData(userId.value)

  // 只有最新的请求才能更新数据
  if (requestId === currentRequest) {
    userData.value = data
    loading.value = false
  }
}

const changeUser = () => {
  userId.value = userId.value === 1 ? 2 : 1
  // fetchUserWithRace() // 使用这个方法会出现竞态问题
  fetchUserWithoutRace() // 使用这个方法可以避免竞态问题
}

// 初始加载
fetchUserWithoutRace()
</script>
