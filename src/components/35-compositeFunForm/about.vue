<template>
  <div>我是关于页面--我是组件</div>
</template>
<script setup>
const props = defineProps(['placeholder', 'clearable'])
console.log('props:', props)
</script>
