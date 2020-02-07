
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')
const aliyunSMS = require('../unit/aliyunSms')
const uuid = require('node-uuid');

var fn_admin_login = async (ctx, next) => {

    var name = ctx.request.body.username || '',
         password = ctx.request.body.password || '';

    var data = await mysql.get_admin_info(name);

    if(data.length < 1){
        ctx.response.body = pbRes.resoponeError(200,ctx,905);
        return;
    }

    var user_info = data[0];

    if(password == user_info.password){
        ctx.session.user = name;
        var data =  {
            token: uuid.v4(),
            uuid: user_info.id,
            name:user_info.account
        };
        ctx.response.body = pbRes.resoponeSuccess(ctx,data)
    }
    else
    {
        ctx.response.body = pbRes.resoponeError(200,ctx,905);
    }
};

var fn_userLogin = async (ctx, next) => {

    var account = ctx.request.body.username || '',
        password = ctx.request.body.password || '';

    var data = await mysql.get_user_info_account(account);

    if(data.length < 1){
        ctx.response.body = pbRes.resoponeError(200,ctx,905);
        return;
    }

    var user_info = data[0];

    if(password == user_info.password){
        ctx.session.user = user_info.id;
        var data =  {
            token: uuid.v4(),
            uuid: user_info.id,
            name:user_info.account
        };
        ctx.response.body = pbRes.resoponeSuccess(ctx,data)
    }
    else
    {
        ctx.response.body = pbRes.resoponeError(200,ctx,905);
    }
};


var fn_registerUser = async (ctx, next) => {

    var
        account = ctx.request.body.account || '',
        password = ctx.request.body.password || '';

    //常规校验
    if (account.length<1 || password.length<1){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"信息输入不正确");
        return;
    }

    //检查账号是否存在
    var userData = await mysql.get_user_info_account(account);
    if (userData.length>0){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"用户已存在!");
        return;
    }
    //
    // //查询手机号是否已注册
    // var userDataPhone = await mysql.get_user_info_phone(phone);
    //
    // if (userDataPhone.length>0){
    //     ctx.response.body = pbRes.resoponeError(200,ctx,999,"手机号已存在!");
    // }
    //
    // //检查验证码
    // var userCaptch = await mysql.get_user_captch_new(phone);
    // if (userCaptch.length<0){
    //     ctx.response.body = pbRes.resoponeError(200,ctx,999,"请先发送验证码");
    //     return;
    // }
    //
    // var time = userCaptch[0].creater_time;
    //
    // if ((timeNow - time)/1000/60>30){
    //     ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码已失效，请重新发送");
    //     return;
    // }
    //
    // if (captchCode != userCaptch[0].captcha){
    //     ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码不正确");
    //     return;
    // }
    var timeNow = (new Date()).getTime();

    //插入数据库
    var resData = await mysql.insert_user_info(account,password,timeNow);

    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};

var fn_findPassword = async (ctx, next) => {

    var
        account = ctx.request.body.account || '',
        password = ctx.request.body.password || '',
        captchCode = ctx.request.body.captchCode || '';

    //常规校验
    if (account.length<1 || password.length<1 ||captchCode.length !=4){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"信息输入不正确");
        return;
    }

    //通过账号查询用户手机号码
    var userData = await mysql.get_user_info_account(account);
    if (userData.length<1){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"用户不存在!");
    }

    var phone = userData[0].phone;

    //检查验证码
    var userCaptch = await mysql.get_user_captch_new(phone);
    if (userCaptch.length<0){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"请先发送验证码");
        return;
    }

    var time = userCaptch[0].creater_time;
    var timeNow = (new Date()).getTime();

    if ((timeNow - time)/1000/60>30){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码已失效，请重新发送");
        return;
    }

    if (captchCode != userCaptch[0].captcha){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码不正确");
        return;
    }

    //插入数据库
    var resData = await mysql.update_user_password(account,password);

    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};


var fn_captchCodeForRegister = async (ctx, next) => {

    var phone = ctx.request.query.phone;
    if (phone.length!=11){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"手机号码错误!!");
        return;
    }
    //查询用户是否已注册
    var userData = await mysql.get_user_info_phone(phone);

    if (userData.length>0){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"用户已存在!");
    }

    //查询用户最新的一条验证码
    var userCaptch = await mysql.get_user_captch_new(phone);

    if (userCaptch.length>0){
        var time = userCaptch[0].creater_time;
        var timeNow = (new Date()).getTime();

        if ((timeNow - time)/1000/60<3){
            ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码发送太频繁!");
            return;
        }
    }

    //开始生成验证码
    var captchCode = Math.floor(Math.random()*(9999-1000+1)+1000);
    var sendRes = await aliyunSMS.sendSms(phone,captchCode);

    //插入数据库
    var timeNow = (new Date()).getTime();

    var data = await mysql.insert_user_captch(phone,captchCode,timeNow);

    ctx.response.body = pbRes.resoponeSuccess(ctx,data)

};

var fn_captchCodeForFindPwd = async (ctx, next) => {

    var account = ctx.request.query.account;
    if (account.length<1){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"账号信息错误!!");
        return;
    }

    //通过账号查询用户手机号码
    var userData = await mysql.get_user_info_account(account);

    if (userData.length<1){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"用户不存在!");
    }

    var phone = userData[0].phone;

    //查询用户最新的一条验证码
    var userCaptch = await mysql.get_user_captch_new(phone);

    if (userCaptch.length>0){
        var time = userCaptch[0].creater_time;
        var timeNow = (new Date()).getTime();

        if ((timeNow - time)/1000/60<3){
            ctx.response.body = pbRes.resoponeError(200,ctx,999,"验证码发送太频繁!");
            return;
        }
    }

    //开始生成验证码
    var captchCode = Math.floor(Math.random()*(9999-1000+1)+1000);
    var sendRes = await aliyunSMS.sendSms(phone,captchCode);

    //插入数据库
    var timeNow = (new Date()).getTime();

    var data = await mysql.insert_user_captch(phone,captchCode,timeNow);

    ctx.response.body = pbRes.resoponeSuccess(ctx,data)

};
module.exports = {
    'POST /adminLogin': fn_admin_login,
    'POST /userLogin': fn_userLogin,

    'POST /registerUser': fn_registerUser,
    'POST /findPassword': fn_findPassword,

    'GET /captchCodeForRegister': fn_captchCodeForRegister,
    'GET /captchCodeForFindPwd': fn_captchCodeForFindPwd,

};