<template>
  <el-button type="primary" @click="showDialog">打开弹框</el-button>
</template>
<script setup>
import myForm from './myForm.vue'
import { inject } from 'vue'
const commandPopup = inject('commandPopup')
function showDialog() {
  commandPopup.open({
    component: myForm,
    props: {
      info: '传递给动态组件的数据',
    },
    title: '弹框标题',
    width: '80%',
    height: '50%',
  })
}
</script>
