<template>
  <div style="display: flex; justify-content: center">
    <div>
      <el-button type="primary" @click="exportExcel(123)">导出</el-button>
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="date" label="日期" width="150" align="center">
        </el-table-column>
        <el-table-column label="配送信息" align="center">
          <el-table-column prop="name" label="姓名" align="center" width="120">
          </el-table-column>
          <el-table-column label="地址" align="center">
            <el-table-column
              prop="province"
              label="省份"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120" align="center">
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import XLSX from 'xlsx-js-style'
import { reactive, ref } from 'vue'
console.log(XLSX)
const tableData = reactive([
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-06',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
  {
    date: '2016-05-07',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  },
])

const tableRef = ref(null)

// 一、导出
const exportExcel = () => {
  // 1.处理数据
  const body = tableData.map((x, index) => [
    index + 1,
    x.date,
    x.name,
    x.province,
    x.city,
    x.address,
    x.zip,
  ])

  // 2.定义header表头
  const header = [
    ['序号', '日期', '配送信息', '', '', '', ''],
    ['', '', '姓名', '地址', '', '', ''],
    ['', '', '', '省份', '市区', '地址', '邮编'],
  ]

  // 3.header添加到头部
  body.unshift(...header)

  // 4.aoa_to_sheet 将二维数组转换为sheet
  const sheet = XLSX.utils.aoa_to_sheet(body)

  // 5.合并单元格函数
  const merges = [
    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // 序号
    { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // 日期
    { s: { r: 0, c: 2 }, e: { r: 0, c: 6 } }, // 配送信息

    { s: { r: 1, c: 2 }, e: { r: 2, c: 2 } }, // 姓名
    { s: { r: 1, c: 3 }, e: { r: 1, c: 6 } }, // 地址
  ]

  // 6.将合并信息添加到sheet中
  sheet['!merges'] = merges

  // 7.设置列宽
  const cols = [
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ]

  sheet['!cols'] = cols

  // 8.设置单元格样式
  const data = setExlStyle(sheet)

  // 9.导出
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, data, 'Sheet1')
  XLSX.writeFile(wb, '导出合并EXCEL多级表头功能.xlsx')
}

// 二、设置单元格样式
// data 可以传入一个workbook或者worksheet
const setExlStyle = (data) => {
  // 定义好边框样式
  const border = {
    top: {
      style: 'thin',
    },
    bottom: {
      style: 'thin',
    },
    left: {
      style: 'thin',
    },
    right: {
      style: 'thin',
    },
  }
  // 字体
  const font = {
    sz: 12, // 字体大小
    color: { rgb: '000000' }, // 字体颜色
    name: '微软雅黑', // 字体名称
    bold: true, // 是否加粗
  }

  // 居中
  const alignment = {
    horizontal: 'center', // 水平居中
    vertical: 'center', // 垂直居中
    wrapText: true, // 自动换行
  }

  // 获取表格的有效范围
  const range = XLSX.utils.decode_range(data['!ref'])
  // cellList：xlsx自动创建的excel单元格，去掉带！开头的就是所有单元格
  const cellList = Object.keys(data).filter((item) => item.indexOf('!') < 0)

  // 遍历表格
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      // 通过行列转成excle的单元格索引
      const cell = XLSX.utils.encode_cell({ r: row, c: col })
      // 查找一下单元格是否已经存在，不存在：创建一个单元格并设置边框，存在：直接修改样式
      if (cellList.indexOf(cell) < 0) {
        data[cell] = { t: '', v: '', s: { border, font, alignment } }
      } else {
        data[cell].s = { border, font, alignment }
      }
    }
  }
  return data
}
</script>
