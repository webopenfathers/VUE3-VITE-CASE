import XLSX from 'xlsx-js-style'
export const exportExcel = (fileName, body, header, callback) => {
  // 开启一个线程任务
  const worker = new Worker(new URL('./webworker.js', import.meta.url), {
    type: 'module',
  })
  // 向worker线程发送消息
  worker.postMessage({ body, header })
  // 接收worker线程的消息
  worker.onmessage = function (e) {
    const { workbook } = e.data
    // 导出Excel文件
    XLSX.writeFile(workbook, fileName)
    callback(false)
  }
}
