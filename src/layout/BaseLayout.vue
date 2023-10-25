<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo">接口测试平台</div>
            <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @click="handleClick" :open-keys="openKeys">
                <template v-for="item in menuList">
                    <!-- 有一级以上 -->
                    <a-sub-menu :title="item.name" :key="item.path" v-if="item.children != undefined && item.meta.visiable">
                        <template v-for="child in item.children">
                            <a-menu-item :key="child.path" v-if="child.meta.visiable">
                                <p class="ciclebox">
                                    <span> {{ child.name }}</span>
                                </p>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                <a-space class="userInfo">
                    <a-avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75fMcwMZZs5iiMS65U7edHGuQqxvbMjcHxMNoL4NtZA&s"></a-avatar>
                    <a-button type="link">fxxxx</a-button>
                    <a-button type="primary" @click="logout">退出</a-button>
                </a-space>

            </a-layout-header>
            <a-layout-content :style="{ margin: '20px 12px', padding: '12px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import router from '../router/index.js'
import { message } from 'ant-design-vue'

const MyRouter = useRouter()
//左侧菜单选中的key
const selectedKeys = ref(['/oneApi/interfaceInfo'])

//是否折叠侧边栏
const collapsed = ref(false)
const current = ref(MyRouter.path)
const openKeys = ref([]) //左侧展开的key
const menuList = ref([])


onMounted(() => {
    menuList.value = router.options.routes[5].children
    console.log(menuList, '一级菜单')
    const roles = window.localStorage.getItem('roles')
    menuList.value.forEach(element => {
        // 1- for 循环一级菜单
        // 2-找出角色 所在的 角色数组(判断某个值在不在 数组中)
        // 3- 然后 所在的数组 visiable 改为true ，其他的改为false
        if (element.meta.roles) {
            if (element.meta.roles.indexOf(roles) !== -1) {
                console.log('有此页面的权限')
                element.meta.visiable = true
            } else {
                console.log('没有此页面的权限')
                element.meta.visiable = false
            }
        }
    })
    console.log('after', JSON.stringify(menuList.value))
}
)

const handleClick = (e) => {
    //如果key为路由则跳转
    current.value = e.key
    console.log('key', e.key)
    if (e.key.indexOf('/') > -1) {
        console.log('yyyyyy')
        try {
            MyRouter.push(e.key)
        } catch (e) {
            console.log(e)
        }
    }
}

const logout = () => {
    console.log('logout')
    window.localStorage.clear()
    message.success('退出成功')
    MyRouter.push('/login')
}

</script>



<style scoped>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.userInfo {
    float: right;
    margin-right: 10px;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    color: white;
    text-align: center;
    line-height: 32px;
    font-size: 18px;

    overflow: hidden;

}

.site-layout .site-layout-background {
    background: #fff;
}
</style>