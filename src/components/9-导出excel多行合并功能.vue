<template>
  <div>
    <p style="width: 50%; margin: auto">
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </p>
    <table style="width: 50%; margin: auto" border="0" cellspacing="0">
      <thead>
        <tr>
          <th>计费类型</th>
          <th>保险类型</th>
          <th>名称1</th>
          <th>名称2</th>
          <th>名称3</th>
          <th>名称4</th>
        </tr>
      </thead>
      <tbody>
        <!-- --------------------------------------------------- -->
        <tr v-for="(item, index) in tableData" :key="index">
          <td v-if="index === 0 || index === 6" :rowspan="index === 0 ? 6 : 3">
            {{ item.jflx }}
          </td>
          <td>{{ item.bxlx }}</td>
          <td>{{ item.m1 }}</td>
          <td>{{ item.m2 }}</td>
          <td>{{ item.m3 }}</td>
          <td>{{ item.m4 }}</td>
        </tr>
        <!-- --------------------------------------------------- -->
        <!-- 等价于 -->
        <!-- <tr>
          <td rowspan="6">单位职工小计</td>
          <td>大额医保</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
        </tr>
        <tr>
          <td>退休人数</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
        <tr>
          <td>退休住附</td>
          <td>9</td>
          <td>4</td>
          <td>2</td>
          <td>1</td>
        </tr>
        <tr>
          <td>退休医保</td>
          <td>6</td>
          <td>2</td>
          <td>5</td>
          <td>9</td>
        </tr>
        <tr>
          <td>长护险</td>
          <td>1</td>
          <td>8</td>
          <td>3</td>
          <td>2</td>
        </tr>
        <tr>
          <td>住院保险</td>
          <td>9</td>
          <td>6</td>
          <td>1</td>
          <td>3</td>
        </tr>
        <tr>
          <td rowspan="3">个人缴费小计</td>
          <td>缴费基数</td>
          <td>11</td>
          <td>22</td>
          <td>55</td>
          <td>77</td>
        </tr>
        <tr>
          <td>养老</td>
          <td>44</td>
          <td>11</td>
          <td>66</td>
          <td>99</td>
        </tr>
        <tr>
          <td>失业</td>
          <td>22</td>
          <td>55</td>
          <td>55</td>
          <td>46</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script setup>
import XLSX from 'xlsx-js-style'
import { reactive, ref } from 'vue'
const tableData = reactive([
  {
    jflx: '单位职工小计',
    bxlx: '大额医保',
    m1: 7,
    m2: 8,
    m3: 9,
    m4: 10,
  },
  {
    jflx: '单位职工小计',
    bxlx: '退休人数',
    m1: 1,
    m2: 2,
    m3: 3,
    m4: 4,
  },
  {
    jflx: '单位职工小计',
    bxlx: '退休住附',
    m1: 9,
    m2: 4,
    m3: 2,
    m4: 1,
  },
  {
    jflx: '单位职工小计',
    bxlx: '退休医保',
    m1: 6,
    m2: 2,
    m3: 5,
    m4: 9,
  },
  {
    jflx: '单位职工小计',
    bxlx: '长护险',
    m1: 1,
    m2: 8,
    m3: 3,
    m4: 2,
  },
  {
    jflx: '单位职工小计',
    bxlx: '住院保险',
    m1: 3,
    m2: 6,
    m3: 1,
    m4: 3,
  },
  // ----------------------
  {
    jflx: '个人缴费小计',
    bxlx: '缴费基数',
    m1: 11,
    m2: 22,
    m3: 55,
    m4: 77,
  },
  {
    jflx: '个人缴费小计',
    bxlx: '养老',
    m1: 44,
    m2: 11,
    m3: 66,
    m4: 99,
  },
  {
    jflx: '个人缴费小计',
    bxlx: '失业',
    m1: 22,
    m2: 55,
    m3: 55,
    m4: 46,
  },
])

console.log(tableData, 'tableData')

// 导出
const exportExcel = () => {
  // 1.处理数据
  const body = tableData.map((x) => [x.jflx, x.bxlx, x.m1, x.m2, x.m3, x.m4])

  // 2.定义header表头
  const header = [['计费类型', '保险类型', '名称1', '名称2', '名称3', '名称4']]

  // 3.header添加到头部
  body.unshift(...header)

  // 4.aoa_to_sheet 将二维数组转换为sheet
  const sheet = XLSX.utils.aoa_to_sheet(body)

  // 5.合并单元格函数
  const merges = [
    { s: { r: 1, c: 0 }, e: { r: 6, c: 0 } },
    { s: { r: 7, c: 0 }, e: { r: 9, c: 0 } },
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
<style scoped>
table {
  border-collapse: separate;
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
}
thead tr th {
  background-color: #f8f8f9;
  padding: 6px;
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
