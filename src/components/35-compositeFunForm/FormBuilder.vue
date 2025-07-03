<template>
  <el-form :model="modelValue" :rules="rules" ref="formRef">
    <el-row :gutter="20">
      <el-col v-for="item in items" :key="item.key" :span="item.span || 24">
        <el-form-item :label="item.label" :prop="item.key">
          <!-- select -->
          <template v-if="item.type === 'select'">
            <el-select
              v-model="modelValue[item.key]"
              :placeholder="item.placeholder || '请选择'"
              clearable
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <!-- 其他 -->
          <slot v-else :name="item.key">
            <component
              :is="getComponent(item)"
              v-bind="getProps(item)"
              v-model="modelValue[item.key]"
            ></component>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup>
import { ref, computed } from 'vue'
// 获取组件传递的参数
const props = defineProps({
  formItems: {
    type: Array,
    required: true,
  },
  rules: {
    type: Object,
    required: true,
  },
})

// 获取组件实例
const formRef = ref(null)

// 获取组件的modelValue
const modelValue = defineModel({
  type: Object,
  default: () => ({}),
})

// 定义组件映射关系
const componentMap = {
  input: 'el-input',
  number: 'el-input-number',
  select: 'el-select',
}

// 计算属性，过滤掉 hidden 的表单项
const items = computed(() => props.formItems.filter((item) => !item.hidden))

// 获取组件类型
function getComponent(item) {
  const { type } = item
  // type 是一个函数或者是一个对象(不是字符串)
  if (type && typeof type !== 'string') return type

  return componentMap[item.type || 'input']
}

// 获取组件的属性
function getProps(item) {
  if (item.props) return item.props

  // 过滤掉 label、key、type 属性
  const { label, key, type, ...rest } = item

  // rest 就是过滤后的新对象
  return rest
}

// 定义暴露的接口
defineExpose({
  // 表单校验
  validate(...args) {
    return formRef.value.validate(...args)
  },
  // 表单重置
  resetFields() {
    formRef.value.resetFields()
  },
})
</script>
