import request from '@/utils/request'

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
 * 获取辅料信息
 */
export function getAdjuvantDetail(data) {
  return request({
    url: '/clAdjuvant/detail',
    method: 'get',
    params: data
  })
}