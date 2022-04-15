import request from '@/utils/request'

/**
 * 获取单个客户信息
 */
export function getOrderList(data) {
    return request({
        url: '/clOrder/list',
        method: 'get',
        params: data
    })
}