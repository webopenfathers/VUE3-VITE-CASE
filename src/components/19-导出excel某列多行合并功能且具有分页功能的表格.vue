<template>
  <div>
    <el-button type="primary" @click="exportExcel">导出</el-button>
    <el-table
      id="table-data"
      :data="tableData"
      style="width: 100%"
      border
      :span-method="spanMethod"
    >
      <el-table-column align="center" label="月份" prop="yf" />
      <el-table-column align="center" label="状态" prop="zt" />
      <el-table-column align="center" label="业务代办" prop="rzywdb" />
      <el-table-column align="center" label="异常资源检查" prop="yczyjc" />
    </el-table>
  </div>
</template>

<script setup>
import XLSX from 'xlsx-js-style'
import { reactive } from 'vue'

// 此方法需要后端配合，将要合并的数据集中在一起返回
const tableData = reactive([
  {
    yf: '2025-04',
    zt: '执行',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-04',
    zt: '就绪',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-04',
    zt: '完成',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-04',
    zt: '取消',
    rzywdb: 0,
    yczyjc: 0,
  },
  // ----------------
  {
    yf: '2025-05',
    zt: '执行',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-05',
    zt: '就绪',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-05',
    zt: '完成',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-05',
    zt: '取消',
    rzywdb: 0,
    yczyjc: 0,
  },
  // ----------------
  {
    yf: '2025-06',
    zt: '执行',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-06',
    zt: '就绪',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-06',
    zt: '完成',
    rzywdb: 0,
    yczyjc: 0,
  },
  {
    yf: '2025-06',
    zt: '取消',
    rzywdb: 0,
    yczyjc: 0,
  },
])

// *****多行合并通用方法 https://blog.csdn.net/m0_70027114/article/details/132434616
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  // 需要合并的列
  const fields = ['yf']
  // 当前行的数据
  const cellValue = row[column.property]
  // 判断只合并定义字段的列数据
  if (cellValue && fields.includes(column.property)) {
    const prevRow = tableData[rowIndex - 1] //上一行数据
    let nextRow = tableData[rowIndex + 1] //下一行数据
    // 当上一行的数据等于当前行数据时，当前行单元格隐藏
    if (prevRow && prevRow[column.property] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      // 反之，则循环判断若下一行数据等于当前行数据，则当前行开始进行合并单元格
      let countRowspan = 1 //用于合并计数多少单元格
      while (nextRow && nextRow[column.property] === cellValue) {
        nextRow = tableData[++countRowspan + rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}

const exportExcel = () => {
  const newData = []
  let merges = []

  // 合并单元格的函数
  function addMerges(startRow, endRow, col) {
    if (startRow < endRow) {
      merges.push({
        s: { r: startRow, c: col },
        e: { r: endRow, c: col },
      })
    }
  }
  // 动态合并相同内容的单元格的函数
  function mergeDynamicCells(colIndex) {
    let startRow = 0
    for (let i = 0; i < tableData.length - 1; i++) {
      if (tableData[startRow].yf !== tableData[i + 1].yf) {
        addMerges(startRow + 1, i + 1, colIndex)
        startRow = i + 1 // 更新起始行
      }
    }
    addMerges(startRow + 1, tableData.length, colIndex)
  }

  mergeDynamicCells(0) // 合并第一列
  // 处理全部数据
  tableData.forEach((item) => {
    const newItem = {
      月份: item.yf,
      状态: item.zt,
      腾讯业务待办: item.rzywdb,
      异常资源检查: item.yczyjc,
    }
    newData.push(newItem)
  })
  const wb = XLSX.utils.book_new()
  const sheet = XLSX.utils.json_to_sheet(newData)

  // 设置月份列为文本格式
  Object.keys(sheet).forEach((key) => {
    if (key.startsWith('A') && key !== 'A1') {
      // 假设月份列是第 A 列
      sheet[key].z = '@' // 设置单元格格式为文本
    }
  })

  sheet['!merges'] = merges
  // 7.设置列宽
  const cols = [{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }]
  sheet['!cols'] = cols

  // 设置行高
  const rows = tableData.map((item) => ({ hpx: 30 }))
  sheet['!rows'] = rows // 行高添加到sheet中

  // 8.设置单元格样式
  const data = setExlStyle(sheet)
  XLSX.utils.book_append_sheet(wb, data, '分页合并多行全部导出')
  XLSX.writeFile(wb, '导出合并EXCEL多行合并功能.xlsx')
}

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

  // 填充
  const fill = {
    fgColor: {
      rgb: '6fa8dc',
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
        data[cell].s = { border, font, alignment }
      }
    }
  }
  return data
}
</script>
