<template>
  <!-- 1.IntersectionObserver列表加载更多案例 -->
  <!-- <loadMore></loadMore> -->
  <!-- 2.IntersectionObserver实现图片懒加载 -->
  <!-- <imageLazy></imageLazy> -->
  <!-- 3.微信聊天列表界面 -->
  <!-- <userChatList></userChatList> -->
  <!-- vue悬浮可拖拽组件：VUE3指令 -->
  <!-- <dragElementDirective></dragElementDirective> -->
  <!-- vue悬浮可拖拽组件：原生JS -->
  <!-- <dragElementJS></dragElementJS> -->
  <!-- <CollapsePanel></CollapsePanel> -->
  <!-- <dialogVisible></dialogVisible> -->
  <!-- <scrollToUp></scrollToUp> -->
  <!-- <manyTableHeader></manyTableHeader> -->
  <!-- <manyTableRowANDColumn></manyTableRowANDColumn>  -->
  <!-- <xq></xq> -->
  <!-- <stepLine></stepLine> -->
  <!-- <stepLineColor></stepLineColor> -->
  <!-- <bigFileSlice></bigFileSlice> -->
  <!-- <fzTable></fzTable> -->
  <!-- <websocket></websocket> -->
  <!-- <websocketHook></websocketHook> -->
  <!-- <commandPopup></commandPopup> -->
  <!-- <dateRangePicker></dateRangePicker> -->
  <!-- <excelTable></excelTable> -->
  <!-- <textVertical></textVertical> -->
  <!-- <singleInstanceMessage></singleInstanceMessage> -->
  <!-- <manyDataDownload></manyDataDownload> -->
  <!-- <manyDataDownloadExcel></manyDataDownloadExcel> -->
  <!-- <raceCondition></raceCondition> -->
  <!-- <elementUITheme></elementUITheme> -->
  <!-- <timeSharingFun></timeSharingFun> -->
  <!-- <fileStreamDownload></fileStreamDownload> -->
  <!-- <beautifyJSON></beautifyJSON> -->
  <parallaxScrolling></parallaxScrolling>
</template>

<script setup>
// import loadMore from './components/1-loadMore.vue'
// import ImageLazy from './components/2-ImageLazy.vue'
// import userChatList from './components/3-userChatList.vue'
// import dragElementDirective from './components/4-dragElement-directive.vue'
// import dragElementJS from './components/4-dragElement-js.vue'
// import CollapsePanel from './components/5-collapse-panel.vue'
// import dialogVisible from './components/6-dialogVisible.vue'
// import scrollToUp from './components/7-官网平滑滚动动画.vue'
// import manyTableHeader from './components/8-导出excel多级表头功能.vue'
// import manyTableRowANDColumn from './components/9-导出excel多行合并功能.vue'
// import xq from './components/10-需求导出excel表格.vue'
// import stepLine from './components/11-自定义步骤条.vue'
// import stepLineColor from './components/12-自定义步骤条步骤条颜色更改.vue'
// import bigFileSlice from './components/13-大文件分片上传.vue'
// import fzTable from './components/14-简单快捷方式导出合并行或合并列且分页的表格.vue'
// import websocket from './components/15-websocket.vue'
// import websocketHook from './components/15-websocketHook.vue'
// import commandPopup from './components/17-commondComponent/index.vue' // 命令式弹窗
// import dateRangePicker from './components/18-multiValueComponent/index.vue' // 日期范围选择器
// import excelTable from './components/19-导出excel某列多行合并功能且具有分页功能的表格.vue'
// import textVertical from './components/20-文字在容器内竖向显示且文本溢出竖向显示省略号.vue'
// import singleInstanceMessage from './components/21-singleInstanceMessage/index.vue' // 单例模式-封装消息提示
// import manyDataDownload from './components/22-manyDataDownload/index.vue' // 大数据下载
// import manyDataDownloadExcel from './components/23-manyDataDownloadExcel/index.vue' // 大数据下载
// import raceCondition from './components/24-raceCondition/index.vue' // 竟态问题
// import elementUITheme from './components/25-elementUITheme/index.vue' // elementUI主题色切换
// import timeSharingFun from './components/26-timeSharingFun/index.vue' // 时间分片函数
// import fileStreamDownload from './components/28-fileStreamDownload/index.vue' // 文件流下载
// import beautifyJSON from './components/29-beautifyJSON/index.vue' // JSON美化
import parallaxScrolling from './components/30-parallaxScrolling/index.vue' // 视差滚动效果
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>
