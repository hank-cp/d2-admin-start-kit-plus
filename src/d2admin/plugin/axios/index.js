import axios from 'axios'
import setting from '@/d2admin/setting'
import delegate from '@/d2admin/delegate/axios'

// 创建一个 axios 实例
const service = axios.create(setting.axios)

// 请求拦截器
service.interceptors.request.use(
  config => {
    return delegate.beforeRequest(config)
  },
  error => {
    // 发送失败
    delegate.onRequestError(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return delegate.beforeResponse(response)
  },
  error => {
    const retry = delegate.onResponseError(error)
    if (retry) return retry
    return Promise.reject(error)
  }
)

export default service
