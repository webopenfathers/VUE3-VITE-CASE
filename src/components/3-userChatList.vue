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
        <!-- 纯文字 -->
        <div v-if="item.type === 1" class="text-word">{{ item.text }}</div>
        <!-- 纯图片 -->
        <div
          v-if="item.type === 2"
          class="text-img"
          :style="{ width: item.imgW + 'px', height: item.imgH + 'px' }"
        >
          <el-image :src="item.text" :preview-src-list="[item.text]">
          </el-image>
        </div>
        <!-- 纯视频 -->
        <div v-if="item.type === 3" class="text-video">
          <video
            :width="item.videoW + 'px'"
            :height="item.videoH + 'px'"
            controls="true"
            :poster="item.poster"
          >
            <source :src="item.text" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

    <!-- 底部键盘 -->
    <div class="send">
      <el-icon
        color="#409eff"
        size="40"
        style="margin-right: 5px; cursor: pointer"
        @click="fileRef.click()"
        ><Picture
      /></el-icon>
      <el-icon
        color="#409eff"
        size="40"
        style="margin-right: 5px; cursor: pointer"
        @click="fileVideoRef.click()"
        ><Film
      /></el-icon>
      <!-- 图片上传 -->
      <input
        type="file"
        ref="fileRef"
        :key="picNum"
        multiple
        style="display: none"
        @change="changeFile"
        accept=".png,jpg"
      />
      <!-- 视频上传 -->
      <input
        type="file"
        ref="fileVideoRef"
        :key="videoNum"
        multiple
        style="display: none"
        @change="changeVideoFile"
        accept=".mp4"
      />
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
import { ref, nextTick, onMounted } from 'vue'
// 上传文件Ref
const fileRef = ref(null)
const picNum = ref(0)
// 视频上传
const fileVideoRef = ref(null)
const videoNum = ref(0)
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
  {
    avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
    text: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-720p.mp4',
    poster: new URL('../assets/load.jpg', import.meta.url).href,
    type: 3, // 1.文字 2.图片
    flag: 0, // 1 在左 0 在右 真是开发依据用户ID
  },
])

// 初始化所有图片和视频宽高
const initImage = () => {
  list.value.forEach(async (item, index) => {
    // 图片类型
    if (item.type === 2) {
      const { imgW, imgH } = await getImageHeight(item.text)
      item.imgW = imgW
      item.imgH = imgH
    } else if (item.type === 3) {
      // 视频类型
      const { videoW, videoH } = await getVideoHeight(item.text)
      item.videoW = videoW
      item.videoH = videoH
    }
  })
}

// 同步获取图片宽高
const getImageHeight = (url) => {
  let img = new Image()
  let aspectRatio = 0
  return new Promise((resolve) => {
    img.onload = () => {
      aspectRatio = img.width / img.height
      let wFlag = 250 > img.width
      if (wFlag) {
        resolve({
          imgW: img.width,
          imgH: img.height,
        })
      } else {
        resolve({
          imgW: 250,
          imgH: 250 / aspectRatio,
        })
      }
    }
    img.src = url
  })
}

// 同步获取视频宽高
const getVideoHeight = (url) => {
  let video = document.createElement('video')
  let aspectRatio = 0
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      aspectRatio = video.videoWidth / video.videoHeight
      console.log(aspectRatio)
      let wFlag = 250 > video.videoWidth
      if (wFlag) {
        resolve({
          videoW: video.videoWidth,
          videoH: video.videoHeight,
        })
      } else {
        resolve({
          videoW: 250,
          videoH: 250 / aspectRatio,
        })
      }
    }
    video.src = url
  })
}

// 发送文字按钮
const sendMsg = () => {
  list.value.push({
    avatar: new URL('../assets/touxiang.png', import.meta.url).href,
    text: inputText.value,
    type: 1, // 文字
    flag: userId.value, // 1 在左 0 在右 真是开发依据用户ID
  })

  inputText.value = ''
  if (userId.value === 0) {
    userId.value = 1
  } else {
    userId.value = 0
  }
  goToBottom()
}

// 自动滚到底部
const goToBottom = () => {
  setTimeout(() => {
    const scrollElem = document.querySelector('.content-box')
    scrollElem.scrollTo({
      top: scrollElem.scrollHeight,
      behavior: 'smooth',
    })
  }, 200)
}

// 发送图片逻辑
const changeFile = (e) => {
  const fileList = Array.from(e.target.files)
  fileList.forEach(async (item) => {
    const url = window.URL.createObjectURL(item)
    const { imgW, imgH } = await getImageHeight(url)
    list.value.push({
      avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
      text: url,
      imgW,
      imgH,
      type: 2,
      flag: 1,
    })
  })
  picNum.value++
  goToBottom()
}

// 发送视频逻辑
const changeVideoFile = (e) => {
  const fileList = Array.from(e.target.files)
  fileList.forEach(async (item) => {
    const url = window.URL.createObjectURL(item)
    const { videoW, videoH } = await getVideoHeight(url)
    console.log(videoW, videoH)
    list.value.push({
      avatar: new URL('../assets/touxiang2.png', import.meta.url).href,
      text: url,
      videoW,
      videoH,
      type: 3,
      flag: 1,
    })
  })
  videoNum.value++
  goToBottom()
}

onMounted(() => {
  initImage()
  goToBottom()
})
</script>

<style scoped>
.main-box {
  width: 900px;
  height: 950px;
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
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.text-video {
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.send-button {
  margin-left: 10px !important;
  height: 40px;
}
</style>
