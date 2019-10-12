const randomString = require('random-string-generator')

let is_email = (str) => {
    let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return pattern.test(str);
}


let sendCaptcha = async function (email, ctx) {
    if (is_email(email)) {
        console.log('发往', email)
        const sgEmail = require('@sendgrid/mail')
        sgEmail.setApiKey('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')
        let captcha = randomString(5);
        if (!ctx.session.captcha) {

            ctx.session.captcha = captcha;
            ctx.session.maxAge = 1000 * 60 * 5;
        }
        const msg = {
            to: email,
            from: 'tec_official@tec.com',
            subject: 'Congratulations!',
            text: 'Verify Your Account Here!!',
            html: `<strong>你已经注册完成，现需要验证邮箱,以下是您的验证码</strong><br><h2>${captcha}</h2><strong>五分钟后过期，请尽快填写</strong>`,
        }

        return await sgEmail.send(msg)
    } else {
        console.error('邮箱错误')
    }
}

let wrapUserInfo = data => {
    //将登录返回的userinfo封装一下
    console.log(data)
    const {
        u_id,
        nickname,
        avator,
        pending
    } = data[0];
    return {
        u_id,
        nickname,
        avator,
        pending
    }

}

module.exports = {
    is_email,
    sendCaptcha,
    wrapUserInfo
}