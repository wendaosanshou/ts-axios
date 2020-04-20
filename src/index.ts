/*
 * @Author: liutao
 * @Date: 2020-04-20 17:12:32
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-20 17:43:55
 * @Description: file content
 */

import { AxiosRequestConfig } from './types/index'
import request from './request'

function axios(config: AxiosRequestConfig) {
  request(config)
}

export default axios
