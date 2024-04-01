<template>
  <div>
    <div class="content" :class="{ active: arrow }">
      <!-- 展示区域 -->
      <div class="view-select">
        <!-- 折叠按钮 -->
        <span @click="arrow = !arrow">
          {{ arrow ? '展开' : '收起' }}
          <el-icon v-if="arrow"><ArrowDown /></el-icon>
          <el-icon v-else><ArrowUp /></el-icon>
        </span>
        <span style="font-size: 18px; margin-left: 20px">搜索条件：</span>
        <span v-if="valueT.length" style="margin-left: 20px"
          >项目T级：
          <span style="background: #ccc; padding: 2px 5px">{{
            valueT.join(' ')
          }}</span>
        </span>
        <span v-if="valueX.length" style="margin-left: 20px"
          >容灾需求：
          <span style="background: #ccc; padding: 2px 5px">{{
            valueX.join(' ')
          }}</span>
        </span>
      </div>

      <!-- 选择区域 -->
      <div class="select-box">
        <div style="margin-bottom: 20px">
          <span style="display: inline-block; width: 100px; text-align: right"
            >项目T级：</span
          >
          <el-select
            multiple
            v-model="value1"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-bottom: 20px">
          <span style="display: inline-block; width: 100px; text-align: right">
            容灾需求：</span
          >
          <el-select
            multiple
            v-model="value2"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in drOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <el-button @click="confirm" style="margin: auto" type="primary"
        >确认</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// 控制箭头朝向以及宽度
const arrow = ref(true)
const value1 = ref([])
const value2 = ref([])

const valueT = ref([])
const valueX = ref([])

const drOptions = [
  {
    value: 'Y',
    label: '是',
  },
  {
    value: 'N',
    label: '否',
  },
]

const options = [
  {
    value: 'T1',
    label: 'T1',
  },
  {
    value: 'T2',
    label: 'T2',
  },
  {
    value: 'T3',
    label: 'T3',
  },
  {
    value: 'T4',
    label: 'T4',
  },
]

const confirm = () => {
  // T级赋值
  valueT.value = value1.value
  //
  const tempT = drOptions
    .filter((item) => value2.value.includes(item.value))
    .map((item) => item.label)
  valueX.value = tempT
  arrow.value = !arrow.value
}
</script>

<style scoped>
.content {
  height: 500px;
  width: 800px;
  margin: 20px auto;
  border: 1px solid #ccc;
  transition: all 0.3s;
  overflow: hidden;
  padding-bottom: 10px;
}

.active {
  height: 40px;
  transition: all 0.3s;
}

.view-select {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
  margin-bottom: 40px;
}

.select-box {
  padding: 5px;
}
</style>
