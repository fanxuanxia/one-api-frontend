<template>
    <div class="main user-layout-register">

        <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }"
            autocomplete="off" @finish="handleSubmit" @finishFailed="onFinishFailed">

            <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item label="输入密码" name="password"
                :rules="[{ required: true, message: '请输入密码' }, { validator: validatePassword }]">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item label="确认密码" name="confirmPassword"
                :rules="[{ required: true, message: '请确认密码' }, { validator: validateConfirmPassword }]">
                <a-input-password v-model:value="formState.confirmPassword" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
                <a-button class="register-button" type="primary" html-type="submit">注册</a-button>
                <router-link class="login" :to="{ name: 'login' }">注册完成，去登录</router-link>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import { useForm } from 'ant-design-vue/es/form'
import { reactive, onMounted, ref, toRaw, registerRuntimeCompiler } from 'vue'
import { message } from 'ant-design-vue'
import { scorePassword } from '../../utils/util'
import md5 from 'md5'
import { register } from '../../api/register'
import { useRouter } from 'vue-router'
const router = useRouter()
const formRef = ref()
const formState = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})

const state = {
    time: 60,
    level: 0,
    smsSendBtn: false,
    passwordLevel: 0,
    passwordLevelChecked: false,
    percent: 10,
    progressColor: '#FF0000'
}
const validatePassword = (_, value) => {
    if (!value) {
        return Promise.reject(new Error('请输入密码'))
    }
    if (value.length < 8) {
        return Promise.reject(new Error('密码长度不能少于8个字符'))
    }
    return Promise.resolve()
}

const validateConfirmPassword = (_, value) => {
    if (!value) {
        return Promise.reject(new Error('请确认密码'))
    }
    if (value !== formState.password) {
        return Promise.reject(new Error('两次输入的密码不一致'))
    }
    return Promise.resolve()
}

const handleSubmit = () => {
    formRef.value.validate().then(async () => {
        console.log('xcvb')
        console.log('values', toRaw(formState))
        const params = {
            account: formState.username,
            password: md5(formState.password)
        }
        const response = await register(params)
        console.log('response' + JSON.stringify(response))
        if (response.id > 0) {
            router.push({ name: 'registerResult' })
        } else {
            message.error('注册失败')
        }
    })
        .catch(error => {
            console.log('error', error)
        })
}
const resetForm = () => {
    formRef.value.resetFields()
}
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
}
</script>
<style >
.user-register.error {
    color: #ff0000;
}

.user-register.warning {
    color: #ff7e05;
}

.user-register.success {
    color: #52c41a;
}

.user-layout-register .ant-input-group-addon:first-child {
    background-color: #fff;
}

.user-layout-register {
    margin-top: 120px;
}

.user-layout-register>h3 {
    font-size: 26px;
    margin-bottom: 20px;
}

.user-layout-register .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
}

.user-layout-register .register-button {
    width: 50%;
}

.user-layout-register .login {
    float: right;
    line-height: 40px;
}
</style>