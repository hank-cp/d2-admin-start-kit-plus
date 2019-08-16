import store from '@/store'
import util from '@/d2admin/libs/util'
import { Message } from 'element-ui'

// 创建一个错误
export function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

export function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

export function translateHttpStatus (error) {
  if (!error || !error.response) return '未知错误'
  switch (error.response.status) {
    case 400: return '请求错误'
    case 401: return '未授权，请登录'
    case 403: return '拒绝访问'
    case 404: return `请求地址出错: ${error.response.config.url}`
    case 408: return '请求超时'
    case 500: return '服务器内部错误'
    case 501: return '服务未实现'
    case 502: return '网关错误'
    case 503: return '服务不可用'
    case 504: return '网关超时'
    case 505: return 'HTTP版本不受支持'
  }
  return '未知错误'
}

/**
 * @description Aoxis请求
 */
export default {
  /**
   * 获取Menu
   */
  beforeRequest (config) {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['access-token'] = token
    return config
  },
  onRequestError (error) {
    console.log(error)
  },
  beforeResponse (response) {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  onResponseError (error) {
    error.message = translateHttpStatus(error)
    errorLog(error)
  }
}
