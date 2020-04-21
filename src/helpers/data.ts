/*
 * @Author: liutao
 * @Date: 2020-04-21 14:07:40
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 16:59:50
 * @Description: transform request data
 */

import { isObject } from './util'

export function transformRequest(data: any): any {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      console.log(`[parse fail]: ${error}`)
    }
  }
  return data
}
