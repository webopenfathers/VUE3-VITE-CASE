import XLSX from 'xlsx-js-style'
onmessage = (e) => {
  const { body, header } = e.data
  // header添加到头部
  body.unshift(...header)
  try {
    const ws = XLSX.utils.aoa_to_sheet(body)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // 使用 buffer 避免 array 长度问题
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
    console.log(wbout, 'wbout')

    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    console.log(blob, 'blob')
    postMessage({ blob }, [wbout.buffer]) // 可选：加速传输
  } catch (error) {
    postMessage({ error: error.message })
  }
}
