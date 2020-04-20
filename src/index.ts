/*
 * @Author: liutao
 * @Date: 2020-04-20 17:12:32
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-20 18:20:11
 * @Description: src entry
 */

import { AxiosRequestConfig } from './types/index'
import { bulidURL } from './helpers/url'
import request from './request'

/**
 * 使用xhr进行ajax请求
 * @param config 接口请求配置
 */
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  request(config)
}

/**
 * 处理config的url配置
 * @param config 接口请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

/**
 * 将url和params进行处理，拼接成url?key1=value1&key2=value2
 * @param config 接口请求配置
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
