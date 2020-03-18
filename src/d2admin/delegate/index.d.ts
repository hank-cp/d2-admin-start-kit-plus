import { Store } from 'vuex'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

declare interface Any {
  [propName : string]: any;
}

declare namespace delegate {
  interface LoginDelegate {
    login (loginParam: LoginParam): Promise<LoginResult>
    logout (): Promise<Function>
  }

  interface AxiosDelegate {
    beforeRequest (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>
    onRequestError (error: AxiosError): void
    beforeResponse (response: AxiosResponse): any
    onResponseError (error: AxiosError): any
  }

  interface MenuDelegate {
    loadMenu (store: Store<any>): Promise<void>
  }

  interface LoginParam {
    [propName: string]: any;
    rememberMe?: boolean
  }

  interface LoginResult {
    uuid: string
    name: string
    saveToCookie?: Any
    saveToPrivate?: Any
    saveToGlobal?: Any
  }

  interface MenuItem {
    path?: string
    title: string
    icon: string
    children: MenuItem[]
  }
}
