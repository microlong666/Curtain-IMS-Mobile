import request from '@/utils/request'

/**
 * 获取导轨信息
 */
export function getTrackList(data) {
  return request({
    url: '/clTrack/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取成品帘信息
 */
export function getCurtainList(data) {
  return request({
    url: '/clCurtain/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取主布信息
 */
export function getMainFabricList(data) {
  return request({
    url: '/clMainFabric/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取里布信息
 */
export function getInsideFabricList(data) {
  return request({
    url: '/clInsideFabric/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取窗纱信息
 */
export function getSheerList(data) {
  return request({
    url: '/clSheerCurtain/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取配件信息
 */
export function getAccessoryList(data) {
  return request({
    url: '/clAccessory/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取辅料信息
 */
export function getAdjuvantList(data) {
  return request({
    url: '/clAdjuvant/list',
    method: 'get',
    params: data
  })
}

/**
 * 获取导轨信息
 */
export function getTrackDetail(data) {
  return request({
    url: '/clTrack/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取导轨信息
 */
export function getTrackInfo(data) {
  return request({
    url: '/clTrack/info',
    method: 'get',
    params: data
  })
}

/**
 * 获取成品帘信息
 */
export function getCurtainDetail(data) {
  return request({
    url: '/clCurtain/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取主布信息
 */
export function getMainFabricDetail(data) {
  return request({
    url: '/clMainFabric/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取里布信息
 */
export function getInsideFabricDetail(data) {
  return request({
    url: '/clInsideFabric/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取窗纱信息
 */
export function getSheerDetail(data) {
  return request({
    url: '/clSheerCurtain/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取配件信息
 */
export function getAccessoryDetail(data) {
  return request({
    url: '/clAccessory/detail',
    method: 'get',
    params: data
  })
}

/**
 * 获取辅料信息
 */
export function getAdjuvantDetail(data) {
  return request({
    url: '/clAdjuvant/detail',
    method: 'get',
    params: data
  })
}
