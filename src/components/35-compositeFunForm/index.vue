<template>
  <div style="height: 100vh; overflow: auto; background: #f0f1d3">
    <div style="width: 50%; margin: 0 auto; padding-top: 200px">
      <FormBuilder>
        <template #phone>
          <div>我要自己处理手机号(插槽)</div>
        </template>
      </FormBuilder>
      <el-button @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useFormBuilder } from './useFormBuilder'
import About from './about.vue'

// 定义表单数据
const formData = ref({
  name: '',
  age: null,
})

// 定义表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '请输入数字值', trigger: ['blur', 'change'] },
  ],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
}

// 定义表单项
// 使用 computed 计算属性来动态生成表单项
const formItems = computed(() => [
  {
    label: '姓名',
    key: 'name',
    type: 'input',
    placeholder: '请输入姓名',
    clearable: true,
    span: 12,
    // 添加自定义事件
    onChange() {
      console.log('onChange了姓名')
    },
    onInput() {
      console.log('输入了姓名')
    },
  },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
    placeholder: '请输入年龄',
    clearable: true,
    span: 12,
  },
  {
    label: '邮箱',
    key: 'email',
    type: About, // 使用自定义组件
    placeholder: '请输入邮箱',
    clearable: true,
  },
  // 不传递 type 默认为 input
  {
    label: '地址',
    key: 'adress',
    placeholder: '请输入地址',
    clearable: true,
  },
  // 传递插槽，自定义插槽
  {
    label: '手机',
    key: 'phone',
    placeholder: '请输入手机号',
    clearable: true,
  },
  // 判断是否隐藏该表单项
  {
    label: '性别',
    key: 'sex',
    type: 'select',
    hidden: formData.value.name === '张三', // 如果姓名是张三，则隐藏性别选择
    placeholder: '请选择性别',
    clearable: true,
    options: [
      {
        label: '男',
        value: '1',
      },
      {
        label: '女',
        value: '2',
      },
    ],
  },
])

// 组合式函数实现动态表单
const { FormBuilder, validate } = useFormBuilder({
  rules,
  formItems,
  modelValue: formData,
})

async function onSubmit() {
  await validate()
  console.log('检验成功：:', formData.value)
}
</script>
