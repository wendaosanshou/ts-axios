/*
 * @Author: liutao
 * @Date: 2020-04-20 17:12:32
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 16:53:37
 * @Description: src entry
 */

import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import request from './request'

/**
 * 使用xhr进行ajax请求
 * @param config 接口请求配置
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  console.log('axios', config)
  return request(config)
}

/**
 * 处理config的url配置
 * @param config 接口请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformRequestUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformRequestHeader(config)
}

/**
 * 将url和params进行处理，拼接成url?key1=value1&key2=value2
 * @param config 接口请求配置
 */
function transformRequestUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

/**
 * 将url和params进行处理，拼接成url?key1=value1&key2=value2
 * @param config 接口请求配置
 */
function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

/**
 * 处理请求参数的headers
 * @param config 接口请求参数
 */
function transformRequestHeader(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
