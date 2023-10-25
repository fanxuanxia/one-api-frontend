<template>
  <a-result status="success" title="注册成功">

    <template #extra>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">去登陆</a-button>
    </template>

  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goHomeHandle = () => {
  router.push({ name: 'login' })
}

</script>

<style scoped></style>
