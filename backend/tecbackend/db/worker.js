var mysql = require('mysql2')
var config = require('./config')
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

// console.log(pool.getConnection())



let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        // console.log(1)
        pool.getConnection(function (err, connection) {
            // console.log(2)

            if (err) {
                // console.log(3)

                reject(err)
            } else {
                // console.log(4)

                connection.query(sql, values, (err, rows) => {
                    // console.log(5)

                    if (err) {
                        reject(err)
                    } else {
                        // console.log(6)

                        // console.log('rows', rows)
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}



let insertUser = function (username, nickname, email, password) {
    let sql = 'insert into users set username=?,nickname=?,email=?,password=?,avator=?;'
    let value = [username, nickname, email, password, `https://avatars.dicebear.com/v2/identicon/${nickname}.svg`]
    return query(sql, value)
    //由于狗血的设计还需要写事务， 打算改表，不写了...
    // let _sql = "insert into users set username=?,nickname=?,email=?;"
    // let _sql2 = `insert into user_auths`
    // let value = [username, nickname, email]
    // let res1 = await query(_sql, value)
    // let res2 = await query()
}

const {
    is_email
} = require('../utils/utils')
let getUID = function (account) {
    //只允许用户用邮箱和用户名登录
    let sql_statement = "";
    if (is_email(account)) {
        sql_statement = `select u_id from users where email="${account}"`
    } else {
        sql_statement = `select u_id from users where username="${account}"`
    }
    console.log(sql_statement)

    return query(sql_statement)
}

let getPWD = (uid) => {
    let sql = `select password from users where u_id = ${uid}`;

    return query(sql)
}

let getUserInfo = (uid) => {
    let sql = `select * from users where u_id = ${uid}`;
    return query(sql)
}

let confirmAccount = (uid) => {
    let sql = `update users set pending = 0 where u_id=${uid}`
    return query(sql)
}


module.exports = {
    insertUser,
    getUID,
    getPWD,
    getUserInfo,
    confirmAccount
}