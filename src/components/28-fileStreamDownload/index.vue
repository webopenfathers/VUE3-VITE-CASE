<template>
  <el-button type="primary" @click="exportExcel">文件流下载</el-button>
  <h1>counter:{{ count }}</h1>
  <el-button @click="count++">count++</el-button>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
const count = ref(0)
const exportExcel = async () => {
  try {
    const response = await axios.get('/api/export/excel', {
      responseType: 'blob', // 接收二进制流数据
    })

    console.log('导出成功:', response)

    // 获取 Content-Disposition 头
    const contentDisposition = response.headers['content-disposition']
    let filename = 'default.xlsx' // 默认文件名
    if (contentDisposition) {
      // 正则表达式匹配 filename 和 filename*
      const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const utf8FilenameRegex = /filename\*=(UTF-8|utf-8)'[^']*'([^']*)/

      // 尝试匹配 filename*
      const utf8Matches = contentDisposition.match(utf8FilenameRegex)
      if (utf8Matches && utf8Matches[2]) {
        filename = decodeURIComponent(utf8Matches[2].trim())
      } else {
        // 如果没有 filename*，尝试匹配 filename
        const matches = contentDisposition.match(regex)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '').trim()
        }
      }
    }

    // 创建 Blob 对象
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // 创建一个指向该 Blob 的 URL
    const downloadUrl = window.URL.createObjectURL(blob)

    // 创建 a 标签用于下载
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', filename) // 设置下载文件名
    document.body.appendChild(link)
    link.click()

    // 清理对象 URL 和 DOM 元素
    window.URL.revokeObjectURL(downloadUrl)
    document.body.removeChild(link)
  } catch (error) {
    console.error('导出失败:', error)
    alert('导出失败，请稍后再试')
  }
}
</script>
