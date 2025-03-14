// vue2响应式原理
// 1. 通过Object.defineProperty()方法对对象的属性进行劫持
// 缺陷一：遍历对象的每个属性，如果属性是对象，则需要递归劫持，效率低
// 缺陷二：只能观察到对象的已有属性，不能观察到对象新增的属性
// 缺陷三：只能观察到属性的值的变化，不能观察到属性的新增或删除
// 缺陷四：不能直接监听数组的变化
// 比如：
// 当我们对数组进行一些常见的操作，比如push、pop、shift、unshift、splice等，这些操作会改变数组的长度或者顺序，
// 但是并不会直接修改数组的属性。因此，Vue2无法通过Object.defineProperty来监听这些变化。
// 解决方案：
// 1、Vue2通过重写数组的原型方法来实现对数组的监听，这样就可以监听到数组的变化了。
// 2、另一种方式是创建一个新数组并替换掉旧数组，Vue 可以检测到这种替换并触发更新this.someArray = [...this.someArray, 'new element']，这样也可以触发更新
// 3、this.$set()方法：Vue2提供了一个this.$set()方法，用于给对象或者数组添加新属性，这样就可以触发响应式了。
// 4、Vue2提供了一个this.$forceUpdate()方法，用于强制更新视图，这样就可以触发响应式了。
// 5、this.$delete()方法：Vue2提供了一个this.$delete()方法，用于删除对象的属性，这样就可以触发响应式了。

const obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2,
  },
}

// 判断是否是对象
function _isObject(v) {
  return typeof v === 'object' && v !== null
}

// 遍历对象，对对象的每个属性进行劫持
function observe(obj) {
  for (const k in obj) {
    let v = obj[k]
    // 如果v是对象，则递归劫持
    if (_isObject(v)) {
      observe(v)
    }

    Object.defineProperty(obj, k, {
      // 都a属性时，会触发get方法
      get() {
        console.log('读取', k)
        return v
      },

      // 当给a属性赋值时，会触发set方法
      set(val) {
        console.log('更新', k)
        v = val
      },
    })
  }
}

observe(obj)

obj.c.a // 触发get方法，输出 读取 c a
obj.c.b = 3 // 触发set方法，输出 读取c 更新 b
