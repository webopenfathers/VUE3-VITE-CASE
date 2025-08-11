<template>
  <div class="content">
    <div class="trigger">
      <div class="tip"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  // 获取触发元素 距离 body 的顶部和左边距离
  const trigger = document.querySelector('.trigger')
  const triggerLeft = trigger.offsetLeft // 元素左边距离
  const triggerTop = trigger.offsetTop // 元素顶边距离

  // 获取提示元素
  const tip = document.querySelector('.tip')

  // 监听触发元素的 mouseenter和mouseleave 事件
  trigger.addEventListener('mouseenter', () => {
    tip.style.display = 'block'
  })
  trigger.addEventListener('mouseleave', () => {
    tip.style.display = 'none'
  })

  // 监听滚动事件---获取滚动位置
  window.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop
    // 判断滚动条的位置---吸顶操作
    if (scrollTop > triggerTop) {
      tip.style.position = 'fixed'
      tip.style.top = '20px'
      tip.style.left = triggerLeft + 20 + 'px'
    } else {
      tip.style.position = 'absolute'
      tip.style.top = '20px'
      tip.style.left = '20px'
    }
  })
})
</script>

<style scoped>
.content {
  width: 100vw;
  height: 180vh;
  background-color: #ccc;
  padding-top: 200px;
}

.trigger {
  position: relative;
  margin-left: 200px;
  width: 200px;
  height: 200px;
  background-color: pink;
}

.tip {
  position: absolute;
  width: 800px;
  left: 20px;
  top: 20px;
  height: 400px;
  background-color: red;
}
</style>
