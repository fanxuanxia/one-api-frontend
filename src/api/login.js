import request from '@/utils/request'

const userApi = {
    Login: '/user/login',
    Logout: '/user/logout',
    ForgePassword: '/auth/forge-password',
    // get my info
    UserInfo: '/user/info',
    UserMenu: '/user/nav'
}
export function login(parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}