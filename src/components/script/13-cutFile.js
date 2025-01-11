// 2.分片函数
const CHUNK_SIZE = 1024 * 1024 * 5 // 定义每个分片大小 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 线程数量
export const cutFile = async (file) => {
  return new Promise(async (resolve, reject) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 计算分片数量
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT) // 每个线程能分到的分片数量
    const result = []
    let finishCount = 0
    // 循环创建分片
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 开启一个线程任务
      const worker = new Worker(new URL('./13-worker.js', import.meta.url), {
        type: 'module',
      })
      const start = i * threadChunkCount
      const end = Math.min(start + threadChunkCount, chunkCount)
      // 向worker线程发送消息
      worker.postMessage({ file, start, end, CHUNK_SIZE })
      // 接收worker线程的消息
      worker.onmessage = (e) => {
        worker.terminate() // 线程结束
        result[i] = e.data // 分片结果
        finishCount++
        // 所有线程结束后，执行回调
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat())
        }
      }
    }
  })
}
