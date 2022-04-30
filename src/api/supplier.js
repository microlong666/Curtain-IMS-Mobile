import request from '@/utils/request'

/**
 * 获取供应商列表
 */
export function getSupplierList(data) {
  return request({
    url: '/clSupplier/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取供应商详情
 */
export function getSupplierDetail(data) {
  return request({
    url: '/clSupplier/detail',
    method: 'get',
    params: data
  })
}
