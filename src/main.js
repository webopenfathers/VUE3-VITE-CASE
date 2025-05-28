import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/theme.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setDirective } from './directives/index.js'

// 自动检测应用更新脚本
import './components/27-autoUpload/auto-upload.js'

// 命令式弹框zoom-in-center
import commandPopup from './components/17-commondComponent/commandPopup.js'

const app = createApp(App)

// 全局注册 Element Plus
app.use(ElementPlus)

// 全局注册 Element Plus 图标
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component)
})

// 全局注册自定义指令和工具
app.use(setDirective)
app.provide('commandPopup', commandPopup)

app.mount('#app')

// 导出主应用实例的上下文
export const appContext = app._context
