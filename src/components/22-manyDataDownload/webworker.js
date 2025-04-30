import XLSX from 'xlsx-js-style'
onmessage = (e) => {
  const { body, header } = e.data
  // header添加到头部
  body.unshift(...header)
  // 将json数据转换成excel文件
  const worksheet = XLSX.utils.aoa_to_sheet(body)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  postMessage({ workbook })
}
