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

/**
 * 获取订单统计
 */
export function getOrderCount() {
  return request({
    url: '/clOrder/count',
    method: 'get'
  })
}

/**
 * 更新价格
 */
export function updatePrice(data) {
  return request({
    url: '/clOrder/price',
    method: 'get',
    params: data
  })
}

/**
 * 订单详情
 */
export function getDetail(data) {
  return request({
    url: '/clOrder/detail',
    method: 'get',
    params: data
  })
}

/**
 * 订单位置
 */
export function getOrderDetail(data) {
  return request({
    url: '/clOrderDetail/listBy',
    method: 'get',
    params: data
  })
}

/**
 * 订单物料
 */
export function getOrderItems(data) {
  return request({
    url: '/clOrderItem/listBy',
    method: 'get',
    params: data
  })
}

/**
 * 订单记录
 */
export function getOrderVersion(data) {
  return request({
    url: '/clOrderVersion/content',
    method: 'get',
    params: data
  })
}

/**
 * 修改订单
 */
export function editOrder(data) {
  return request({
    url: '/clOrder/editItem',
    method: 'post',
    data
  })
}

/**
 * 删除订单
 */
export function deleteOrder(data) {
  return request({
    url: '/clOrder/delete',
    method: 'post',
    data
  })
}