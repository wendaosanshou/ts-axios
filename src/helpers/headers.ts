/*
 * @Author: liutao
 * @Date: 2020-04-21 15:21:13
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 16:58:44
 * @Description: file content
 */

import { isObject } from './util'
import { AxiosRequestConfig } from '../types'

/**
 *
 * @param headers 请求header
 * @param normalizeName 标准的header的key字段
 */
function normalizeHeader(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase === normalizeName.toLocaleUpperCase) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理请求头的对象，对header里面的key归一
 * @param headers 请求头的对象
 * @param data 请求的参数对象
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeader(headers, 'Content-Type')

  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * 将headers字符串解析成对象
 * @param headers 请求headers
 */
export function parseHeaders(headers: string): any {
  let parsed = {} as any
  if (!headers) {
    return parsed
  }
  let splits = headers.split('\r\n')
  if (splits && splits.length > 0) {
    splits.forEach(line => {
      let [key, value] = line.split(':')
      key = key.trim().toLowerCase()
      if (!key) {
        return
      }
      value = value ? value.trim() : value
      parsed[key] = value
    })
  }
  return parsed
}

/**
 * 处理请求的headers
 * @param xhr XMLHttpRequest实例
 * @param config 请求配置信息
 */
export function setRequestHeaders(xhr: XMLHttpRequest, config: AxiosRequestConfig) {
  const { headers, data } = config
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      xhr.setRequestHeader(name, headers[name])
    }
  })
}
