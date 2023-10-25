<template>
    <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-descriptions :title="item.name">
                    <a-descriptions-item label="域名">{{ item.domain }}</a-descriptions-item>
                    <a-descriptions-item label="路径">{{ item.path }}</a-descriptions-item>
                    <a-descriptions-item label="描述">{{ item.description }}</a-descriptions-item>
                </a-descriptions>
                <a-button type="primary" @click="onClick(item)">查看详情</a-button>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup >
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { getAllInterface } from '@/api/interface'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const data = ref()

// 加载表单数据
const loadData = async () => {
    try {
        const response = await getAllInterface() // 调用封装的方法
        data.value = response
    } catch (error) {
        console.error(error)
    }
}

const onClick = (item) => {
    // 跳转到详情页
    console.log('xxxxxxxxxx', item.id)
    router.push({
        path: '/oneApi/interfaceInfo/userInterfaceDetail',
        query: {
            id: item.id
        }
    })
}




onMounted(() => {
    loadData()
})

</script>