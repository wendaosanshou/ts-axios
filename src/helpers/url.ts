/*
 * @Author: liutao
 * @Date: 2020-04-20 18:03:14
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 14:10:56
 * @Description: file content
 */
import { isDate, isObject } from './util'

/**
 * 用来对axios的config里的params进行编码
 * @param val params的key或者value
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 将params转成key=xxx&value=xxx格式
 * @param params axios请求中的params参数
 */
function getParts(params: any): string[] {
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // 遍历数组里每一个值
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  return parts
}

/**
 * 将url和params合并
 * @param url 请求url
 * @param params 请求params
 */
export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = getParts(params)

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
