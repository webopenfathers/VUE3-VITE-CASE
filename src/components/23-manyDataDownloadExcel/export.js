import XLSX from 'xlsx-js-style'
export const exportExcel = (fileName, body, header, callback) => {
  // 开启一个线程任务
  const worker = new Worker(new URL('./webworker.js', import.meta.url), {
    type: 'module',
  })
  // 向worker线程发送消息
  worker.postMessage({ body, header })
  // 接收 Worker 返回的 Blob
  worker.onmessage = function (e) {
    const blob = e.data.blob
    console.log(blob, 'blob')

    const url = URL.createObjectURL(blob)

    // 创建 <a> 标签模拟下载
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    callback()
    // 结束 Worker
    worker.terminate()
  }
}
