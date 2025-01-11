// 此库用来计算文件hash值
import SparkMD5 from 'spark-md5'

/**
 * 3.创建分片返回分片结果
 * @param {*} file 文件
 * @param {*} index 第几个分片
 * @param {*} chunkSize 定义的每个分片大小
 * @returns
 */
export const createChunk = (file, index, chunkSize) => {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize // 开始位置
    const end = start + chunkSize // 结束位置
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    const blob = file.slice(start, end)
    fileReader.onload = (e) => {
      spark.append(e.target.result)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      })
    }
    fileReader.readAsArrayBuffer(blob)
  })
}
