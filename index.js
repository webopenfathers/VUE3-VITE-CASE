const audioEle = document.querySelector('audio')
const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

// 初始化 canvas 的尺寸
function initCvs() {
  cvs.width = window.innerWidth * devicePixelRatio
  cvs.height = (window.innerHeight / 2) * devicePixelRatio
}

initCvs()

let isInited = false
let analyser = null
let buffer = null
audioEle.addEventListener('play', () => {
  if (isInited) return
  // 初始化
  const audioCtx = new AudioContext() // 创建音频上下文
  const source = audioCtx.createMediaElementSource(audioEle) // 创建音频源
  analyser = audioCtx.createAnalyser() // 创建分析器
  source.connect(analyser) // 连接分析器
  analyser.fftSize = 512 // 设置 FFT 大小
  buffer = new Uint8Array(analyser.frequencyBinCount) // 类型化数组
  analyser.connect(audioCtx.destination) // 连接到音频上下文的输出
  isInited = true
})

function draw() {
  requestAnimationFrame(draw) // 请求动画帧
  if (!isInited) return // 如果没有初始化，直接返回
  analyser.getByteFrequencyData(buffer) // 获取频率数据

  const { width, height } = cvs // 获取 canvas 的宽高
  ctx.clearRect(0, 0, width, height) // 清空画布
  const len = buffer.length / 2.5 // 获取频率数据的长度
  const count = len * 2 // 画的柱状图的数量
  const barWidth = width / count // 单根柱状图的宽度
  ctx.fillStyle = '#78C5F7' // 设置填充颜色
  for (let i = 0; i < len.length; i++) {
    // 画柱状图
    const barHeight = (buffer[i] / 255) * height // 柱状图的高度
    const x1 = i * barWidth + width / 2 // 柱状图的 x 坐标
    const x2 = (i + 1) * barWidth + width / 2 // 柱状图的 x 坐标
    const y = height - barHeight // 柱状图的 y 坐标
    ctx.fillRect(x1, y, barWidth - 2, barHeight) // 绘制柱状图
    ctx.fillRect(x2, y, barWidth - 2, barHeight) // 绘制柱状图
  }
}

draw()
