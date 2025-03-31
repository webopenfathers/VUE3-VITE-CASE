<template>
  <el-dialog
    :close-on-click-modal="false"
    v-model="visible"
    :title="state.title"
    :width="state.width"
    @close="handleClose"
  >
    <component
      :is="state.component"
      @close="handleClose"
      v-bind="state.props"
    />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, markRaw } from 'vue'

const visible = ref(true)
const state = reactive({
  component: null,
  props: {},
  title: '弹框标题',
  width: '30%',
  height: '',
})

const open = ({ component, props, title, width, height }) => {
  state.component = markRaw(component)
  state.props = props
  visible.value = true
  state.title = title || '弹框标题'
  state.width = width || '30%'
  state.height = height || ''
}

const close = () => {
  visible.value = false
}

const handleClose = () => {
  close()
  state.component = null
  state.props = {}
}

defineExpose({
  open,
  close,
})
</script>
