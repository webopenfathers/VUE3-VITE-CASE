<template>
  <el-date-picker
    v-model="internalValue"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD HH:mm:ss"
    format="YYYY-MM-DD HH:mm:ss"
    @clear="handleClear"
  />
</template>
<script setup>
import { computed } from 'vue'

// 利用defineModel双向绑定
const startTime = defineModel('startTime')
const endTime = defineModel('endTime')

const internalValue = computed({
  get() {
    return [startTime.value, endTime.value]
  },
  set(value) {
    if (Array.isArray(value)) {
      startTime.value = value[0]
      endTime.value = value[1]
    } else {
      // 清空时候会传入null
      startTime.value = ''
      endTime.value = ''
    }
  },
})

const handleClear = () => {
  startTime.value = ''
  endTime.value = ''
}
</script>
