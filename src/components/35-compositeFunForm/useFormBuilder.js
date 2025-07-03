import { h, reactive, ref } from 'vue'
import FormBuilder from './FormBuilder.vue'

export const useFormBuilder = (props) => {
  const formRef = ref(null)
  const Component = (_, { slots }) => {
    return h(FormBuilder, { ...reactive(props), ref: formRef }, slots)
  }

  return {
    FormBuilder: Component,
    validate() {
      return formRef.value?.validate()
    },
    resetFields() {
      return formRef.value?.resetFields()
    },
  }
}
