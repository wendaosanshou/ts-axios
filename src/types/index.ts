/*
 * @Author: liutao
 * @Date: 2020-04-20 17:36:30
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-20 17:37:31
 * @Description: types entry file
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
