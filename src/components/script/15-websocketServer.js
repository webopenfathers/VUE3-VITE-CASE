// const WebSocket = require('ws')
import WebSocket from 'ws'
const server = new WebSocket.Server({ port: 9080 })

server.on('open', function open() {
  console.log('服务开启')
})

server.on('close', function close() {
  console.log('服务关闭')
})

server.on('connection', function connection(ws, req) {
  console.log('连接客户端成功')
  // 连接客户端成功发送欢迎信息给客户端
  ws.send('Welcome 张博闻 Websocket服务连接成功' + new Date().toDateString())

  // 监听客户端发来的消息
  ws.on('message', function incoming(message) {
    console.log('接收到客户端发来消息：', message)

    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send('广播所有的客户端：' + '->' + message)
      }
    })
  })
})
