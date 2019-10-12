const router = require('koa-router')()
const sendCaptcha = require('../utils/utils').sendCaptcha


router.prefix('/signup')
router.get('/', async function (ctx) {
    if (!ctx.session.captcha) {
        ctx.body = {
            success: false
        }
    } else {

        ctx.body = {
            success: true,
            captcha: ctx.session.captcha
        }
    }
})
const insertUser = require('../db/worker').insertUser
router.post('/', async function (ctx) {
    let data = ctx.request.body.signupform;
    console.log(data)
    let username = data.username;
    let nickename = data.nickname;
    let password = data.password;
    let email = data.email_address;

    let res = await sendCaptcha(email, ctx);
    if (res[0].statusCode > 200 && res[0].statusCode < 300) {
        //先把用户insert进表
        let result = await insertUser(username, nickename, email, password);
        console.log(result)
        ctx.body = {
            success: true,
            res: res,
            uid: result.insertId
        }
    } else {
        console.log('SendGrid或服务器错误')
        ctx.body = {
            success: false,
            res: res
        }
    }

})

const confirmAccount = require('../db/worker').confirmAccount
router.put('/', async function (ctx) {
    let data = ctx.request.body;
    console.log(data)
    //将captcha session删掉
    ctx.session = null;
    //将pending改掉
    await confirmAccount(data.uid).catch(err => {
        ctx.body = {
            success: false
        }
    })

    ctx.body = {
        success: true
    }

})

module.exports = router