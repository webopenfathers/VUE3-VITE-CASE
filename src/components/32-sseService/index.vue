<template>
  <div id="sse">
    <h1>SSE 流式文本</h1>
    <p>{{ displayedText }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const displayedText = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/api/sse', {
      headers: {
        // 示例：添加请求头
        Authorization: 'Bearer your_token_here',
        'X-User-ID': '123456',
      },
    })

    if (!response.ok || !response.body) {
      throw new Error('网络响应错误或不支持流式传输')
    }

    // 读取的是流式数据（ReadableStream），其每次读取的数据是 Uint8Array 类型。
    const reader = response.body.getReader()
    // 创建一个 TextDecoder 来将 Uint8Array 转换为 UTF-8 编码的字符串
    const decoder = new TextDecoder()

    while (true) {
      // 读取数据 value 是 Uint8Array 类型
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })

      const lines = chunk
        .split('\n')
        .filter((line) => line.startsWith('data: '))
      for (const line of lines) {
        const char = line.replace('data: ', '')
        displayedText.value += JSON.parse(char)
      }
    }
  } catch (error) {
    console.error('获取 SSE 数据失败:', error)
  }
})
</script>

<style scoped>
#sse {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>
