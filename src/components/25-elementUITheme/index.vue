<template>
  <div style="display: flex; justify-content: end">
    <el-button type="primary" @click="toggleTheme">切换主题</el-button>
  </div>
</template>
<script setup>
// 切换主题
const toggleTheme = (event) => {
  // 检查浏览器是否支持 View Transition API
  if (!document.startViewTransition) {
    // 不支持则直接切换主题，不添加动画
    document.documentElement.classList.toggle('dark')
    return
  }

  // View Transition API 的核心方法，它允许你在 DOM 更新时创建平滑的过渡动画
  // 返回一个 transition 对象，可以用来控制过渡过程
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark')
  })

  // 可以通过 transition.ready 和 transition.finished Promise 来添加自定义动画效果
  // 圆形扩散动画就是在 transition.ready.then() 中实现的
  transition.ready.then(() => {
    // 获取用户点击的坐标位置 (clientX, clientY)
    const { clientX, clientY } = event

    // 计算从点击位置到屏幕边缘的最大距离作为动画结束半径
    const endRadius = Math.hypot(
      // 计算点击位置的横坐标 clientX 到屏幕左右边缘的最大距离。
      Math.max(clientX, innerWidth - clientX),

      // 计算点击位置的纵坐标 clientY 到屏幕上下边缘的最大距离。
      Math.max(clientY, innerHeight - clientY)
    )

    // 定义裁剪路径动画
    const clipPath = [
      `circle(0px at ${clientX}px ${clientY}px)`, // 初始状态：半径为0的圆（不可见）
      `circle(${endRadius}px at ${clientX}px ${clientY}px)`, // 结束状态：完全展开的圆
    ]

    const isDark = document.documentElement.classList.contains('dark')

    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath, // 动画属性：裁剪路径
      },
      {
        duration: 450, // 动画持续时间450毫秒
        easing: 'ease-in', // 缓动函数：开始慢，逐渐加速
        pseudoElement: isDark // 目标伪元素
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    )
  })
}
</script>
