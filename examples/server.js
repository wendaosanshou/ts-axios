/*
 * @Author: liutao
 * @Date: 2020-04-20 17:51:44
 * @LastEditors: liutao
 * @LastEditTime: 2020-04-21 16:17:09
 * @Description: file content
 */

const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  // res.json(req.query)
  res.json({
    code: '10000',
    data: {
      name: '张三'
    }
  })
})

router.post('/base/post', function(req, res) {
  // res.json(req.body)
  res.json({
    code: '10000',
    data: {
      name: '张三'
    }
  })
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})


app.use(router)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})