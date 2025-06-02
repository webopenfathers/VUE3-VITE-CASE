import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/theme.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setDirective } from './directives/index.js'

// 页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 自动检测应用更新脚本
import './components/27-autoUpdate/auto-update.js'

// 命令式弹框zoom-in-center
import commandPopup from './components/17-commondComponent/commandPopup.js'

const app = createApp(App)

// 全局注册 Element Plus
app.use(ElementPlus)

// 全局注册 Element Plus 图标
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component)
})

// 在页面路由切换或者页面加载时启动进度条
NProgress.start()

// 页面加载完成后结束进度条
NProgress.done()

// 全局注册自定义指令和工具
app.use(setDirective)
app.provide('commandPopup', commandPopup)

app.mount('#app')
