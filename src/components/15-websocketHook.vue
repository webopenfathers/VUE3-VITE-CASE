<template>
  <div class="container">
    <h1 style="text-align: center">WebSocket服务</h1>
    <h2>接收到服务端消息：</h2>
    <ul>
      <li style="font-size: 20px" v-for="(message, index) in messageList">
        {{ index + 1 }} - {{ message }}
      </li>
    </ul>
    <div style="display: flex; width: 50%">
      <el-input v-model="inputVal"></el-input>
      <el-button type="primary" @click="sendMessage"
        >发送消息给服务端</el-button
      >
      <el-button type="primary" plain @click="close">离线</el-button>
    </div>
  </div>
</template>
<script setup>
import { useWebSocket } from '../hooks/useWebSocket'
const wsurl = 'ws://localhost:9080'
const { messageList, sendMessage, inputVal, close } = useWebSocket(wsurl)
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
