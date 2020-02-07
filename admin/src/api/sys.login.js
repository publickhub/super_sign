import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data
  })
}
