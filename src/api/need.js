import request from '@/utils/request'

/**
 * 获取需求列表
 */
export function getNeedList(data) {
    return request({
        url: '/clNeed/list',
        method: 'get',
        params: data
    })
}

/**
 * 获取单个需求信息
 */
export function getNeedDetail(data) {
    return request({
        url: '/clNeed/detail',
        method: 'get',
        params: data
    })
}

/**
 * 获取需求列表
 */
export function getNeedCount() {
    return request({
        url: '/clNeed/count',
        method: 'get'
    })
}

/**
 * 添加需求
 */
export function addNeed(data) {
    return request({
        url: '/clNeed/addItem',
        method: 'post',
        data
    })
}

/**
 * 修改需求
 */
export function editNeed(data) {
    return request({
        url: '/clNeed/editItem',
        method: 'post',
        data
    })
}
