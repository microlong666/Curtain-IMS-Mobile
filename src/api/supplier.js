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
