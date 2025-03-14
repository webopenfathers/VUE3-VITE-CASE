// vue3响应式原理
// 1. 通过Proxy实现响应式(ES6 API)
// 2. Proxy可以直接监听对象而非属性
// 3. Proxy可以直接监听数组
// 4. Proxy有多达13种拦截方法，不限于get和set
// 5. Proxy返回的是一个新对象，我们可以只操作新对象达到目的
// 6. Proxy不支持IE

const obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2,
  },
}

// 可以看出来proxy监听的是整个对象，
// 而不是Object.defineProperty这种形式需要再对每个属性进行监听

const proxy = new Proxy(obj, {
  // target 目标对象
  //目标对象的 key 属性
  get(target, key) {
    console.log('读取对象的属性', key)
    return target[key]
  },

  // target 目标对象
  // 目标对象的 key 属性
  //设置的值
  set(target, key, value) {
    if (target[key] === value) return
    target[key] = value
    console.log('更新对象的属性', key, value)
    return true // 显式返回true
  },
})

proxy.a = 2
proxy.c.a
