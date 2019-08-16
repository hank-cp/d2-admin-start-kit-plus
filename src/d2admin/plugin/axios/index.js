import axios from 'axios'
import delegate from '@/d2admin/delegate/axios'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

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
    delegate.onResponseError(error)
    return Promise.reject(error)
  }
)

export default service
