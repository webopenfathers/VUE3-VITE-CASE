import { ref } from 'vue'
/**
 * 时间分片函数封装---降低任务执行优先级
 * @description 批量执行任务
 * @param {Array} tasks 任务列表
 * @returns {Object} 返回list、done、start 三个方法
 */
export default function usePerformTasks(tasks) {
  const list = ref([])
  const done = ref(false)
  let index = 0
  function _run() {
    requestIdleCallback((idle) => {
      while (index < tasks.length && idle.timeRemaining() > 0) {
        list.value.push(tasks[index++])
      }

      if (index < tasks.length) return _run()
      done.value = false
    })
  }
  function start() {
    done.value = true
    if (tasks.length === 0) return
    index = 0
    list.value = []
    _run()
  }

  return { list, start, done }
}
