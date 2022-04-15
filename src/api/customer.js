import request from '@/utils/request'

/**
 * 获取单个客户信息
 */
export function getCustomerDetail(data) {
  return request({
    url: '/clCustomer/detail',
    method: 'get',
    params: data
  })
}

/**
 * 修改客户
 */
export function editCustomer(data) {
  return request({
    url: '/clCustomer/editItem',
    method: 'post',
    data
  })
}