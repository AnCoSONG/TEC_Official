const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
  console.log(ctx);
  ctx.response.status = 200;
  ctx.body = 'Service OK!'

})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/xml', async (ctx, next) => {
  ctx.response.type = "xml"
  ctx.body = '<abc>黑</abc>'
})

module.exports = router