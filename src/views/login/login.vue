<template>
    <div class="container">
        <a-row>
            <a-col :span="15">
                <a-image :preview="false"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </a-col>
            <a-col :span="8">
                <a-form class="loginForm" ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

                    <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                        <a-input v-model:value="formState.username" />
                    </a-form-item>

                    <a-form-item label="密 码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 4 }">
                        <a-checkbox class="remember-button" v-model:checked="formState.remember">记住密码</a-checkbox>
                        <router-link class="register-link" :to="{ name: 'register' }">新用户注册</router-link>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 4 }">
                        <a-button class="login" type="primary" html-type="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :span="1"></a-col>
        </a-row>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { login } from '../../api/login'
import md5 from 'md5'
import { validateFields, validateFieldsKey } from 'ant-design-vue/es/form'
import store from '../../store/index'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const formRef = ref(null)
const formState = reactive({
    username: '',
    password: '',
    remember: true
})
const onFinish = values => {
    console.log('Success:', values)
    // 校验参数
    formRef.value.validate().then(async () => {
        console.log('login form', values)
        // 处理登录参数
        const loginParams = { ...values }
        delete loginParams.remember
        loginParams.password = md5(values.password)
        console.log('aaaaaa', loginParams)
        //执行登录
        login(loginParams)
            .then((res) => loginSuccess(res))
            .catch(err => requestFailed(err))
            .finally(() => {
                // state.loginBtn = false
                console.log('finally')
            })
    })
}
const requestFailed = (err) => {
    console.log('requestFailed', err)
    message.error('登录错误，请重试1')
}
const onFinishFailed = errorInfo => {
    message.error('登录错误，请重试2')
}

const loginSuccess = (res) => {
    console.log('the login result is :' + JSON.stringify(res))
    // 保存角色信息
    window.localStorage.setItem('roles', res.role)
    router.push({ name: 'oneApi' })
}

</script>
<style>
.container .loginForm {
    margin-top: 50%;
}

.container .remember-button {
    width: 50%;
}

.container .login {
    width: 100%;
}

.container .register-link {
    float: right;
}
</style>