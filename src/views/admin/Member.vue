<template>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column }">
            <template v-if="column.key === 'operation'">
                <a>action</a>
            </template>
        </template>
    </a-table>
</template>
<script setup>
import { ref } from 'vue'
const columns = [
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1'
    },
    {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100
    }
]
const data = ref([{}])

</script>