/*
 * @Author: liutao
 * @Date: 2020-04-20 17:38:17
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 17:01:14
 * @Description: file content
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders, setRequestHeaders } from './helpers/headers'
import { transformResponse } from './helpers/data'

/**
 * 使用XMLHttpRequest进行ajax请求
 * @param config 请求参数配置
 */
export default function request(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data, url, method = 'get', responseType } = config

    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    // 建立链接
    xhr.open(method.toUpperCase(), url, true)
    // 监听xhr的状态变化回调
    xhr.onreadystatechange = function afterStateChange() {
      if (xhr.readyState !== 4) {
        return
      }
      const response = getResponseData(xhr, config)
      resolve(response)
    }
    // 处理请求的headers
    setRequestHeaders(xhr, config)
    // 发送请求
    xhr.send(data)
  })
}

/**
 * 当onreadystatechange触发时，获取reponse信息
 * @param xhr XMLHttpRequest实例
 * @param config 请求配置
 */
function getResponseData(xhr: XMLHttpRequest, config: AxiosRequestConfig): AxiosResponse {
  const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
  const responseData =
    xhr.responseType && xhr.responseType !== 'text' ? xhr.response : xhr.responseText
  const response: AxiosResponse = {
    data: transformResponse(responseData),
    status: xhr.status,
    statusText: xhr.statusText,
    headers: responseHeaders,
    config,
    request: xhr
  }
  return response
}
