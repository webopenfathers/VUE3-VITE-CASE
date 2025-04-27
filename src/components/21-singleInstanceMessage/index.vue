<template>
  <h2>单例模式-封装消息提示</h2>
</template>
<script setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Message } from './Message'
const sendRequest = () => {
  axios
    .get('api/word/post/getAll')
    .then((response) => {
      console.log(response, 'response')

      if (response.data.code === 201) {
        // ElMessage({
        //   message: response.data.message,
        //   type: 'success',
        //   duration: 3000,
        //   showClose: true,
        // })

        // 单例模式-封装消息提示只弹出一个
        Message.success(response.data.message)
      }
    })
    .catch((error) => {
      if (error.status === 500) {
        ElMessage({
          message: error.message,
          type: 'error',
          duration: 500,
          showClose: true,
        })
      }
    })
}

sendRequest()
sendRequest()
sendRequest()
sendRequest()
</script>
