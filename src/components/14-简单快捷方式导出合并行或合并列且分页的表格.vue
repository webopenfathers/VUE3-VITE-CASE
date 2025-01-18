<template>
  <div>
    <el-button type="primary" @click="exportExcel">导出</el-button>
    <el-table
      id="table-data"
      :data="pagedData"
      style="width: 100%"
      border
      :span-method="spanMethod"
    >
      <el-table-column align="center" label="月度" prop="yd" />
      <el-table-column align="center" label="类别" prop="lb" />
      <el-table-column align="center" label="T级" prop="tj" />
      <el-table-column align="center" label="有需求" prop="yxq" />
      <el-table-column align="center" label="无需求" prop="wxq" />
      <el-table-column align="center" label="有资源" prop="yzy" />
      <el-table-column align="center" label="未完成搭建" prop="wwcdj" />
      <el-table-column align="center" label="未完成演练" prop="wwcyl" />
    </el-table>
    <el-pagination
      style="justify-content: center; font-size: 16px"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, prev, pager, next, jumper, sizes"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import XLSX from 'xlsx-js-style'
import { reactive, ref, computed, nextTick } from 'vue'
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = reactive([
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T1/T2',
    yxq: '0/0',
    wxq: '0/0',
    yzy: '16/10',
    wwcdj: '3/9',
    wwcyl: '6/9',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: 'T3/T4',
    yxq: '20/11',
    wxq: '18/3',
    yzy: '12/10',
    wwcdj: '33/19',
    wwcyl: '62/92',
  },
  {
    yd: '1月',
    lb: '新增',
    tj: '总计',
    yxq: '20',
    wxq: '33',
    yzy: '44',
    wwcdj: '21',
    wwcyl: '42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T1/T2',
    yxq: '--',
    wxq: '21/90',
    yzy: '24/18',
    wwcdj: '32/44',
    wwcyl: '22/42',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: 'T3/T4',
    yxq: '--',
    wxq: '21/45',
    yzy: '22/15',
    wwcdj: '22/31',
    wwcyl: '22/41',
  },
  {
    yd: '2月',
    lb: '存量',
    tj: '总计',
    yxq: '--',
    wxq: '44',
    yzy: '44',
    wwcdj: '67',
    wwcyl: '22',
  },
])

// 计算当前页的数据
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.slice(start, end)
})

const handleSizeChange = (val) => {
  pageSize.value = val
}
const handleCurrentChange = (val) => {
  currentPage.value = val
}

// *****多行合并通用方法 https://blog.csdn.net/m0_70027114/article/details/132434616
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  // 要进行合并，首先需要把要合并的字段行排列在一起
  // tableData = tableData.sort((a, b) => a.date.localeCompare(b.date))
  //定义需要合并的列字段，有哪些列需要合并，就自定义添加字段即可
  const fields = ['yd', 'lb', 'yxq']
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

// 通过给table绑定id导出excel方法(更适合表格不分页的场景)
// 此方法弊端:
// 如果是分页数据导出全部数据时,需要所有数据都在第一页渲染完成后,再下载才是导出全部数据
const exportExcel = () => {
  // 1.针对分页的表格导出全部
  // 需要将第一页的pageSize改为所有数据的长度
  pageSize.value = tableData.length
  nextTick(() => {
    const wb = XLSX.utils.book_new()
    const sheet = XLSX.utils.table_to_sheet(
      document.querySelector('#table-data'),
      {
        raw: true,
      }
    )

    // 7.设置列宽
    const cols = [
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
    ]

    sheet['!cols'] = cols

    // 设置行高
    const rows = tableData.map((item) => ({ hpx: 30 }))
    sheet['!rows'] = rows // 行高添加到sheet中

    // 8.设置单元格样式
    const data = setExlStyle(sheet)
    XLSX.utils.book_append_sheet(wb, data, '分页合并多行全部导出')
    XLSX.writeFile(wb, '导出合并EXCEL多行合并功能.xlsx')

    // 2.导出完成以后再还原为原来的分页
    pageSize.value = 10
  })
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
