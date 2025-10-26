<template>
  <el-form
    :model="formData"
    label-width="auto"
    style="margin: auto; width: 90%"
    ref="formRef"
  >
    <el-form-item
      label="修改类型"
      prop="type"
      :rules="{ required: true, message: '修改类型必填' }"
    >
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
      <el-table-column label="SBOM编码">
        <template #default="scope">
          <el-form-item
            v-if="formData.type.includes('1')"
            :key="scope.$index"
            :prop="`tableData.${scope.$index}.sbomCode`"
            :rules="{
              required: true,
              message: '必填',
            }"
          >
            <el-input v-model="scope.row['sbomCode']" />
          </el-form-item>
          <p v-else>{{ scope.row['sbomCode'] }}</p>
        </template>
      </el-table-column>
      <template v-for="(item, index) in checkboxOptions.slice(1)">
        <el-table-column
          :label="item.label"
          v-if="formData.type.includes(item.value)"
        >
          <template #default="scope">
            <el-form-item
              :key="scope.$index"
              :prop="'tableData.' + scope.$index + `.${item.prop}`"
            >
              <!-- 选择select -->
              <el-select
                v-if="item.options"
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
                v-else
                v-model="scope.row[item.prop]"
                :placeholder="`请输入` + item.label"
              />
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from 'vue'
const formRef = ref(null)
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

const formData = ref({
  type: [],
  tableData: [{ sbomCode: '12580' }, { sbomCode: '12581' }],
})

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 处理不在修改类型中的字段为空字符串
      resetFields()
      // 表单校验通过，执行提交逻辑
      console.log(formData.value, 'pp')
    } else {
      // 表单校验失败，提示用户
      return false
    }
  })
}

// 根据修改类型重置表格字段 && 并且保留所有字段或者保留原值
const resetFields = () => {
  const selectedTypes = formData.value.type
  formData.value.tableData.forEach((row) => {
    checkboxOptions.forEach((ele) => {
      if (!selectedTypes.includes(ele.value) && ele.value !== '1') {
        row[ele.prop] = ''
      } else if (selectedTypes.includes(ele.value)) {
        row[ele.prop] = row[ele.prop] || '' // 保持原值不变
      }
    })
  })
}
</script>
