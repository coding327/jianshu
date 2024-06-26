const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const connection = require('./db')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

require('dotenv').config()

// 连接数据库
connection()

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// cors，koa-jwt在路由前面使用
app.use(cors())
app.use(koajwt({
  secret: 'jianshu-serve-jwt'
}).unless({ // unless放行，哪些路由不需要经过jwt验证
  path: [/^\/users\/login/, /^\/users\/register/]
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
