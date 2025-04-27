import { ElMessage } from 'element-plus'

class MessageSingleton {
  instance = null
  timer = null
  constructor() {
    this.instance = null // 当前消息实例
    this.timer = null // 定时器防止重复弹出
  }

  // 显示消息方法
  showMessage(options) {
    const { message, type = 'info', duration = 3000 } = options
    // 如果有正在显示的消息，直接返回
    if (this.instance) return

    // 显示新消息
    this.instance = ElMessage({
      message,
      type,
      duration,
      onClose: () => {
        // 消息关闭时清除实例
        this.instance = null
      },
    })

    // 定时清除，防止重复弹出
    this.timer = setTimeout(() => {
      this.instance = null
    }, duration)
  }

  // 销毁消息实例方法
  destroy() {
    if (this.instance) {
      this.instance.close()
      this.instance = null
    }
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}

const messageSingleton = new MessageSingleton()

// 导出单例实例
export const Message = {
  success: (message, option = {}) =>
    messageSingleton.showMessage({ message, type: 'success', ...option }),
  error: (message, option = {}) =>
    messageSingleton.showMessage({ message, type: 'error', ...option }),
  info: (message, option = {}) =>
    messageSingleton.showMessage({ message, type: 'info', ...option }),
  warning: (message, option = {}) =>
    messageSingleton.showMessage({ message, type: 'warning', ...option }),
}
