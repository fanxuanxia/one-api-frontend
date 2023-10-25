import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/login/register.vue')
        },
        {
            path: '/registerResult',
            name: 'registerResult',
            component: () => import('../views/login/RegisterResult.vue')
        },
        {
            path: '/NoAuth',
            name: 'NoAuth',
            component: () => import('../views/login/NoAuth.vue')
        },
        {
            path: '/oneApi',
            name: 'oneApi',
            meta: { requireAuth: true },
            component: () => import('../layout/BaseLayout.vue'),
            // 定义嵌套路由
            children: [
                {
                    path: '/oneApi/admin',
                    name: '管理员专用',
                    icon: MenuUnfoldOutlined,
                    meta: { key: 'admin', requireAuth: false, visiable: false, roles: ['admin'] },
                    children: [
                        {
                            path: '/oneApi/admin/interfaceManager',
                            name: '接口管理',
                            component: () => import('../views/admin/InterfaceList.vue'),
                            meta: { key: 'admin1', requireAuth: false, visiable: true, roles: ['admin'] }
                        },
                        {
                            path: '/oneApi/admin/memberManagement',
                            name: '成员管理',
                            component: () => import('../views/admin/Member.vue'),
                            meta: { key: 'admin2', requireAuth: false, visiable: true, roles: ['admin'] }
                        }
                    ]
                },
                {
                    path: '/oneApi/interfaceInfo',
                    name: '开放接口',
                    icon: MenuUnfoldOutlined,
                    meta: { key: 'interface', requireAuth: false, visiable: false, roles: ['admin', 'member'] },
                    children: [
                        {
                            path: '/oneApi/interfaceInfo/userInterface',
                            name: '接口列表',
                            component: () => import('../views/InterfacePage/UserInterface.vue'),
                            meta: { key: 'interface1', requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        },
                        {
                            path: '/oneApi/interfaceInfo/userInterfaceDetail',
                            name: '接口详情',
                            component: () => import('../views/InterfacePage/Detail.vue'),
                            meta: { key: 'interface1', requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        }
                    ]
                },
                {
                    path: '/oneApi/test',
                    name: '测试',
                    icon: MenuUnfoldOutlined,
                    // component: () => import('../views/test/testProject.vue'),
                    meta: { requireAuth: false, visiable: false, roles: ['admin', 'member'] },
                    children: [
                        {
                            path: '/oneApi/test/debug',
                            name: '接口调试',
                            component: () => import('../views/test/testDebug.vue'),
                            meta: { requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        },
                        {
                            path: '/oneApi/test/project',
                            name: '项目管理',
                            component: () => import('../views/test/testProject.vue'),
                            meta: { requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        },
                        {
                            path: '/oneApi/test/Case',
                            name: '用例列表',
                            component: () => import('../views/test/testCase.vue'),
                            meta: { requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        }
                    ]
                },
                {
                    path: '/oneApi/bi',
                    name: '数据统计报表',
                    icon: MenuUnfoldOutlined,
                    meta: { requireAuth: false, visiable: false, roles: ['admin', 'member'] },
                    children: [
                        {
                            path: '/oneApi/bi',
                            name: '统计报表',
                            component: () => import('../views/bi/bi.vue'),
                            meta: { requireAuth: false, visiable: true, roles: ['admin', 'member'] }
                        }
                    ]
                }
            ]
        }
    ]
})

// 定义全局前置守卫
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const hasCookie = await checkAuthCookie()// 使用异步函数检查cookie
        if (hasCookie) {
            next()
        } else {
            next('/login')
        }
    }
})

async function checkAuthCookie() {
    // 使用第三方库（如js-cookie）检查cookie，并返回一个Promise
    return true
}

async function getUserRole() {
    // 使用异步操作从localStorage中获取用户角色，并返回一个Promise
    return window.localStorage.getItem('roles')
}

export default router