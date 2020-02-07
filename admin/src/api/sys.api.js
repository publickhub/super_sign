import request from '@/plugin/axios'


export function getSurplusUDID() {
  return request({
    url: '/getSurplusUDID',
    method: 'get'
  })
}

export function getExpiredAppCount() {
  return request({
    url: '/getExpiredAppCount',
    method: 'get'
  })
}

export function getAppCount() {
  return request({
    url: '/getAppCount',
    method: 'get'
  })
}

export function getDownloadSizeToday() {
  return request({
    url: '/getDownloadSizeToday',
    method: 'get'
  })
}

export function checkAppleIdStatu() {
  return request({
    url: '/checkAppIdCer',
    method: 'post'
  })
}


export function getSysInfo() {
  return request({
    url: '/getSysInfo',
    method: 'get'
  })
}


export function getSRAppInfoList(data) {
  return request({
    url: '/getAppInfoList',
    method: 'get',
    data
  })
}

export function getUserInfoList(account, beginTime, endTime, size, num) {
  return request({
    url: '/getUserInfoList',
    method: 'get',
    params: { account, beginTime, endTime, size, num }
  })
}

export function updateUserStatu(id, statu) {
  return request({
    url: '/changeAccountStatu',
    method: 'post',
    data: { id, statu }
  })
}

export function updateUserMaxUdid(id, udid) {
  return request({
    url: '/changeUserMaxUdid',
    method: 'post',
    data: { id, udid }
  })
}

export function updateUserAmount(id, amount) {
  return request({
    url: '/changeUserAmount',
    method: 'post',
    data: { id, amount }
  })
}

export function getRechargeInfoList(account, beginTime, endTime, size, num) {
  return request({
    url: '/getRechargeInfo',
    method: 'get',
    params: { account, beginTime, endTime, size, num }
  })
}

export function getAppInfoList(account, beginTime, endTime, size, num, appName) {
  return request({
    url: '/getAppInfoListAdmin',
    method: 'get',
    params: { account, beginTime, endTime, size, num, appName }
  })
}

export function getApkInfoList(account, beginTime, endTime, size, num, appName) {
  return request({
    url: '/getApkInfoListAdmin',
    method: 'get',
    params: { account, beginTime, endTime, size, num, appName }
  })
}


export function updateAppStatu(id, statu) {
  return request({
    url: '/setAppStatuAdmin',
    method: 'post',
    data: { id, statu }
  })
}

export function updateApkStatu(id, statu) {
  return request({
    url: '/setApkStatuAdmin',
    method: 'post',
    data: { id, statu }
  })
}

export function getBusAppInfoList(account, beginTime, endTime, size, num, appName) {
  return request({
    url: '/getBusAppInfoListAdmin',
    method: 'get',
    params: { account, beginTime, endTime, size, num, appName }
  })
}

export function getUseableBusAppInfoList() {
  return request({
    url: '/getUsableBusAccountInfoList',
    method: 'get',
    params: { }
  })
}


export function updateBusAppExpiredTime(id, time) {
  return request({
    url: '/setBusAppExpiredTime',
    method: 'post',
    data: { id, time }
  })
}

export function getUDIDInfoList(udid, beginTime, endTime, size, num, appleId) {
  return request({
    url: '/getUDIDInfoListAdmin',
    method: 'get',
    params: { udid, beginTime, endTime, size, num, appleId }
  })
}

export function updateUDIDStatu(id, statu) {
  return request({
    url: '/changeUDIDStatuAdmin',
    method: 'post',
    data: { id, statu }
  })
}

export function getAppleIdInfoList(account, beginTime, endTime, size, num) {
  return request({
    url: '/getAppIdInfoList',
    method: 'get',
    params: { account, beginTime, endTime, size, num }
  })
}

export function updateAppleIdStatu(id, statu) {
  return request({
    url: '/setAppIdStatu',
    method: 'post',
    data: { id, statu }
  })
}

export function updateAppleIdErrorStatu(id) {
  return request({
    url: '/setAppIdErrorStatu',
    method: 'post',
    data: { id }
  })
}


export function getBusAccountInfoList(account, beginTime, endTime, size, num) {
  return request({
    url: '/getBusAccountInfoList',
    method: 'get',
    params: { account, beginTime, endTime, size, num }
  })
}

export function updateBusAccountStatu(id, statu) {
  return request({
    url: '/changeBusAccountStatu',
    method: 'post',
    data: { id, statu }
  })
}

export function updateBusAccountTip(id, tip) {
  return request({
    url: '/changeBusAccountTip',
    method: 'post',
    data: { id, tip }
  })
}

export function addBusAccount(p12Path, mpPath, tip, password) {
  return request({
    url: '/addBusAccount',
    method: 'post',
    data: { p12Path, mpPath, tip, password }
  })
}

export function updateSysCoinConfig(coin_name, coin_to_udid, coin_to_resign, coin_to_update,coin_to_dcount) {
  return request({
    url: '/updateSysCoinConfig',
    method: 'post',
    data: { coin_name, coin_to_udid, coin_to_resign, coin_to_update,coin_to_dcount }
  })
}

export function updateSysUsConfig(kf_qq_info, kf_weixin_info, kf_phone_info) {
  return request({
    url: '/updateSysUsConfig',
    method: 'post',
    data: { kf_qq_info, kf_weixin_info, kf_phone_info }
  })
}

export function getResignAppList(cer_id) {
  return request({
    url: '/getResignAppList',
    method: 'get',
    data: { cer_id }
  })
}



export function getSysConfig() {
  return request({
    url: '/getSysConfig',
    method: 'get'
  })
}


export function addAppleId(account, pwd, tip,code,bundle) {
  return request({
    url: '/registerAppId',
    method: 'post',
    data: { account, pwd, tip,code,bundle}
  })
}

//删除用户
export function delUserInfo(id) {
  return request({
    url: '/delUserInfo',
    method: 'post',
    data: { id}
  })
}

//删除app

export function delAppInfo(id) {
  return request({
    url: '/delAppInfo',
    method: 'post',
    data: { id}
  })
}

export function delApkInfo(id) {
  return request({
    url: '/delApkInfo',
    method: 'post',
    data: { id}
  })
}

//删除appId
export function delAppIdInfo(id) {
  return request({
    url: '/delAppIdInfo',
    method: 'post',
    data: { id}
  })
}

//一键重签名

export function resignIpaList(id,cer_id) {
  return request({
    url: '/resignIpaList',
    method: 'post',
    data: { id,cer_id}
  })
}


