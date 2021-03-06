/*
 * @Author: liutao
 * @Date: 2020-04-20 18:03:28
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 14:06:21
 * @Description: file content
 */

const toString = Object.prototype.toString

export function isObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isArray(val: any): boolean {
  return toString.call(val) === '[object Array]'
}

export function isFormdata(val: any): boolean {
  return toString.call(val) === '[object FormData]'
}
