import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 批量注册自定义全局指令
import { setDirective } from './directives/index.js'

const app = createApp(App)
app.use(ElementPlus)
app.use(setDirective)
app.mount('#app')
