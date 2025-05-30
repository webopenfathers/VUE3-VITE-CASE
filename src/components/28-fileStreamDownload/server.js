import express from 'express'
import XLSX from 'xlsx-js-style'

const app = express()

app.get('/export/excel', (req, res) => {
  try {
    const data = []
    for (let i = 1; i <= 500000; i++) {
      data.push({
        name: '张三',
        date: '2025-04-30',
        age: 18,
        sex: '男',
        address: '北京',
        year: '2030',
        month: '08',
        day: '30',
        hour: '12',
        minute: '30',
        second: '00',
        zip: '100000',
      })
    }

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '用户列表')

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=users.xlsx',
      'Content-Length': Buffer.byteLength(excelBuffer),
    })

    res.send(excelBuffer)
  } catch (error) {
    console.error('导出失败:', error)
    res.status(500).json({ error: '导出失败' })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
