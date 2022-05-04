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

/**
 * 添加供应商
 */
export function addSupplier(data) {
  return request({
    url: '/clSupplier/addItem',
    method: 'post',
    data
  })
}

/**
 * 修改供应商
 */
export function editSupplier(data) {
  return request({
    url: '/clSupplier/editItem',
    method: 'post',
    data
  })
}

/**
 * 删除供应商
 */
export function deleteSupplier(data) {
  return request({
    url: '/clSupplier/delete',
    method: 'post',
    data
  })
}
