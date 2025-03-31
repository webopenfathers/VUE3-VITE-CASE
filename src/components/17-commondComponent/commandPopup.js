import { createApp } from 'vue'
import CommandPopup from './commandPopup.vue'
import ElementPlus from 'element-plus' // 引入 Element Plus
import 'element-plus/dist/index.css' // 引入样式

let instance

const initInstance = () => {
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 使用 createApp 动态挂载组件
    const app = createApp(CommandPopup)

    // 确保动态实例也使用 Element Plus
    app.use(ElementPlus)

    instance = app.mount(container)
  }
}

const commandPopup = {
  open(options) {
    initInstance()
    instance.open(options)
  },
  close() {
    instance.close()
  },
}

export default commandPopup
