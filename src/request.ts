/*
 * @Author: liutao
 * @Date: 2020-04-20 17:38:17
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-20 17:41:30
 * @Description: file content
 */

import { AxiosRequestConfig } from './types'

export default function request(config: AxiosRequestConfig): void {
  const { data, url, method = 'get' } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  xhr.send(data)
}
