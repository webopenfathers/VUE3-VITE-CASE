<template>
  <el-button @click="download" type="primary" :loading="loading"
    >下载</el-button
  >
  <h2>加一操作：{{ num }}</h2>
  <el-button @click="num++" type="primary">加1</el-button>
</template>
<script setup>
import XLSX from 'xlsx-js-style'
import { ref } from 'vue'
import { exportExcel } from './export.js'
const num = ref(0)
const loading = ref(false)
const tableData = new Array(1000000).fill({
  name: '张三',
  date: '2025-04-30',
  age: 18,
  sex: '男',
  address: '北京',
})

// 处理数据
console.time('处理数据')
const body = tableData.map((x, index) => [x.date, x.name, x.address, x.zip])
console.timeEnd('处理数据')
const header = [['日期', '姓名', '地址', '邮编']]

// 下载方法
const download = () => {
  loading.value = true
  exportExcel('导出.xlsx', body, header, () => {
    loading.value = false
  })
}
</script>
