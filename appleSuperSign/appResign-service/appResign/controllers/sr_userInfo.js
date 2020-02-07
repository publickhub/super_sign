
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')

var fn_getUserInfoList = async (ctx, next) => {

    var
        name = ctx.request.query.account || '',
        beginTime = ctx.request.query.beginTime || '',
        endTime = ctx.request.query.endTime || '',
        pageSize = ctx.request.query.size || '',
        pageNum = ctx.request.query.num || '';

    if (pageSize == '') {
        pageSize = 10;
    }
    if (pageNum == '') {
        pageNum = 1;
    }


    var size = await mysql.get_user_Info_List_size(name, beginTime, endTime);
    var data = await mysql.get_user_Info_List(name, beginTime, endTime, pageSize, pageNum);

    //遍历用户已用udid数
    for (var i = 0;i<data.length;i++){
        var user_info = data[i];
        var udid_data = await mysql.get_user_udid_list(user_info.id);
        data[i].udid_inuse = udid_data.length;
    }

    if (size.length < 1) {
        var resData = {
            size: 0,
            data: []
        }
        ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
        return;
    }

    var resData = {
        size: size[0].size,
        data: data
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)

};

var fn_changeAccountStatu = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        statu = ctx.request.body.statu || '';

    var resData = await mysql.update_user_statu(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};

var fn_changeUserMaxUdid = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        udid = ctx.request.body.udid || '';

    var resData = await mysql.update_user_udid_num(id, udid);
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};

var fn_changeUserAmount = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        amount = ctx.request.body.amount || '';

    //查询用户当前余额
    var data = await mysql.get_user_coin(id);

    if (data.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 901);
        return;
    }
    var coin = data[0].coin;
    var ipaddr = ctx.request.ip;
    var type = parseInt(amount) > 0 ? 1 : 0;


    //插入修改记录
    var insertRes = await mysql.insert_amount_record(id, type, ipaddr, amount, coin);
    //更新用户余额
    var resData = await mysql.update_user_amount(id, parseInt(coin) + parseInt(amount));
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};


var fn_getUserInfo = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var resData = await mysql.get_user_Info(user_id);

    if (resData.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "用户不存在");
        return;
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData[0])
};

//购买下载点数
var fn_buyDcount = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var dCount = parseInt(ctx.request.body.num);

    if (dCount < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "购买数量必须大于0");
        return;
    }

    //查询用户余额
    var userInfo = await mysql.get_user_Info(user_id);
    if (userInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "用户不存在");
        return;
    }

    var userCoin = userInfo[0].coin;
    var d_count = userInfo[0].d_count;
    //查询币单价
    var sysData = await mysql.get_sys_config_info();
    var dPrice = sysData[0].coin_to_dcount

    //判断用户是否有钱购买
    if (dPrice * dCount > userCoin) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "余额不足");
        return;
    }

    //执行购买流程
    var user_coin_new = userCoin - dPrice * dCount;
    var user_dcount_new = d_count + dCount*10;
    var time = (new Date()).getTime();
    var ipaddr = ctx.request.ip;

    //插入操作记录 //userId, amount,amount_early,creater_time,type,app_id,ip_addr
    var consumeData = await mysql.insert_consume_record(user_id, dPrice * dCount, userCoin, time, "3", "", ipaddr);

    //更新用户数据
    var resData = await mysql.update_user_amount_dcount(user_id, user_dcount_new, user_coin_new);

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};
var fn_buyCoin = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var udidCount = parseInt(ctx.request.body.num);

    if (udidCount < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "购买数量必须大于0");
        return;
    }

    //查询用户余额
    var userInfo = await mysql.get_user_Info(user_id);
    if (userInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "用户不存在");
        return;
    }

    var userCoin = userInfo[0].coin;
    var udid = userInfo[0].udid_count;
    //查询币单价
    var sysData = await mysql.get_sys_config_info();
    var udidPrice = sysData[0].coin_to_udid

    //判断用户是否有钱购买
    if (udidPrice * udidCount > userCoin) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "余额不足");
        return;
    }

    //执行购买流程
    var user_coin_new = userCoin - udidPrice * udidCount;
    var user_udid_new = udid + udidCount;
    var time = (new Date()).getTime();
    var ipaddr = ctx.request.ip;

    //插入操作记录 //userId, amount,amount_early,creater_time,type,app_id,ip_addr
    var consumeData = await mysql.insert_consume_record(user_id, udidPrice * udidCount, userCoin, time, "0", "", ipaddr);

    //更新用户数据
    var resData = await mysql.update_user_amount_udid(user_id, user_udid_new, user_coin_new);

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};

//查询用户使用的udid列表
var fn_getUserUDIDList = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var resData = await mysql.get_user_udid_list(user_id);
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};

//查询用户的消费记录
var fn_getConsumeRecord = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var
        beginTime = ctx.request.query.beginTime || '',
        endTime = ctx.request.query.endTime || '',
        pageSize = ctx.request.query.size || '',
        pageNum = ctx.request.query.num || '';

    if (pageSize == '') {
        pageSize = 10;
    }
    if (pageNum == '') {
        pageNum = 1;
    }

    var size = await mysql.get_consume_record_size(user_id, beginTime, endTime);
    var data = await mysql.get_consume_record(user_id,beginTime, endTime, pageNum, pageSize);

    if (size.length < 1) {
        var resData = {
            size: 0,
            data: []
        }
        ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
        return;
    }

    var resData = {
        size: size[0].size,
        data: data
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};


var fn_getUserBaseInfo = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var downloadData = await mysql.get_user_download_list(user_id);
    var applistData = await mysql.get_app_info_list_size_user(user_id,"","","","")
    var userUDIDList = await mysql.get_user_udid_list(user_id);
    var userInfo = await mysql.get_user_Info(user_id);

    var udidInuse = userInfo[0].udid_count - userUDIDList.length;
    var resData={
        downloadSize:downloadData[0].size,
        appSize:applistData[0].size,
        maxUdidSize:userInfo[0].udid_count,
        udidInuseSize:udidInuse
    }

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};

//删除用户
var fn_delUserInfo = async (ctx, next) => {
    var user_id = ctx.request.body.id;
    //判断
    if (user_id == undefined || user_id == "") {
        //无权限
        ctx.status = 401;
        return;
    }

    var resData = await mysql.del_user_info(user_id);

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};



module.exports = {
    'GET /getUserInfoList': fn_getUserInfoList,
    'POST /changeAccountStatu': fn_changeAccountStatu,
    'POST /changeUserMaxUdid': fn_changeUserMaxUdid,
    'POST /changeUserAmount': fn_changeUserAmount,
    'POST /delUserInfo': fn_delUserInfo,

    'GET /getUserInfo': fn_getUserInfo,
    'POST /buyCoin': fn_buyCoin,
    'POST /buyDcount': fn_buyDcount,

    'GET /getUserUDIDList': fn_getUserUDIDList,
    'GET /getConsumeRecord': fn_getConsumeRecord,


    'GET /getUserBaseInfo': fn_getUserBaseInfo

};