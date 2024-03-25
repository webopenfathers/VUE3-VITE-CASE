<template>
  <div>
    <p class="p1" ref="pRef" v-for="(item, index) in list" :key="index">
      {{ item }}
    </p>
    <!-- 隐藏/显示 加载更多 -->
    <p v-show="pElHeight >= windowHight" id="load" class="p2">
      {{ loadStatus }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const list = ref(26)

// 三种状态--上拉加载更多，加载中，没有更多
const loadStatus = ref('上拉加载更多')

// 1.判断是否显示加载更多---当元素高度大于屏幕高度才显示
const windowHight = ref(0)
const pElHeight = ref(0)
const pRef = ref(null)
const isShowLoadMore = () => {
  windowHight.value = 0
  pElHeight.value = 0
  // 获取屏幕高度
  windowHight.value = document.documentElement.clientHeight
  // 获取元素总高度 pElHeight
  Array.from(pRef.value).forEach((item) => {
    console.log(item.offsetHeight)
    pElHeight.value += item.offsetHeight + 5
  })
  console.log(windowHight.value)
  console.log(pElHeight.value)
  return pElHeight.value >= windowHight.value
}

// 2.判断 loadStatus 和窗口重合加载数据
// 创建一个IntersectionObserver实例
// 获取需要观察的元素
const ob = () => {
  const observerElement = document.getElementById('load')
  const observer = new IntersectionObserver((entries) => getData(entries), {
    // 选项配置，例如阈值
    threshold: 1,
  })
  observer.observe(observerElement)
}

// 3.加载数据逻辑
const getData = (entries) => {
  // 当观察的元素与其根（视口）交叉时，触发回调函数
  const entery = entries[0]
  if (entery.isIntersecting) {
    // 模拟请求 API接口数据
    if (loadStatus.value === '加载中...') return
    loadStatus.value = '加载中...'
    setTimeout(() => {
      list.value += 5
      loadStatus.value = '上拉加载更多'
    }, 3000)
  }
}

onMounted(() => {
  // 1.判断是否显示--加载中...元素 && DOM挂载完毕开始观察
  isShowLoadMore() && ob()

  // 2.当窗口尺寸发生变化时也要观察--判断是否显示loadMore
  window.addEventListener('resize', () => {
    isShowLoadMore() && ob()
  })
})
</script>

<style>
.p1 {
  text-align: center;
  background-color: #fcdbc9;
  color: #b63cfe;
  margin-bottom: 5px;
}
.p2 {
  text-align: center;
  background-color: pink;
}
</style>
