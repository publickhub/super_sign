import request from '@/plugin/axios'


/////新版
export function getCaptchRegister(phone) {
  return request({
    url: '/captchCodeForRegister',
    method: 'get',
    params: { phone }
  })
}

export function insertUserInfo(account, password) {
  return request({
    url: '/registerUser',
    method: 'post',
    data: { account, password}
  })
}

export function getCaptchFindPwd(account) {
  return request({
    url: '/captchCodeForFindPwd',
    method: 'get',
    params: { account }
  })
}

export function updateUserPassword(account, password, captchCode) {
  return request({
    url: '/findPassword',
    method: 'post',
    data: {  account, password, captchCode }
  })
}


export function getAppInfoList(beginTime, endTime, size, num, appName,type) {
  return request({
    url: '/getAppInfoListUser',
    method: 'get',
    params: {  beginTime, endTime, size, num, appName,type }
  })
}

export function getApkInfoList(beginTime, endTime, size, num, appName) {
  return request({
    url: '/getAndroidAppInfoListUser',
    method: 'get',
    params: {  beginTime, endTime, size, num, appName }
  })
}

export function getRelatedAppInfoListUser( size, num) {
  return request({
    url: '/getRelatedAppInfoListUser',
    method: 'get',
    params: {   size, num }
  })
}

export function updateAppReleatedUser(id, appid) {
  return request({
    url: '/updateReleatedApp',
    method: 'post',
    data: { id, appid }
  })
}

export function updateAppIntroduceInfo(id, introduce,introduce_image) {
  return request({
    url: '/updateAppIntroduceInfo',
    method: 'post',
    data: { id, introduce,introduce_image }
  })
}

export function updateIpaIntroduceInfo(id, introduce,introduce_image) {
  return request({
    url: '/updateIOSAppIntroduceInfo',
    method: 'post',
    data: { id, introduce,introduce_image }
  })
}



export function updateAppStatuUser(id, statu) {
  return request({
    url: '/setAppStatu',
    method: 'post',
    data: { id, statu }
  })
}

export function updateApkStatuUser(id, statu) {
  return request({
    url: '/setApkStatu',
    method: 'post',
    data: { id, statu }
  })
}

export function updateAppMaxUdid(id, udid) {
  return request({
    url: '/setAppMaxUDID',
    method: 'post',
    data: { id, udid }
  })
}

export function updateAppTip(id, tip) {
  return request({
    url: '/setAppTip',
    method: 'post',
    data: { id, tip }
  })
}

export function updateApkTip(id, tip) {
  return request({
    url: '/setApkTip',
    method: 'post',
    data: { id, tip }
  })
}

export function updateAppInfo(id, tip,actionType,tmpId) {
  return request({
    url: '/saveAppInfo_sr',
    method: 'post',
    data: { id, tip ,actionType,tmpId}
  })
}

export function updateAppInfo_bs(id, tip,actionType,tmpId) {
  return request({
    url: '/saveAppInfo_bs',
    method: 'post',
    data: { id, tip ,actionType,tmpId}
  })
}

export function updateApkInfo(id, tip,actionType,tmpId) {
  return request({
    url: '/saveApkInfo',
    method: 'post',
    data: { id, tip ,actionType,tmpId}
  })
}

export function getUserInfo() {
  return request({
    url: '/getUserInfo',
    method: 'get',
  })
}


export function getSysConfig() {
  return request({
    url: '/getSysConfig',
    method: 'get'
  })
}

export function getDownLoadRecord(appId,size, num,channel) {
  return request({
    url: '/getDownLoadRecord',
    method: 'get',
    params: {  appId,size, num ,channel}

  })
}

export function buyCoin(num) {
  return request({
    url: '/buyCoin',
    method: 'post',
    data: { num}
  })
}


export function buyDcount(num) {
  return request({
    url: '/buyDcount',
    method: 'post',
    data: { num}
  })
}


export function getUserUDIDList() {
  return request({
    url: '/getUserUDIDList',
    method: 'get',
  })
}



export function getConsumeRecord(beginTime, endTime, size, num) {
  return request({
    url: '/getConsumeRecord',
    method: 'get',
    params: {  beginTime, endTime, size, num}
  })
}

export function renewAppTime(num,appid) {
  return request({
    url: '/renewApp',
    method: 'post',
    data: { num,appid}
  })
}

export function getUserBaseInfo() {
  return request({
    url: '/getUserBaseInfo',
    method: 'get'
  })
}

export function setAppShortLink(id,link) {
  return request({
    url: '/setAppShortLink',
    method: 'post',
    data: { id,link}
  })
}

export function setApkShortLink(id,link) {
  return request({
    url: '/setApkShortLink',
    method: 'post',
    data: { id,link}
  })
}

