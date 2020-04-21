/*
 * @Author: liutao
 * @Date: 2020-04-20 17:38:17
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 18:10:08
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
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', responseType, timeout } = config

    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    if (timeout) {
      xhr.timeout = timeout
    }

    // 建立链接
    xhr.open(method.toUpperCase(), url, true)
    // 监听xhr的状态变化回调
    xhr.onreadystatechange = function handleRequestSuccess() {
      if (xhr.readyState !== 4) {
        return
      }
      // 请求完成前，status的状态会是0
      if (xhr.status === 0) {
        return
      }
      // status为2xx，则表示请求成功
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = getResponseData(config)
        resolve(response)
      } else {
        reject(new Error(`Request fail with status code ${xhr.status}`))
      }
    }

    /**
     * 当onreadystatechange触发时，获取reponse信息
     * @param xhr XMLHttpRequest实例
     * @param config 请求配置
     */
    function getResponseData(config: AxiosRequestConfig): AxiosResponse {
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

    // 处理异常情况
    xhr.onerror = function handleRequestError() {
      reject(new Error('Network Error'))
    }

    // 处理超时请求
    xhr.ontimeout = function handleRequestTimeout() {
      reject(new Error(`Time of ${timeout}ms exceeded`))
    }

    // 处理请求的headers
    setRequestHeaders(xhr, config)
    // 发送请求
    xhr.send(data)
  })
}
