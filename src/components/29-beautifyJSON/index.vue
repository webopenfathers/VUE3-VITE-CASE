<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs">
    <!-- 操作按钮和提示信息 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleValidate">校验</el-button>
        <el-text size="large" style="margin: 0 10px" type="primary"
          >application/json</el-text
        >
        <el-text size="large" class="mx-1" type="success" v-if="validResult"
          ><el-icon color="green"><CircleCheck /></el-icon
        ></el-text>
        <el-text size="large" v-else class="mx-1" type="danger">
          <el-icon color="red"><CircleClose /></el-icon> error:{{
            error
          }}</el-text
        >
      </el-col>
    </el-row>
    <!-- 请求Header -->
    <el-tab-pane label="请求Header" name="first">
      <el-input
        @input="handleValidate"
        v-model="jsonData"
        style="width: 100%; font-size: 16px"
        :autosize="{ minRows: 20, maxRows: 20 }"
        type="textarea"
        placeholder="Please input"
      />
    </el-tab-pane>
    <!-- 请求body -->
    <el-tab-pane label="请求body" name="second">
      <el-input
        @input="handleValidate"
        v-model="jsonData"
        style="width: 100%; font-size: 16px"
        :autosize="{ minRows: 20, maxRows: 20 }"
        type="textarea"
        placeholder="Please input"
      />
    </el-tab-pane>
    <!-- 保存 -->
    <el-row justify="center" align="middle">
      <el-button type="primary" :disabled="!validResult" @click="saveJSON"
        >保存</el-button
      >
    </el-row>
  </el-tabs>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'

const activeName = ref('first')
// 校验结果
const validResult = ref(false)
const error = ref('')
// 美化后的JSON数据
const jsonData = ref({})
// 模拟的JSON数据
const resultVo = {
  user: {
    userId: 1001,
    username: 'john_doe',
    email: 'john.doe@example.com',
    isPremiumMember: true,
    registrationDate: '2020-08-15T09:34:22Z',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-23',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
      },
      contact: {
        phone: '+1-555-123-4567',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+1-555-987-6543',
        },
      },
    },
    orders: [
      {
        orderId: 'A1B2C3D4E5',
        orderDate: '2025-05-25T14:21:00Z',
        status: 'Shipped',
        items: [
          {
            productId: 5001,
            productName: 'Wireless Bluetooth Headphones',
            quantity: 1,
            price: 89.99,
            discount: 0.1,
            totalPrice: 80.99,
          },
          {
            productId: 5002,
            productName: 'Smart Watch Fitness Tracker',
            quantity: 1,
            price: 129.99,
            discount: 0.05,
            totalPrice: 123.49,
          },
        ],
        shipping: {
          method: 'Express',
          trackingNumber: 'XYZ123456789',
          estimatedDelivery: '2025-05-28T10:00:00Z',
        },
        payment: {
          paymentId: 'PAY_001',
          method: 'Credit Card',
          amount: 204.48,
          currency: 'USD',
          transactionStatus: 'Completed',
        },
      },
      {
        orderId: 'F6G7H8I9J0',
        orderDate: '2025-05-20T08:12:00Z',
        status: 'Delivered',
        items: [
          {
            productId: 5003,
            productName: 'E-Reader with Backlight',
            quantity: 1,
            price: 149.99,
            discount: 0.0,
            totalPrice: 149.99,
          },
        ],
        shipping: {
          method: 'Standard',
          trackingNumber: 'ABC987654321',
          estimatedDelivery: '2025-05-24T10:00:00Z',
        },
        payment: {
          paymentId: 'PAY_002',
          method: 'PayPal',
          amount: 149.99,
          currency: 'USD',
          transactionStatus: 'Completed',
        },
      },
    ],
  },
}

// 初始化数据,美化json并校验json
onMounted(() => {
  jsonData.value = JSON.stringify(resultVo, null, 3)
  handleValidate()
})

// 校验JSON格式
const handleValidate = () => {
  try {
    JSON.parse(jsonData.value)
    validResult.value = true
  } catch (e) {
    console.log('JSON校验失败:', e)
    validResult.value = false

    // 提取错误信息
    const errorMessage = e.message.split(' at ')[0] // 去除 "at position ..." 部分
    // 提取 position 并解析行号列号
    const match = e.message.match(/position (\d+)/)
    const position = match ? parseInt(match[1], 10) : -1

    let errorMsg = errorMessage // 只保留核心错误信息

    if (position >= 0) {
      const lineInfo = getLineNumberFromPosition(jsonData.value, position)
      errorMsg += `\n位置: 第 ${lineInfo.line} 行`
    }
    error.value = errorMsg
  }
}

// 保存
const saveJSON = () => {
  const params = JSON.parse(jsonData.value)
  console.log(params)
}

// ✅ 精准计算行号列号
function getLineNumberFromPosition(str, pos) {
  let line = 1
  let column = 1

  for (let i = 0; i < pos && i < str.length; i++) {
    if (str[i] === '\n') {
      line++
      column = 1
    } else {
      column++
    }
  }

  return { line, column }
}
</script>

<style></style>
