<template>
  <div
    class="content"
    style="display: flex; align-items: center; justify-content: center"
  >
    <div class="step-item" v-for="(i, index) in listData" :key="index">
      <!-- 上 -->
      <div class="step-top">
        {{ i.title }}<span class="step-user">支撑人员 {{ i.user }}</span>
      </div>
      <div class="step-time">{{ i.time }}</div>
      <!-- 图标  -->
      <div class="step-icon">
        <el-icon
          v-if="i.status == '3'"
          class="icon-size"
          @click="handleClick(index)"
          :style="{
            border: `2px solid ${
              activeIndex === index ? i.color : 'transparent'
            }`,
          }"
          :class="activeIndex === index ? 'icon-click' : ''"
          :color="i.color"
          ><CircleCheckFilled
        /></el-icon>
        <el-icon
          v-if="i.status == '2'"
          class="icon-size"
          :style="{
            border: `2px solid ${
              activeIndex === index ? i.color : 'transparent'
            }`,
          }"
          @click="handleClick(index)"
          :class="activeIndex === index ? 'icon-click' : ''"
          :color="i.color"
          ><WarningFilled
        /></el-icon>

        <el-icon
          v-if="i.status == '1'"
          class="icon-size"
          @click="handleClick(index)"
          :class="activeIndex === index ? 'icon-click' : ''"
          :color="i.color"
          :style="{
            border: `2px solid ${
              activeIndex === index ? i.color : 'transparent'
            }`,
          }"
          ><QuestionFilled
        /></el-icon>

        <el-icon
          v-if="i.status == '0'"
          class="icon-size"
          @click="handleClick(index)"
          :class="activeIndex === index ? 'icon-click' : ''"
          :color="i.color"
          :style="{
            border: `2px solid ${
              activeIndex === index ? i.color : 'transparent'
            }`,
          }"
          ><CircleCloseFilled
        /></el-icon>
        <div
          class="icon-line"
          :style="{ 'border-top': `2px solid ${i.color}` }"
        ></div>
      </div>
      <!-- 文字 -->
      <div class="step-bottom" :style="{ color: i.color }">
        <div
          class="step-line"
          :style="{
            'border-left': `2px solid ${i.color}`,
            'border-bottom': `2px solid ${i.color}`,
          }"
        ></div>
        <div class="step-status" :style="{ border: `2px solid ${i.color}` }">
          已完成
        </div>
        <div class="ellipsis-multiline">
          {{ i.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// 步骤条数据
const list = ref([
  {
    title: 'yyrk',
    time: '2024-12-24',
    user: 'xwx55555555555555',
    status: '3',
    desc: '领域/T级/Owner项目未入库，资源未入库领域/T级/Owner项目未入库',
  },
  {
    title: 'rzdj',
    time: '2024-12-24',
    user: 'xwx5555555',
    status: '2',
    desc: '测试testtest，测试testtest，测试testtest，测试testtest，测试testtest',
  },
  {
    title: 'rzyl',
    time: '2024-12-24',
    user: 'xwx5555555',
    status: '1',
    desc: '测试testtest，测试testtest，测试testtest，测试testtest，测试testtest',
  },
  {
    title: 'rzyq',
    time: '2024-12-24',
    user: 'xwx5555555',
    status: '0',
    desc: '测试testtest，测试testtest，测试testtest，测试testtest，测试testtest',
  },
])

// 步骤条颜色
const colorMap = {
  3: '#80c342',
  2: '#ffd04d',
  1: '#ff3112',
  0: '#ecefe5',
}

// 数据处理加入样式
const listData = list.value.map((item) => {
  item.color = colorMap[item.status]
  return item
})

// 点击效果
const activeIndex = ref(0)
const handleClick = (index) => {
  activeIndex.value = index
}
</script>
<style scoped>
.content {
  width: 90%;
  margin: auto;
  height: 600px;
  border: 1px solid red;
}

.step-item {
  width: 18%;
}

.icon-line {
  width: 100%;
}

.step-item:last-of-type .icon-line {
  display: none;
}

.step-top {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.step-user {
  margin-left: 10px;
  color: #ccc;
}

.step-time {
  color: #ccc;
  margin-top: 5px;
}

.step-icon {
  display: flex;
  align-items: center;
}

.icon-size {
  font-size: 45px;
  cursor: pointer;
  padding: 3px;
  border-radius: 100%;
}

.icon-click {
  border-radius: 100%;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 2px 2px 16px 0px;
}

.step-bottom {
  display: flex;
}

.step-line {
  border-bottom-left-radius: 50%;
  margin-top: -10px;
  width: 50px;
  height: 50px;
  margin-left: 25px;
}

.step-status {
  padding: 3px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  margin-top: 25px;
  flex-shrink: 0;
}

.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-left: 10px;
  font-size: 16px;
  margin-top: 25px;
  width: 100%;
}
</style>
