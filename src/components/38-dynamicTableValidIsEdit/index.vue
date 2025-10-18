<template>
  <el-form
    :model="formData"
    label-width="auto"
    style="margin: auto; width: 90%"
    ref="formRef"
  >
    <el-form-item label="修改类型" prop="type">
      <el-checkbox-group v-model="formData.type">
        <el-checkbox
          :key="index"
          :value="item.value"
          :label="item.label"
          v-for="(item, index) in checkboxOptions"
        >
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-table :data="formData.tableData" border :row-key="(row) => row.id">
      <!-- <el-table-column label="姓名">
        <template #default="scope">
          <el-form-item
            :key="scope.$index"
            :prop="'tableData.' + scope.$index + '.name'"
            :rules="rules.name"
          >
            <el-input v-model="scope.row.name" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template #default="scope">
          <el-form-item
            :key="scope.$index"
            :prop="'tableData.' + scope.$index + '.age'"
            :rules="rules.name"
          >
            <el-input v-model="scope.row.age" />
          </el-form-item>
        </template>
      </el-table-column> -->

      <el-table-column
        :label="item.label"
        v-for="(item, index) in checkboxOptions"
      >
        <template #default="scope">
          <!-- 一：可编辑 -->
          <el-form-item
            v-if="isCheck(item.value)"
            :key="scope.$index"
            :prop="'tableData.' + scope.$index + `.${item.prop}`"
            :rules="{ required: true, message: item.label + '必填' }"
          >
            <!-- 选择select -->
            <el-select
              v-if="item.options && isCheck(item.value)"
              v-model="scope.row[item.prop]"
              :placeholder="`请选择` + item.label"
              clearable
            >
              <el-option
                v-for="ele in item.options"
                :key="ele.value"
                :label="ele.label"
                :value="ele.value"
              />
            </el-select>
            <!-- 输入input -->
            <el-input
              v-if="!item.options && isCheck(item.value)"
              v-model="scope.row[item.prop]"
              :placeholder="`请输入` + item.label"
            />
          </el-form-item>
          <!-- 未选中 select框  -->
          <p v-if="!isCheck(item.value) && item.options">
            {{
              item.options.find((ele) => ele.value === scope.row[item.prop])
                ?.label || ''
            }}
          </p>
          <!-- 未选中 input框 -->
          <p v-if="!isCheck(item.value) && !item.options">
            {{ scope.row[item.prop] }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, computed } from 'vue'
const formRef = ref(null)
// 定义chckbox选项
const checkboxOptions = [
  {
    label: 'SBOM编码',
    value: '1',
    prop: 'sbomCode',
  },
  {
    label: 'SBOM销售方式',
    value: '2',
    prop: 'sbomSale',
    options: [
      { label: '方式一', value: '1' },
      { label: '方式二', value: '2' },
    ],
  },
  {
    label: '销售渠道',
    value: '3',
    prop: 'sbomChanel',
  },
  {
    label: '海报图一',
    value: '4',
    prop: 'sbomPoster',
  },
]

// 定义表单数据
const formData = ref({
  type: [],
  tableData: [
    { name: 'zhangbo', age: 18, sbomCode: 'test1' },
    { name: 'zhangbo', age: 18, sbomCode: 'test2' },
  ],
})

// 判断是否被选中----对应显示不同的编辑组件
const isCheck = computed(() => (value) => formData.value.type.includes(value))

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 表单校验通过，执行提交逻辑
      console.log(formData.value, 'pp')
    } else {
      // 表单校验失败，提示用户
      return false
    }
  })
}
</script>
