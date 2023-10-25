import request from '@/utils/request'

const api = {
    allInterface: '/interfaceInfo/getAllApi',
    interfaceInfo: '/interfaceInfo/getApi',
    interfaceDetail: '/interfaceInfo/detail',
    add: '/interfaceInfo/add',
    modify: '/interfaceInfo/modify',
    online: '/interfaceInfo/onlineInterface',
    offline: '/interfaceInfo/offlineInterface',
    invoke: '/interfaceInfo/invoke'
}

export default api

export function getAllInterface() {
    return request({
        url: api.allInterface,
        method: 'get'
    })
}

export function getInterfaceInfo(parameter) {
    return request({
        url: api.interfaceInfo,
        method: 'get',
        parameter: parameter
    })
}

export function getInterfaceDetail(parameter) {
    console.log('detail' + JSON.stringify(parameter))
    return request({
        url: api.interfaceDetail,
        method: 'get',
        params: parameter
    })
}

export function addInterfaceInfo(parameter) {
    return request({
        url: api.add,
        method: 'post',
        data: parameter
    })
}

export function modifyInterfaceInfo(parameter) {
    return request({
        url: api.modify,
        method: 'post',
        data: parameter
    })
}

export function onlineInterfaceInfo(parameter) {
    return request({
        url: api.online,
        method: 'post',
        data: parameter
    })
}

export function offlineInterface(parameter) {
    return request({
        url: api.offline,
        method: 'post',
        data: parameter
    })
}

export function invokeInterface(parameter) {
    return request({
        url: api.invoke,
        method: 'post',
        data: parameter
    })
}

