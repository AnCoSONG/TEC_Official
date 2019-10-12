const router = require('koa-router')()

router.prefix('/users')


router.get('/', async function (ctx, next) {
  console.log(ctx.querystring)
  ctx.body = "这是Users的Get接口"


})

router.post('/', async function (ctx, next) {

  ctx.body = "这是Users的POST接口"
  console.log(ctx.request.body) //这样可以拿到前台发送的数据
})

router.get('/bar', async function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


module.exports = router