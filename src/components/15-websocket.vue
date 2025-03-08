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
      <el-button type="primary" @click="send">发送消息给服务端</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const ws = ref(null)
const lockReconnect = ref(false)
const reconnectTimer = ref(null)
const startHeartTimer = ref(null)
const serverTimeoutObj = ref(null)
const inputVal = ref('')
const messageList = ref([])

// 连接服务端websocket
const connect = () => {
  ws.value = new WebSocket('ws:127.0.0.1:9080')

  // 监听连接开启
  ws.value.onopen = () => {
    // 开启心跳
    startHeart()
  }

  ws.value.onmessage = (e) => {
    // 收到服务器信息，心跳重置，上报
    console.log('接收到服务端发送的消息', e.data)
    messageList.value.push(e.data)
    startHeart()
  }

  // 监听连接错误
  ws.value.onerror = () => {
    // 重连
    console.log('连接错误')
    reconnect()
  }

  // 监听连接关闭
  ws.value.onclose = () => {
    // 重连
    console.log('连接关闭')
    reconnect()
  }
}
connect()

// 重新连接 3000-5000毫秒之间，设置延迟避免请求过多
const reconnect = () => {
  // 设置lockReconnect变量防止重复连接
  if (lockReconnect.value) return
  lockReconnect.value = true
  reconnectTimer.value && clearTimeout(reconnectTimer.value)

  reconnectTimer.value = setTimeout(() => {
    connect()
    lockReconnect.value = false
  }, parseInt(Math.random() * 2000 + 3000))
}

// 重置心跳
const resetHeader = () => {
  clearTimeout(serverTimeoutObj.value)
  clearTimeout(startHeartTimer.value)
}

// 开启心跳
const startHeart = () => {
  resetHeader()
  startHeartTimer.value = setTimeout(() => {
    // 向服务端发送----心跳信息，检测服务器是否在线
    ws.value.send(JSON.stringify({ cmd: 1100 }))
    // 60秒后，如果没有收到服务器信息，则认为连接断开
    serverTimeoutObj.value = setTimeout(() => {
      // 重连
      ws.value.close()
    }, 60000)
  }, 60000)
}

const send = () => {
  if (!inputVal.value) return
  ws.value.send(JSON.stringify(inputVal.value))
  inputVal.value = ''
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
