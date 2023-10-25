import request from '@/utils/request'

const userRegisterApi = {
    Register: '/user/register'
}

export function register(parameter) {
    return request({
        url: userRegisterApi.Register,
        method: 'post',
        data: parameter
    })
}
