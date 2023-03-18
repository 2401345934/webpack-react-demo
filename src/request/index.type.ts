import type { Method, AxiosRequestConfig } from 'axios'

export type RequestType = {
  url: string
  method: Method | string
  data?: object
  config?: AxiosRequestConfig
}

export type ResponseData<R> = {
  code: string
  message: string
  data: R
}
