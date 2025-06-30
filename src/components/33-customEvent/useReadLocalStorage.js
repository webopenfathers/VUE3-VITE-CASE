import { ref, onUnmounted, onMounted } from 'vue'

// 自定义事件监听localStorage变化
const useReadLocalStorage = (key) => {
  const storageValue = ref(null)

  // 读取localStorage
  const readValue = () => {
    const itemValue = localStorage.getItem(key)
    return itemValue ? JSON.parse(itemValue) : null
  }

  // 初始化storageValue
  storageValue.value = readValue()

  // 监听localStorage变化
  const handleStorageChange = (event) => {
    if (event.detail.key && event.detail.key !== key) return
    storageValue.value = readValue()
  }

  onMounted(() => {
    window.addEventListener('local-storage', handleStorageChange)
  })

  onUnmounted(() => {
    window.removeEventListener('local-storage', handleStorageChange)
  })

  return {
    storageValue,
  }
}

export default useReadLocalStorage
