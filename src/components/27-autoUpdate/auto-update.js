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

/**
 * 自动刷新页面脚本
 */
const DURATION = 2000
function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      const result = confirm('页面脚本发生变化，点击确定刷新页面？')
      if (result) {
        location.reload()
      }
    }

    autoRefresh()
  }, DURATION)
}

autoRefresh()
