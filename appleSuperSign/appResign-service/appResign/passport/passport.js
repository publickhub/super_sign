const LocalStrategy = require('passport-local')
const UserModel = require(__dirname + '/../../src/model/UserModel')
const mysql = require('../DBConnet/DB_connet')
const passport = = require('../passport/passport.js')

// 用户名密码验证策略
passport.use(new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
     async function (username, password, done) {
        var data = await mysql.get_admin_info(name);

        if(data.length < 1){
            return done(null, false, '未知用户')
        }

        var user_info = data[0];

        if(password == user_info.password){
            return done(null, result)
        }
        else
        {
            return done(null, false, '密码错误')
        }
    }
))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
    done(null, user)
})

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function (user, done) {
    return done(null, user)
})

module.exports = passport