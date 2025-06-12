// 自动检测更新应用

import { ElMessage, ElMessageBox } from 'element-plus'

// 上一次获取到的script地址
let lastSrcs

// 匹配script标签的正则
const scriptReg = /<script[^>]*src\s*=\s*["'](?<src>[^"']*)["'][^>]*>/gi

/**
 * 获取最新页面中的script链接
 */
async function extractNewScripts() {
  // 优化前地址 ------ '/?_timestamp=' + Date.now()
  // 优化后地址 ------ currentURL + '?_timestamp=' + Date.now()
  const { origin, pathname } = window.location
  const currentURL = origin + pathname
  const html = await fetch(currentURL + '?_timestamp=' + Date.now()).then(
    (res) => res.text()
  )
  console.log(html, 'html')
  scriptReg.lastIndex = 0
  let result = []
  let match
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups.src)
  }

  return result
}

/**
 * 判断是否需要更新
 * @returns {boolean} true表示需要更新，false表示不需要更新
 */
async function needUpdate() {
  const newScripts = await extractNewScripts()
  console.log(newScripts, 'newScripts')
  console.log(lastSrcs, 'lastSrcs')

  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }

  let result = false
  if (lastSrcs.length !== newScripts.length) {
    result = true
  }

  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true
      break
    }
  }

  lastSrcs = newScripts
  return result
}

// 创建模态框
// 返回一个 Promise 目的等待用户点击确定按钮后继续执行autoRefresh()
function showUpdateDialog() {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      '检测到新功能已上线，请点击确定获取最新版本。',
      '版本更新',
      {
        showClose: false,
        closeOnClickModal: false,
        showCancelButton: false,
        confirmButtonText: '确定',
        type: 'warning',
      }
    )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '获取最新版本成功，正在刷新页面...',
        })
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      .catch((error) => {})
  })
}

/**
 * 自动刷新页面脚本
 */
const DURATION = 2000
function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      await showUpdateDialog()
      location.reload()
    }

    autoRefresh()
  }, DURATION)
}

autoRefresh()
