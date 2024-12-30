<template>
  <div>
    <p style="width: 50%; margin: auto">
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </p>
    <table style="width: 50%; margin: auto" border="0" cellspacing="0">
      <thead>
        <tr>
          <th>月度</th>
          <th>类别</th>
          <th>T级</th>
          <th>有需求</th>
          <th>无需求</th>
          <th>有资源</th>
          <th>未完成搭建</th>
          <th>未完成演练</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in tableData"
          :key="index"
          :style="{ 'font-weight': index === 2 || index === 5 ? 'bold' : '' }"
        >
          <!-- 月度 -->
          <td v-if="index === 0" rowspan="6">
            {{ item.yd }}
          </td>
          <!-- 类别 -->
          <td v-if="index === 0 || index === 3" :rowspan="3">
            {{ item.lb }}
          </td>
          <!-- T级 -->
          <td>{{ item.tj }}</td>
          <!-- 有需求 -->
          <td v-if="index <= 3" :rowspan="index === 3 ? 3 : ''">
            {{ index < 3 ? item.y : '-----' }}
          </td>
          <!-- 无需求 -->
          <td>{{ item.w }}</td>
          <!-- 有资源 -->
          <td>{{ item.yzy }}</td>
          <!-- 未完成搭建 -->
          <td>{{ item.wdj }}</td>
          <!-- 未完成演练 -->
          <td>{{ item.wyl }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import XLSX from 'xlsx-js-style'
import { reactive, ref } from 'vue'
const tableData = reactive([
  {
    yd: '11月',
    lb: '新增',
    tj: 'T1/T2',
    w: '0/0',
    y: '0/0',
    yzy: '6/10',
    wdj: '3/9',
    wyl: '6/9',
  },
  {
    yd: '11月',
    lb: '新增',
    tj: 'T3/T4',
    w: '10/0',
    y: '40/0',
    yzy: '16/10',
    wdj: '13/9',
    wyl: '16/9',
  },
  {
    yd: '11月',
    lb: '新增',
    tj: '总计',
    w: '200',
    y: '20',
    yzy: '10',
    wdj: '99',
    wyl: '23',
  },
  // ---------------------
  {
    yd: '11月',
    lb: '存量',
    tj: 'T1/T2',
    w: '1/6',
    y: '2/7',
    yzy: '10/9',
    wdj: '99/9',
    wyl: '23/1',
  },
  {
    yd: '11月',
    lb: '存量',
    tj: 'T3/T4',
    w: '11/6',
    y: '24/7',
    yzy: '6/9',
    wdj: '9/9',
    wyl: '2/1',
  },
  {
    yd: '11月',
    lb: '存量',
    tj: '总计',
    w: '12/6',
    y: '22/7',
    yzy: '16/9',
    wdj: '90/9',
    wyl: '20/1',
  },
])

console.log(tableData, 'tableData')

// 导出
const exportExcel = () => {
  // 1.处理数据
  const body = tableData.map((x, index) => [
    x.yd,
    x.lb,
    x.tj,
    index >= 3 ? '----' : x.y,
    x.w,
    x.yzy,
    x.wdj,
    x.wyl,
  ])

  // 2.定义header表头
  const header = [
    [
      '月度',
      '类别',
      'T级',
      '有需求',
      '无需求',
      '有资源',
      '未完成搭建',
      '未完成演练',
    ],
  ]

  // 3.header添加到头部
  body.unshift(...header)

  // 4.aoa_to_sheet 将二维数组转换为sheet
  const sheet = XLSX.utils.aoa_to_sheet(body)

  // 5.合并单元格函数
  const merges = [
    { s: { r: 1, c: 0 }, e: { r: 6, c: 0 } },
    { s: { r: 1, c: 1 }, e: { r: 3, c: 1 } },
    { s: { r: 4, c: 1 }, e: { r: 6, c: 1 } },
    { s: { r: 4, c: 3 }, e: { r: 6, c: 3 } },
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
    { wch: 20 },
  ]

  sheet['!cols'] = cols

  // 设置行高
  const rows = [
    { hpx: 30 },
    { hpx: 30 },
    { hpx: 30 },
    { hpx: 40 },
    { hpx: 30 },
    { hpx: 30 },
    { hpx: 40 },
  ]
  sheet['!rows'] = rows // 行高添加到sheet中

  // 8.设置单元格样式
  const data = setExlStyle(sheet)

  // 9.导出
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, data, 'Sheet1')
  XLSX.writeFile(wb, '导出合并EXCEL多行合并功能.xlsx')
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
  }

  // 居中
  const alignment = {
    horizontal: 'center', // 水平居中
    vertical: 'center', // 垂直居中
    wrapText: true, // 自动换行
  }

  // 填充
  const fill = {
    fgColor: {
      rgb: '0078d4',
    },
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
        // 为指定单元格填充样式，则默认填充背景色
        if (
          [
            '月度',
            '类别',
            'T级',
            '有需求',
            '无需求',
            '有资源',
            '未完成搭建',
            '未完成演练',
          ].includes(data[cell].v)
        ) {
          data[cell].s = {
            alignment,
            border,
            alignment,
            fill,
            font: { ...font, bold: true, color: { rgb: 'ffffff' } },
          }
        } else {
          data[cell].s = { border, font, alignment }
        }
      }
    }
  }
  return data
}
</script>
<style scoped>
table {
  border-collapse: separate;
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
}
thead tr th {
  background-color: #0078d4;
  padding: 6px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
}
tbody tr td {
  padding: 6px;
  text-align: center;
  height: 34px;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
}
</style>
