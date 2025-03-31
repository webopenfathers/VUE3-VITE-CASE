<template>
  {{ formDate.startTime }} - {{ formDate.endTime }}
  <dateRangePicker
    v-model:start-time="formDate.startTime"
    v-model:end-time="formDate.endTime"
  />
  <el-input v-model="formDate.inputVal"></el-input>
  <el-button type="primary" @click="submit">提交</el-button>
  <el-button type="primary" @click="reset">重置</el-button>
</template>
<script setup>
import dateRangePicker from './dateRangePicker.vue'
import { reactive, ref } from 'vue'

const initFormDate = {
  startTime: '',
  endTime: '',
  inputVal: '',
}

const formDate = reactive({ ...initFormDate })
const submit = () => {
  console.log(formDate, 'formDate')
}
const reset = () => {
  // 快速重置reactive对象
  Object.assign(formDate, initFormDate)
}
</script>
