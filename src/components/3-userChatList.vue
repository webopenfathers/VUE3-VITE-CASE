<template>
  <div class="main-box">
    <!-- 内容区 -->
    <div class="content-box">
      <div
        class="content-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ 'flex-direction': item.flag ? 'row' : 'row-reverse' }"
      >
        <img :src="item.avatar" alt="" />
        <div v-if="item.type === 1" class="text-word">{{ item.text }}</div>
        <div v-if="item.type === 2" class="text-img">
          <el-image :src="item.text" :preview-src-list="[item.text]">
          </el-image>
        </div>
      </div>
    </div>

    <!-- 底部键盘 -->
    <div class="send">
      <el-input v-model="inputText"></el-input>
      <el-button
        class="send-button"
        type="primary"
        @click="sendMsg"
        :disabled="inputText ? false : true"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const inputText = ref('')
const userId = ref(1)
const list = ref([
  {
    avatar: new URL('../assets/touxiang.png', import.meta.url).href,
    text: '99999999',
    type: 1, // 1.文字 2.图片
    flag: 1, // 1 在左 0 在右 真是开发依据用户ID
  },
  {
    avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
    text: 'zbw_test',
    type: 1, // 1.文字 2.图片
    flag: 0, // 1 在左 0 在右 真是开发依据用户ID
  },
  {
    avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
    text: 'https://img1.sycdn.imooc.com/szimg/65f2a35c081b354705400304.jpg',
    type: 2, // 1.文字 2.图片
    flag: 1, // 1 在左 0 在右 真是开发依据用户ID
  },
])

//发送按钮
const sendMsg = () => {
  list.value.push({
    avatar:
      userId.value === 1
        ? new URL('../assets/touxiang.png', import.meta.url).href
        : new URL('../assets/touxiang2.png', import.meta.url).href,
    text: inputText.value,
    type: 1, // 1.文字 2.图片
    flag: userId.value, // 1 在左 0 在右 真是开发依据用户ID
  })

  inputText.value = ''
  if (userId.value === 0) {
    userId.value = 1
  } else {
    userId.value = 0
  }
}
</script>

<style scoped>
.main-box {
  width: 600px;
  height: 800px;
  margin: 10px auto;
  border: 1px solid #ccc;
  position: relative;
  background: #e9ebec;
}

.send {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
}

.content-box {
  overflow: auto;
  height: calc(100% - 40px);
}

.content-item {
  display: flex;
  align-items: flex-start;
  padding: 5px;
  margin-bottom: 5px;
}

.content-item > img {
  border-radius: 50%;
  object-fit: contain;
  width: 40px;
  height: 40px;
}

.text-word {
  word-wrap: break-word;
  max-width: 200px;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.text-img {
  width: 135px;
  height: 76px;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.send-button {
  margin-left: 10px !important;
}
</style>
