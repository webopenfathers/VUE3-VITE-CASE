// 图片懒加载自定义指令
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

export { lazy }
