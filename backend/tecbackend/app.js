const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const cors = require('koa2-cors')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./db/config')
// const session = require('koa-session-minimal')
// const MysqlStore = require('koa2-session-mysql')
const MysqlStore = require('./utils/mysql-session-store')
// const path = require('path')

// 路由汇总区
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')
const signup = require('./routes/signup')

// //cookie
// let cookie = {
//     maxAge: 20 * 60 * 1000, // cookie有效时长(ms)
//     expires: '', // cookie失效时间
//     path: '', // 写cookie所在的路径
//     domain: '', // 写cookie所在的域名
//     httpOnly: true, // 是否只用于http请求中获取
//     overwrite: true, // 是否允许重写
//     secure: '',
//     sameSite: '',
//     signed: true,

// }
// error handler
onerror(app)

//session  PASS!!!!!!! 可以啦！！！！！!!! store也可以啦！！！
const sessionMysqlConfig = {
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
}
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 1000 * 60 * 30, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: true, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
  store: new MysqlStore(sessionMysqlConfig)
};
const koa_session = require('koa-session')

app.use(koa_session(CONFIG, app));


// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

//跨域 可以通过jsonp( only get ) cors proxy这些方法
// jsonp和cors是后端解决
// proxy是前端通过代理修改前缀转发路径，达到伪造同源的目的
// 这里使用cors
const allow_origin = ['http://localhost:8080', 'http://192.168.1.106:8080']
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === "/public") {
      return "*"
    } else {
      console.log(ctx.header.origin)
      for (let i = 0; i < allow_origin.length; i++) {

        if (allow_origin[i] === ctx.header.origin) {
          return allow_origin[i];
        }
      }
      return false
    }
  },
  credentials: true
})); //支持跨域
app.use(json())
app.use(logger())
// let pa = path.join(__dirname, './public') //这样拼接不OK
app.use(require('koa-static')(__dirname, '/public')) //直接这样写才可以...这个坑踩了一个小时！！
// console.log(pa)
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
app.use(login.routes(), login.allowedMethods())
app.use(signup.routes(), signup.allowedMethods())


//数据库相关
// const sessionMysqlConfig = {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
// }
// app.use(session({
//   store: new MysqlStore(sessionMysqlConfig)
// }))

// console.log(app.context.session)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app