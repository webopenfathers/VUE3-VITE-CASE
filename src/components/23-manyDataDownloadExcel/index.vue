<template>
  <el-button @click="download" type="primary" :loading="loading"
    >下载</el-button
  >
  <h2>加一操作：{{ num }}</h2>
  <el-button @click="num++" type="primary">加1</el-button>
</template>
<script setup>
import { ref } from 'vue'
import { exportExcel } from './export.js'
const num = ref(0)
const loading = ref(false)
const tableData = new Array(390000).fill({
  name: '张三',
  date: '2025-04-30',
  age: 18,
  sex: '男',
  address: '北京',
  year: '2030',
  month: '08',
  day: '30',
  hour: '12',
  minute: '30',
  second: '00',
  zip: '100000',
})

// 处理数据
console.time('处理数据')
const body = tableData.map((x, index) => [
  x.date,
  x.name,
  x.address,
  x.zip,
  x.age,
  x.sex,
  x.year,
  x.month,
  x.day,
  x.hour,
  x.minute,
  x.second,
])
console.timeEnd('处理数据')
const header = [
  [
    '日期',
    '姓名',
    '地址',
    '邮编',
    '年龄',
    '性别',
    '年份',
    '月份',
    '日期',
    '小时',
    '分钟',
    '秒',
  ],
]

// 下载方法
const download = () => {
  loading.value = true
  exportExcel('导出.xlsx', body, header, () => {
    loading.value = false
  })
}
</script>
