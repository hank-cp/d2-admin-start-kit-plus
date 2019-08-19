/**
 * @description 登录代理, 提供具体的登录方法
 */
export default {
  /**
   * 登录代理接口
   * @param loginParam 登录信息
   * @returns param uuid {String} 用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
   * @returns param name {String} 显示在界面状态栏的用户名
   * @returns param saveToCookie {String} 保存到cookie的数据
   * @returns param saveToPrivate {String} 保存到私有存储的数据, 如用户信息
   * @returns param saveToGlobal {String} 保存到公有存储的数据, 如记住登录信息
   */
  login (loginParam) {
    return new Promise((resolve, reject) => {
      // resolve({
      //   uuid: '',
      //   name: '',
      //   saveToCookie: {},
      //   saveToPrivate: {},
      //   saveToGlobal: {}
      // })
      reject(new Error('implement me!'))
    })
  },
  /**
   * 退出登录代理接口
   * @return {Promise<Function>}
   */
  logout () {
    return Promise.resolve(() => {})
  }
}
