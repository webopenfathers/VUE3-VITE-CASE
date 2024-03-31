<template>
  <div>
    <div ref="dragDiv" class="drag-div" @mousedown="handleMousedown">
      <div class="btn-bg-img"></div>
      <div class="font-box">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('案件详情-原生js')
const dragDiv = ref(null)
const handleMousedown = (e) => {
  // 获取浏览器窗口文档显示区域的宽度和高度,不包括滚动条。
  const { clientWidth, clientHeight } = document.documentElement
  // 获取鼠标相对于当前元素的位置
  const disX = e.clientX - dragDiv.value.offsetLeft
  const disY = e.clientY - dragDiv.value.offsetTop
  // 鼠标点击不释放 进行拖动
  document.onmousemove = (e) => {
    //鼠标位置减去鼠标相对于当前元素的位置 获取此时此刻元素应该处于的位置
    let left = e.clientX - disX
    let top = e.clientY - disY
    // 获取元素的宽高
    const { offsetWidth, offsetHeight } = dragDiv.value
    // 设置当前元素的位置 不能超出可视区域
    if (left < 0) left = 0
    if (left > clientWidth - offsetWidth) left = clientWidth - offsetWidth
    if (top < 0) top = 0
    if (top > clientHeight - offsetHeight) top = clientHeight - offsetHeight
    dragDiv.value.style.left = left + 'px'
    dragDiv.value.style.top = top + 'px'
  }

  // 鼠标点击释放 拖动结束
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
</script>

<style>
.drag-div {
  width: 80px;
  height: 120px;
  border-radius: 50%;
  position: fixed;
  bottom: 80px;
  right: 50px;
  cursor: pointer;
}

.btn-bg-img {
  width: 80px;
  height: 80px;
  background-image: url('../assets/touxiang.png');
  background-size: cover;
}

.font-box {
  color: #3193ef;
  text-align: center;
  user-select: none;
}
</style>
