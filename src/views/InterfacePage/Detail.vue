<template>
    <div>
        <a-card title="接口信息">
            <p>接口名称：{{ hh.name }}</p>
            <p>接口描述：{{ hh.description }}</p>
            <p>域名：{{ hh.domain }}</p>
            <p>方法：{{ hh.method }}</p>
            <p>路径：{{ hh.path }}</p>
            <p>请求头：{{ hh.headers }}</p>
            <p>Params：{{ hh.requestParams }}</p>
            <!-- <p>requestBody：{{ hh.requestBody }}</p> -->
            <p>响应头：{{ hh.responseHeaders }}</p>
        </a-card>
        <br>
        <a-card title="填写请求参数">
            <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

                <a-form-item label="Params" name="userRequestParams">
                    <a-input v-model:value="formState.userRequestParams" placeholder="此处填写requestParams" />
                </a-form-item>

                <a-form-item label="requestBody" name="userRequestBody">
                    <a-input v-model:value="formState.userRequestBody" placeholder="此处填写requestBody" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit">发起调用</a-button>
                </a-form-item>
            </a-form>
        </a-card>
        <br>
        <a-card title="调用结果" v-if="flag">
            <a-textarea v-model:value="result" placeholder="Basic usage" :rows="4" />
        </a-card>
    </div>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { getInterfaceDetail, invokeInterface } from '@/api/interface'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.query.id
const hh = ref({}) // 使用 ref 创建响应式对象
const result = ref('')

const getDetail = async () => {
    const queryData = {
        id: id
    }
    const response = await getInterfaceDetail(queryData)
    hh.value = response // 更新 hh 的值
}

onMounted(() => {
    getDetail()
})

const flag = ref(false)
const formState = reactive({
    userRequestParams: null,
    userRequestBody: null
})
const onFinish = async values => {
    const params = {
        interfaceId: id,
        ...values
    }
    const response = await invokeInterface(params)
    flag.value = true
    result.value = JSON.stringify(response)
    console.log('Success:', JSON.stringify(response))
}
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
}

</script>
