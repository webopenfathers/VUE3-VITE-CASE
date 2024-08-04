<template>
  <div class="carInfo">
    <!-- 关闭按钮 -->
    <a href="javascript:;" class="carClose"></a>
    999999
  </div>
  <div class="filterbg"></div>
  <button class="infoBtn">99999</button>
</template>
<script setup>
import $ from 'jquery'
import { onMounted } from 'vue'
import { getDateDiff } from '../utils/index'

onMounted(() => {
  console.log(getDateDiff('2024-08-02 17:06:23'), '人性化时间显示')
  // 车辆信息弹出框的显示隐藏效果
  $('.infoBtn').on('click', function () {
    $('.filterbg').show()
    $('.carInfo').show()
    $('.carInfo').width('3px')
    $('.carInfo').animate({ height: '76%' }, 400, function () {
      $('.carInfo').animate({ width: '82%' }, 400)
    })
    setTimeout(function () {
      $('.infoBox').show()
      $('.carClose').css('display', 'block')
    }, 800)
  })

  $('.carClose').on('click', function () {
    $('.carClose').css('display', 'none')
    $('.infoBox').hide()
    $('.carInfo').animate({ width: '3px' }, 400, function () {
      $('.carInfo').animate({ height: 0 }, 400)
    })

    setTimeout(function () {
      $('.filterbg').hide()
      $('.carInfo').hide()
      $('.carInfo').width(0)
    }, 800)
  })
})
</script>
<style scoped>
.carInfo {
  width: 0;
  height: 0;
  background: #061f3e;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  border-radius: 8px;
  display: none;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.carInfo .carClose {
  display: block;
  width: 44px;
  height: 44px;
  background: url(../assets/s_ico3.png);
  background-size: 100% 100%;
  position: absolute;
  top: -22px;
  right: -22px;
  display: none;
  transition: 0.3s;
}

.carInfo .carClose:hover {
  transform: rotate(180deg);
}

.filterbg {
  width: 100%;
  height: 100%;
  background: rgba(30, 182, 254, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  display: none;
}
</style>
