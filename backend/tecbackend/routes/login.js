const router = require('koa-router')()

const {
    getPWD,
    getUID,
    getUserInfo
} = require('../db/worker')
const wrapUserInfo = require('../utils/utils').wrapUserInfo

router.prefix('/login') //加前缀

// 拿到登录状态
// 可以用来验证登录态
router.get('/', async function (ctx, next) {

    console.log(ctx.session)
    if (ctx.session.uid) {
        console.log(ctx.session)
        let uinfo = await getUserInfo(ctx.session.uid)
        ctx.body = {
            res: 'success',
            code: 0,
            userinfo: wrapUserInfo(uinfo)
        }
    } else {
        ctx.body = {
            res: 'error',
            code: 100 //登录已过期
        }
    }
})

//登录
router.post('/', async function (ctx) {
    let data = ctx.request.body; //拿到前台传来的数据
    // console.log('request', ctx.request)
    console.log(data.loginform);
    // ctx.status = 404;
    let res1 = await getUID(data.loginform.account)
    console.log(res1);

    if (res1.length > 0) {
        let res2 = await getPWD(res1[0].u_id)
        let res3 = await getUserInfo(res1[0].u_id)
        // console.log(wrapUserInfo(res3))
        let pwd = res2[0].password;
        if (pwd === data.loginform.pass) {
            // console.log(1)
            console.log('登录成功')
            // console.log(data.loginform.remember)
            if (data.loginform.remember) {

                console.log('Will Write Session')
                // ctx.cookies.set(res1[0].u_id, 'passport', {
                //     maxAge: 1000 * 60
                // })

                ctx.session.uid = res1[0].u_id
                console.log('Write Session Done')
            }


            // }
            // ctx.response.status = 200
            ctx.body = {
                res: 'success',
                code: 0, //自己约定 新登录成功
                userinfo: wrapUserInfo(res3)

            }
        } else {
            console.log('密码错误')
            ctx.body = {
                res: "error",
                code: 100
            }
        }
    } else {
        console.log('无该用户')
        ctx.body = {
            res: 'error',
            code: 200
        }
    }

})

//注销
router.del('/', async function (ctx) {
    if (ctx.session.uid) {
        ctx.session = null // 清空session的uid
        console.log(ctx.session)
        if (!ctx.session) {
            ctx.body = {
                res: 'success',
                code: 0 //注销成功
            }
        } else {
            ctx.body = {
                res: 'error',
                code: 100 //删除session失败
            }
        }
    } else {
        ctx.body = {
            res: 'success',
            code: 1 //早已退出
        }
    }
})

module.exports = router