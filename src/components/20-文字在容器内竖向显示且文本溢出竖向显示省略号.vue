<template>
  <div class="vertical-container">
    <span class="prefix">1、</span>
    <span class="vertical-text"> 演练回切演练回切演练回切 </span>
  </div>
</template>
<style scoped>
.vertical-container {
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vertical-text {
  writing-mode: vertical-rl;
  /* 文字竖向排列 */
  text-overflow: ellipsis;
  /* 溢出显示省略号 */
  overflow: hidden;
  /* 隐藏溢出的内容 */
  white-space: nowrap;
  /* 禁止换行 */
  width: 25px;
  /* 容器宽度 */
  height: 160px;
  /* 容器高度 */
}

.prefix {
  writing-mode: horizontal-tb;
  /* 保持水平排列 */
  text-align: center;
  /* 居中对齐 */
  width: 15px;
  /* 与竖向文字宽度一致 */
}
</style>
