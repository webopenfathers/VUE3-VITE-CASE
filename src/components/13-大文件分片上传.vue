<template>
  <div>
    <input ref="fileRef" @change="changeFile" type="file" />
  </div>
</template>
<script setup type="module">
import { cutFile } from './script/13-cutFile'
// 1.选中文件之后的回调
const changeFile = async (e) => {
  const file = e.target.files[0]
  console.log(file, 'file')

  console.time('cutFile')
  const chunks = await cutFile(file) // 拿到所有分片结果---给后端
  console.timeEnd('cutFile')
  console.log(chunks, 'chunks')
}
</script>
<style scoped></style>
