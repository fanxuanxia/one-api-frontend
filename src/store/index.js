import { createStore } from 'vuex'

const store = createStore({
    state: {
        session: null// 初始化为 null 或者从其他地方获取初始值
    },
    mutations: {
        setSession(state, session) {
            console.log('保存session :', session)
            state.session = session
        }
    }
})

export default store