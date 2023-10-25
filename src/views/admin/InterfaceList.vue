<template>
  <div>
    <a-button type="primary" @click="visible = true">新建</a-button>
    <a-modal v-model:visible="visible" :title="isEditing ? '修改接口信息' : '新增接口信息'" :ok-text="isEditing ? '确认修改' : '创建'"
      cancel-text="取消" @ok="onOk">
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item name="name" label="用例名称" :rules="[{ required: true, message: 'Please input the name!' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item name="description" label="接口描述">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        <a-form-item name="domain" label="域名" :rules="[{ required: true, message: 'Please input domain' }]">
          <a-input v-model:value="formState.domain" />
        </a-form-item>
        <a-form-item name="method" label="方法" :rules="[{ required: true, message: 'Please input the method!' }]">
          <a-select ref="select" v-model:value="formState.method" @focus="focus" @change="handleChange">
            <a-select-option value="get">GET</a-select-option>
            <a-select-option value="post">POST</a-select-option>
            <a-select-option value="put">PUT</a-select-option>
            <a-select-option value="delete">DELETE</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item name="path" label="路径">
          <a-input v-model:value="formState.path" />
        </a-form-item>
        <a-form-item name="headers" label="请求头">
          <a-input v-model:value="formState.headers" />
        </a-form-item>
        <a-form-item name="requestParams" label="请求参数示例">
          <a-input v-model:value="formState.requestParams" />
        </a-form-item>
        <a-form-item name="responseParams" label="响应头">
          <a-input v-model:value="formState.responseHeaders" />
        </a-form-item>

      </a-form>
    </a-modal>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-row>
            <a-col :span="8">
              <a-button type="link" @click="onModify(record)">修改</a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="link" :disabled="record.status === 'ON'" @click="onPublish(record)">上线</a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="link" :disabled="record.status === 'OFF'" @click="onOffline(record)">下线</a-button>
            </a-col>
          </a-row>

        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { defineComponent, ref, reactive, onMounted, toRaw } from 'vue'
import * as interfaces from '@/api/interface'
import { message } from 'ant-design-vue'
// 列信息
const columns = [{
  title: 'id',
  width: 50,
  dataIndex: 'id',
  key: 'id'
}, {
  title: '接口名称',
  width: 100,
  dataIndex: 'name',
  key: 'name'
}, {
  title: '接口描述',
  dataIndex: 'description',
  key: 'description',
  width: 150
}, {
  title: '域名',
  dataIndex: 'domain',
  key: 'domain',
  width: 150
},
{
  title: '方法',
  dataIndex: 'method',
  key: 'method',
  width: 100
}, {
  title: '路径',
  dataIndex: 'path',
  key: 'path',
  width: 150
}, {
  title: '请求头',
  dataIndex: 'headers',
  key: 'headers',
  width: 150
}, {
  title: '请求参数',
  dataIndex: 'requestParams',
  key: 'requestParams',
  width: 150
}, {
  title: '响应头',
  dataIndex: 'responseHeaders',
  key: 'responseHeaders',
  width: 150
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  width: 100
}, {
  title: '操作',
  key: 'operation',
  width: 200
}]
const formRef = ref()
// 创建表单可见
const visible = ref(false)
// 记录要修改的id
let currentId = null
const formState = reactive({
  name: '',
  description: '',
  domain: '',
  method: '',
  path: '',
  headers: null,
  requestParams: null,
  responseHeaders: null
})

// 表单数据源
const data = ref([{}])
// 当前是修改还是新增
const isEditing = ref(false)

const onOk = () => {
  formRef.value.validateFields().then(values => {
    let response = null
    if (isEditing.value) {
      // 如果是修改的话，再拼接一下id参数
      values = {
        id: currentId,
        ...values
      }
      // 调用修改接口
      response = interfaces.modifyInterfaceInfo(values)
    } else {
      // 调用新增接口
      response = interfaces.addInterfaceInfo(values)
    }
    // 重新加载数据
    loadData()
    message.success(isEditing.value ? '修改成功' : '创建成功')

    // 数据清空
    isEditing.value = false
    visible.value = false
    formRef.value.resetFields()
  }).catch(info => {
    console.log('sdfgbn')
  })
}

// 加载表单数据
const loadData = async () => {
  try {
    const response = await interfaces.getAllInterface() // 调用封装的方法
    data.value = response
  } catch (error) {
    console.error(error)
  }
}

// 点击修改按钮
const onModify = (record) => {
  visible.value = true
  Object.assign(formState, record)
  isEditing.value = true
  currentId = record.id
}

// 点击上线
const onPublish = async (record) => {
  const params = {
    id: record.id
  }
  try {
    const response = await interfaces.onlineInterfaceInfo(params) // 调用封装的方法
    if (response.status === 'ON') {
      message.success('接口发布成功！')
      loadData()
    } else {
      message.error('接口发布失败，请重试')
    }
  } catch (error) {
    console.error(error)
  }
}

// 点击下线
const onOffline = async (record) => {
  const params = {
    id: record.id
  }
  try {
    const response = await interfaces.offlineInterface(params)
    if (response.status === 'OFF') {
      message.success('接口已下线！')
      loadData()
    } else {
      message.error('接口下线失败')
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadData()
})
</script>