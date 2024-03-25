import { createApp } from 'vue'
import App from './App.vue'

// 批量注册自定义全局指令
import { setDirective } from './directives/index.js'

const app = createApp(App)
app.use(setDirective)
app.mount('#app')
