import axios from 'axios'
import store from '../store/index'
import { commentProps } from 'ant-design-vue/es/comment'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
    baseURL = process.env.VUE_APP_API_BASE_URL
} else if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.VUE_APP_API_BASE_URL
}
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: baseURL,
    timeout: 6000 // 请求超时时间
})

// 请求拦截器
// request.interceptors.request.use((config) => {
//     const { session } = store.state
//     if (session) {
//         config.headers.Cookie = session // 将 Session 赋值给 Cookie 请求头
//         console.log('add cookie:' + session)
//     }
//     return config
// })


request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('拦截请求', JSON.stringify(response.headers))
    // const session = response.headers['set-Cookie']// 获取响应头中的 cookie 值
    // if (session) {
    //     const expirationDate = new Date()
    //     expirationDate.setDate(expirationDate.getDate() + 7) // 设置过期时间为7天

    //     const sessionData = {
    //         value: session,
    //         expires: expirationDate.getTime() // 将过期时间转换为时间戳
    //     }

    //     store.commit('setSession', sessionData) // 调用 Vuex 的 Mutation 保存 Session 到 Vuex 的状态
    // }

    if (response.status === 200 && response.data.code === 200) {
        return response.data.result
    } else {
        reportError(response.data.msg)
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
})

export default request

export {
    request as axios
}
