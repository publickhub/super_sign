import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/userLogin',
    method: 'post',
    data
  })
}
