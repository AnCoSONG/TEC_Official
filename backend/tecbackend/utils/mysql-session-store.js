const mysql = require('mysql2')
const CREATE_STATEMENT = 'CREATE  TABLE IF NOT EXISTS `_mysql_session_store` (`id` VARCHAR(255) NOT NULL, `expires` BIGINT NULL, `data` TEXT NULL, PRIMARY KEY (`id`));',
    GET_STATEMENT = 'SELECT * FROM `_mysql_session_store` WHERE id  = ?',
    SET_STATEMENT = 'INSERT INTO _mysql_session_store(id, expires, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE expires=?, data =?',
    DELETE_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE id  = ?',
    CLEANUP_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE expires  < ?';

const FORTY_FIVE_MINUTES = 45 * 60 * 1000;

let getExpiresOn = function (session, ttl) {
    let expiresOn = null;
    ttl = ttl || FORTY_FIVE_MINUTES

    if (session && session.cookie && session.cookie.expires) {
        if (session.cookie.expires instanceof Date) {
            expiresOn = session.cookie.expires
        } else {
            expiresOn = new Date(session.cookie.expires)
        }
    } else {
        let now = new Date();
        expiresOn = new Date(now.getTime() + ttl);
    }
    return expiresOn
}

// ONLY USEFUL IN KOA2 KOA-SESSION
// KOA-SESSION2 需要继承自自带的store这里没有，所以并不通用
class MysqlStore {
    constructor(opts) {
        let pool = null;
        this.getConnection = async function () {
            if (!pool) {
                pool = await mysql.createPool(opts);

            }
            return pool.promise();
        }

        this.cleanup = async function () {
            let now = Date.now()

            // console.log(now)
            let connection = await this.getConnection();
            let results = await connection.query(CLEANUP_STATEMENT, [now]);
        };

        this.init = async function () {
            let connection = await this.getConnection();
            let results = await connection.query(CREATE_STATEMENT);
            this.cleanup()
        }

        this.init();
        setInterval(this.cleanup.bind(this), 60 * 1000);
    }
    async get(sid) {
        let connection = await this.getConnection()
        let results = await connection.query(GET_STATEMENT, [sid])
        let session = null;
        if (results && results[0] && results[0][0] && results[0][0].data) {
            session = JSON.parse(results[0][0].data);
        }
        return session
    }

    async set(sid, session, ttl) {
        let expires = getExpiresOn(session, ttl).valueOf()
        let data = JSON.stringify(session);
        let connection = await this.getConnection()
        let results = await connection.query(SET_STATEMENT, [sid, expires, data, expires, data])
        return results
    }

    async destroy(sid) {
        let connection = await this.getConnection()
        let results = await connection.query(DELETE_STATEMENT, [sid])
    }
}

module.exports = MysqlStore;