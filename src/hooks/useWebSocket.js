import { ref } from 'vue'
/**
 * websocket封装
 * @description 通过WebSocket连接服务端，实现聊天功能
 * @param {*} url WebSocket连接地址
 * @returns {Object} 返回inputVal、messageList、sendMessage
 */
export const useWebSocket = (url) => {
  const ws = ref(null)
  const lockReconnect = ref(false)
  const reconnectTimer = ref(null)
  const startHeartTimer = ref(null)
  const serverTimeoutObj = ref(null)
  const inputVal = ref('')
  const messageList = ref([])

  // 连接服务端websocket
  const connect = () => {
    ws.value = new WebSocket(url)

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

  // 发送聊天按钮
  const sendMessage = () => {
    if (!inputVal.value) return
    ws.value.send(JSON.stringify(inputVal.value))
    inputVal.value = ''
  }

  // 离线，断开连接
  const close = () => {
    ws.value.close()
  }

  return {
    inputVal,
    messageList,
    sendMessage,
    close,
  }
}
