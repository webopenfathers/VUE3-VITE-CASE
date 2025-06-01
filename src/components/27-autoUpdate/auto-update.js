// 自动检测更新应用

let lastSrcs // 上一次获取到的script地址
// const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm
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
    // 创建简单的模态框--遮罩层
    const dialog = document.createElement('div')
    dialog.style.position = 'fixed'
    dialog.style.top = '0'
    dialog.style.left = '0'
    dialog.style.width = '100%'
    dialog.style.height = '100%'
    dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    dialog.style.zIndex = '9999'

    // 创建页面中间的box
    const box = document.createElement('div')
    box.style.backgroundColor = '#fff'
    box.style.padding = '20px'
    box.style.borderRadius = '5px'
    box.style.textAlign = 'center'
    box.style.margin = '10% auto auto'
    box.style.width = '35%'

    // 创建box中的提示文字
    const text = document.createElement('p')
    text.textContent = '页面脚本已更新，请点击确定获取最新版本。'

    // 创建确定按钮
    const button = document.createElement('button')
    button.textContent = '确定'
    button.style.marginTop = '20px'
    button.style.padding = '5px 30px'
    button.style.backgroundColor = '#007bff'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.borderRadius = '3px'
    button.style.cursor = 'pointer'

    // 点击确定后关闭弹窗并 resolve Promise
    button.addEventListener('click', () => {
      document.body.removeChild(dialog)
      resolve()
    })

    // 页面中追加元素
    box.appendChild(text)
    box.appendChild(button)
    dialog.appendChild(box)
    document.body.appendChild(dialog)
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
