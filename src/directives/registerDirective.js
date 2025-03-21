// 1.图片懒加载自定义指令
const lazy = {
  mounted(el, bindings) {
    const ob = new IntersectionObserver(
      (entires) => {
        entires.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            const $target = entry.target
            // 模拟接口请求
            setTimeout(() => {
              el.src = bindings.value
              // 取消监听
              ob.unobserve($target)
            }, 500)
          }
        })
      },
      {
        threshold: 1,
      }
    )
    ob.observe(el)
  },
}

// 2.元素自定义拖拽指令
const drag = {
  mounted(el) {
    // 获取浏览器窗口文档显示区域的宽度和高度,不包括滚动条。
    const { clientWidth, clientHeight } = document.documentElement
    let oDiv = el
    oDiv.onmousedown = function (e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX - oDiv.offsetLeft
      let disY = e.clientY - oDiv.offsetTop
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let l = e.clientX - disX
        let t = e.clientY - disY
        // 设置当前元素的位置 不能超出可视区域
        const { offsetWidth, offsetHeight } = oDiv
        if (l < 0) l = 0
        if (l > clientWidth - offsetWidth) l = clientWidth - offsetWidth
        if (t < 0) t = 0
        if (t > clientHeight - offsetHeight) t = clientHeight - offsetHeight
        // 移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
      // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      return false
    }
  },
}

// 3.实现元素平滑上升动画
const DISTANCE = 100
const DURATION = 500
const map = new WeakMap()

const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    // 元素出现在视口中
    if (entry.isIntersecting) {
      // 播放动画
      const animation = map.get(entry.target)
      animation && animation.play()
      ob.unobserve(entry.target)
    }
  }
})

function isBelowViewport(el) {
  const { top } = el.getBoundingClientRect()
  return top > window.innerHeight
}

const slideIn = {
  mounted(el) {
    if (!isBelowViewport(el)) {
      return
    }
    /**
     * 关键帧 @keyframes
     * 动画配置 animation
     */
    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5,
        },
        {
          transform: `translateY(0)`,
          opacity: 1,
        },
      ],
      {
        duration: DURATION,
        easeing: 'ease-out',
        fill: 'forwards',
      }
    )

    animation.pause()
    map.set(el, animation)
    ob.observe(el)
  },
  unmounted(el) {
    ob.unobserve(el)
  },
}

export { lazy, drag, slideIn }
