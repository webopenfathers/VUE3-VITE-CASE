<template>
  <div class="button-box" v-drag>
    <div class="btn-bg-img"></div>
    <div class="font-box">{{ text }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('案件详情-指令')
</script>

<style scoped>
.button-box {
  position: fixed;
  bottom: 80px;
  right: 50px;
  width: 80px;
  height: 125px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  z-index: 888;
}
.btn-bg-img {
  width: 80px;
  height: 80px;
  background-image: url('../assets/touxiang.png');
  background-size: cover;
}
.button-box:hover {
  color: white;
  opacity: 1;
}

.font-box {
  color: #3193ef;
  text-align: center;
  user-select: none;
}
</style>
