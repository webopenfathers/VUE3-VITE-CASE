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
        <!-- 头像 -->
        <img :src="item.avatar" alt="" />
        <!-- 文字 或 图片 -->
        <div v-if="item.type === 1" class="text-word">{{ item.text }}</div>
        <div
          v-if="item.type === 2"
          class="text-img"
          :style="{ height: getImageHeight(item.text) + 'px' }"
        >
          <el-image :src="item.text" :preview-src-list="[item.text]">
          </el-image>
        </div>
        <!-- 文字 或 图片 -->
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
import { ref, nextTick } from 'vue'
const inputText = ref('')
// 此处userId 1在左  0在右
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
  {
    avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
    text: 'https://images.pexels.com/photos/5313576/pexels-photo-5313576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    type: 2, // 1.文字 2.图片
    flag: 1, // 1 在左 0 在右 真是开发依据用户ID
  },
])

// 动态计算每张图片的高度并返回
const getImageHeight = (url) => {
  let img = new Image()
  let aspectRatio = 0
  img.src = url
  img.onload = () => {
    aspectRatio = img.width / img.height
    return 200 / aspectRatio
  }
}

//发送按钮
const sendMsg = () => {
  // 测试发送不同的数据
  if (userId.value === 1) {
    list.value.push({
      avatar: new URL('../assets/touxiang.png', import.meta.url).href,
      text: inputText.value,
      type: 1, // 文字
      flag: userId.value, // 1 在左 0 在右 真是开发依据用户ID
    })
  } else {
    list.value.push({
      avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
      text: 'https://images.pexels.com/photos/10413401/pexels-photo-10413401.jpeg',
      type: 2, // 图片
      flag: userId.value, // 1 在左 0 在右 真是开发依据用户ID
    })
  }

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
  width: 200px;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.send-button {
  margin-left: 10px !important;
}
</style>
