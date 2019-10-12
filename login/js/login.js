let username = $('#username')
let password = $('#password')
console.log(username)
username.on('input',
    function () {
        console.log(1)
        let rule = username.attr('data-rule')
    })