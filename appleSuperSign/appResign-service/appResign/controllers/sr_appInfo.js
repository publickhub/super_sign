const fs = require('fs');
const path = require('path');
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')
const cmd_span = require('../unit/cmd_spawn');


//获得APP信息
var fn_getAppInfo = async (ctx, next) => {

    var appInfo = ctx.request.query.id;
    var re_data = await mysql.get_app_info(appInfo);

    ctx.response.body =
        JSON.stringify({
            statu: "0",
            message: "查询成功",
            data: re_data
        });
};

//获得APk信息
var fn_getApkInfo = async (ctx, next) => {

    var appInfo = ctx.request.query.id;
    var re_data = await mysql.get_apk_info(appInfo);

    ctx.response.body =
        JSON.stringify({
            statu: "0",
            message: "查询成功",
            data: re_data
        });
};


//获得APP信息
var fn_getAppInfoHashids = async (ctx, next) => {

    var hashIds = ctx.request.query.id;
    var re_data = await mysql.check_app_shortLink(hashIds);

    ctx.response.body =
        JSON.stringify({
            statu: "0",
            message: "查询成功",
            data: re_data
        });
};

//获得apk信息
var fn_getApkInfoHashids = async (ctx, next) => {

    var hashIds = ctx.request.query.id;
    var apkInfo = await mysql.check_apk_shortLink(hashIds);

    //判断apk状态
    if (apkInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    if (apkInfo[0].admin_check == 1 || apkInfo[0].is_delect == 1 || apkInfo[0].statu == 0){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "当前应用状态异常，请联系超管",
                data: []
            });
    }

    //读取对应的用户信息
    var userInfo = await  mysql.get_user_Info(apkInfo[0].user_id);
    if (userInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    if (userInfo[0].statu == 1){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "账号状态异常，请联系超管",
                data: []
            });
    }

    if (userInfo[0].d_count < 1){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "没有可用下载点数，请购买下载点数",
                data: []
            });
    }


    ctx.response.body =
        JSON.stringify({
            statu: "0",
            message: "查询成功",
            data: apkInfo
        });
};

var getApkInfoReleate = async (ctx, next) => {

    var releated = ctx.request.query.id;
    var apkInfo = await mysql.get_apk_info_releated(releated);
    
    //判断apk状态
    if (apkInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    if (apkInfo[0].admin_check == 1 || apkInfo[0].is_delect == 1 || apkInfo[0].statu == 0){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "当前应用状态异常，请联系超管",
                data: []
            });
    }

    //读取对应的用户信息
    var userInfo = await  mysql.get_user_Info(apkInfo[0].user_id);
    if (userInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    if (userInfo[0].statu == 1){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "账号状态异常，请联系超管",
                data: []
            });
    }

    if (userInfo[0].d_count < 1){
        ctx.response.body =
            JSON.stringify({
                statu: "-1",
                message: "没有可用下载点数，请购买下载点数",
                data: []
            });
    }


    ctx.response.body =
        JSON.stringify({
            statu: "0",
            message: "查询成功",
            data: apkInfo
        });
};



//获得安卓应用列表
var fn_getApkInfoList_admin = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var account = ctx.request.query.account;
    var appName = ctx.request.query.appName;

    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_apk_info_list_size_admin(account, beginTime, endTime, appName);
    var data = await mysql.get_apk_info_list_admin(account, beginTime, endTime, pageSize, pageNum, appName);

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
//获得app列表
var fn_getAppInfoList_admin = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var account = ctx.request.query.account;
    var appName = ctx.request.query.appName;

    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_app_info_list_size_admin(account, beginTime, endTime, appName);
    var data = await mysql.get_app_info_list_admin(account, beginTime, endTime, pageSize, pageNum, appName);

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

//获得企业签名app列表
var fn_getBusAppInfoList_admin = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var account = ctx.request.query.account;
    var appName = ctx.request.query.appName;

    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_bus_app_info_list_size_admin(account, beginTime, endTime, appName);
    var data = await mysql.get_bus_app_info_list_admin(account, beginTime, endTime, pageSize, pageNum, appName);

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

//用户获得APP列表
var fn_getAndroidAppInfoList = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var appName = ctx.request.query.appName;

    var user_id = ctx.session.user;
    //判断session
    if (user_id == undefined) {
        //无访问权限
        ctx.status = 401;
        return;
    }
    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_apk_info_list_size_user(user_id, beginTime, endTime, appName);
    var data = await mysql.get_apk_info_list_user(user_id, beginTime, endTime, pageSize, pageNum, appName);

    //遍历用户关联应用
    for (var i = 0;i<data.length;i++){
        var app_info = data[i];
        var ipaData = await mysql.get_app_related(app_info.related);
        if (ipaData.length>0){
            data[i].relatedData = ipaData[0];
        }
        else
        {
            data[i].relatedData = {}
        }
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

//查找可关联应用
var fn_getRelatedAppInfoListUser = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;

    var user_id = ctx.session.user;
    //判断session
    if (user_id == undefined) {
        //无访问权限
        ctx.status = 401;
        return;
    }
    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_related_app_info_list_size_user(user_id);
    var data = await mysql.get_related_app_info_list_user(user_id, pageSize, pageNum);

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

//用户获得APP列表
var fn_getAppInfoList = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var appName = ctx.request.query.appName;
    var type = ctx.request.query.type;

    var user_id = ctx.session.user;
    //判断session
    if (user_id == undefined) {
        //无访问权限
        ctx.status = 401;
        return;
    }
    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }
    if (type == undefined) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "参数错误");
        return;
    }

    var size = await mysql.get_app_info_list_size_user(user_id, beginTime, endTime, appName, type);
    var data = await mysql.get_app_info_list_user(user_id, beginTime, endTime, pageSize, pageNum, appName, type);

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

//获得app数量
var fn_getAppCount = async (ctx, next) => {
    var totalNum = await mysql.get_app_info_size();

    var resData = { size: totalNum[0].size }
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData);

};


//设置app最大可用udid
var fn_setAppMaxUDID = async (ctx, next) => {

    var num = ctx.request.body.udid;
    var id = ctx.request.body.id;

    if (num < 1 || num == "" || num == undefined) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "提交了错误的信息");
    }

    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_app(user_id, id);

    if (check_Info.len < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    var re_data = await mysql.update_app_max_udid(id, num);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

//获得过期APP数量
var fn_getExpiredAppCount = async (ctx, next) => {
    var totalNum = await mysql.get_Expired_app_size();
    var resData = { size: totalNum[0].size }

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData);

};

//关联应用操作
var fn_updateReleatedApp = async (ctx, next) => {
    var id = ctx.request.body.id;
    var appid = ctx.request.body.appid;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    if (appid == undefined) {
        //无权限
        ctx.status = 403;
        return;
    }

    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_apk(user_id, id);

    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    if (appid!=0){
        var check_Info = await mysql.check_user_app(user_id, appid);
        if (check_Info.length < 1) {
            //拒绝访问
            ctx.status = 403;
            return;
        }
    }

    var re_data = await mysql.update_apk_releated(id, appid);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

//设置apk状态
var fn_setApkStatu = async (ctx, next) => {
    var id = ctx.request.body.id;
    var statu = ctx.request.body.statu;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_apk(user_id, id);

    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    var re_data = await mysql.update_apk_statu(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

//设置app状态
var fn_setAppStatu = async (ctx, next) => {
    var id = ctx.request.body.id;
    var statu = ctx.request.body.statu;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_app(user_id, id);

    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    var re_data = await mysql.update_app_statu(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

var fn_updateApkDcount = async (ctx, next) => {
    var id = ctx.request.body.id;

    //读取app信息
    var apkInfo = await mysql.get_apk_info(id);
    if (apkInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    //更新app下载次数
    var tmp = await mysql.update_apk_dcount(id, apkInfo[0].d_count +1);

    //读取用户信息
    var userInfo = await  mysql.get_user_Info(apkInfo[0].user_id);

    if (userInfo.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }    //更新用户可用下载点数
    var re_data = await mysql.update_user_dcount(apkInfo[0].user_id, userInfo[0].d_count -1);


    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

var fn_setApkTip = async (ctx, next) => {
    var id = ctx.request.body.id;
    var tip = ctx.request.body.tip;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_apk(user_id, id);

    if (check_Info.len < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    if (tip.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "提交了错误的信息");
        return;
    }

    var re_data = await mysql.update_apk_tip(id, tip);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};


var fn_setAppTip = async (ctx, next) => {
    var id = ctx.request.body.id;
    var tip = ctx.request.body.tip;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_app(user_id, id);

    if (check_Info.len < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }

    if (tip.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "提交了错误的信息");
        return;
    }

    var re_data = await mysql.update_app_tip(id, tip);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};



//设置app状态-超管
var fn_setAppStatuAdmin = async (ctx, next) => {
    var id = ctx.request.body.id;
    var statu = ctx.request.body.statu;

    var re_data = await mysql.update_app_statu_admin(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};

var fn_setApkStatuAdmin = async (ctx, next) => {
    var id = ctx.request.body.id;
    var statu = ctx.request.body.statu;

    var re_data = await mysql.update_apk_statu_admin(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};




//获得APP是否可用
var fn_getAppStatu = async (ctx, next) => {
    var id = ctx.request.query.id;

    var tmpAppInfo = await mysql.get_app_info(id);

    if (tmpAppInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, -1, "当应用不存在，请联系管理员");
        return;
    }

    var userinfo = await mysql.get_user_Info(tmpAppInfo[0].user_id);
    if (userinfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, -1, "用户状态异常，请联系超管");
        return;
    }

    if (userinfo[0].statu != 0 || userinfo[0].is_delect != 0) {
        ctx.response.body = pbRes.resoponeError(200, ctx, -1, "用户状态异常，请联系超管");
        return;
    }


    //判断当前包是企业包还是超签包 1:企业包 2:超签包
    var tmpType = tmpAppInfo[0].type;
    if (tmpType == 1) {
        //企业包
        //超管状态 超管锁定 1：可用 0 不可用
        var adminCheck = tmpAppInfo[0].admin_check;
        //用户状态 1:可用  0:不可用
        var statu = tmpAppInfo[0].statu;
        //过期时间 
        var exTime = tmpAppInfo[0].ex_time;
        var time = (new Date()).getTime();

        if (adminCheck == 0 || statu == 0) {
            ctx.response.body = pbRes.resoponeError(200, ctx, -1, "当前应用已被禁用，请联系管理员");
            return;
        }

        if (time > exTime) {
            ctx.response.body = pbRes.resoponeError(200, ctx, -1, "当前应用已过期，请联系管理员");
            return;
        }
        ctx.response.body = pbRes.resoponeError(200, ctx, 0, "操作成功");
        return;
    }
    else {
        //超管状态 超管锁定 1：可用 0 不可用
        var adminCheck = tmpAppInfo[0].admin_check;
        //用户状态 1:可用  0:不可用
        var statu = tmpAppInfo[0].statu;
        if (adminCheck == 0 || statu == 0) {
            ctx.response.body = pbRes.resoponeError(200, ctx, -1, "当前应用已被禁用，请联系管理员");
            return;
        }
        ctx.response.body = pbRes.resoponeError(200, ctx, 0, "操作成功");
        return;
    }

};

//企业签名续费
var fn_renewApp = async (ctx, next) => {
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var renewCount = parseInt(ctx.request.body.num);
    var appid = parseInt(ctx.request.body.appid);

    if (renewCount < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "购买数量必须大于0");
        return;
    }

    //查询用户余额
    var userInfo = await mysql.get_user_Info(user_id);
    if (userInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "用户不存在");
        return;
    }

    //查询APP信息
    var appInfo = await mysql.get_app_info(appid);
    if (appInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "应用不存在");
        return;
    }
    var userCoin = userInfo[0].coin;
    var ex_time = appInfo[0].ex_time;
    var time = (new Date()).getTime();

    //判断过期时间起点
    if (time > ex_time) {
        ex_time = time;
    }

    //查询续费单价
    var sysData = await mysql.get_sys_config_info();
    var renew = sysData[0].coin_to_resign;

    //判断用户是否有钱购买
    if (renew * renewCount > userCoin) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "余额不足");
        return;
    }

    //执行购买流程
    var user_coin_new = userCoin - renew * renewCount;
    var ex_time_new = parseInt(ex_time) + parseInt(1000 * 60 * 60 * 24 * 30 * renewCount);
    var ipaddr = ctx.request.ip;

    //插入操作记录 //userId, amount,amount_early,creater_time,type,app_id,ip_addr
    var consumeData = await mysql.insert_consume_record(user_id, renew * renewCount, userCoin, time, "1", "", ipaddr);

    //更新用户余额
    var tmpData = await mysql.update_user_amount(user_id, user_coin_new);

    //更新APP过期时间 //app_id,update_time,ex_time
    var resData = await mysql.update_ipa_exTime_bs(appid, time, ex_time_new);

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)

};


//更新企业签名应用过期时间
var fn_setBusAppExpiredTime = async (ctx, next) => {
    var id = ctx.request.body.id;
    var time = ctx.request.body.time;

    var re_data = await mysql.update_bus_app_expired_time(id, time);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};


//删除app
var fn_delApp = async (ctx, next) => {
    var appID = ctx.request.body.id;

    if (appID == undefined || appID == "") {
        //无权限
        ctx.status = 401;
        return;
    }

    var re_data = await mysql.del_app_info(appID);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};

var fn_delApk = async (ctx, next) => {
    var appID = ctx.request.body.id;

    if (appID == undefined || appID == "") {
        //无权限
        ctx.status = 401;
        return;
    }

    var re_data = await mysql.del_apk_info(appID);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};




//设置app短链
var fn_setApkShortLink = async (ctx, next) => {
    var id = ctx.request.body.id;
    var link = ctx.request.body.link;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_apk(user_id, id);
    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    //检查短连接是否已经存在
    var check_Link = await mysql.check_apk_shortLink(link);

    if (check_Link.length > 0) {
        //拒绝访问
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "该短链已经存在！请更换其他短链");
        return;
    }

    if (link.length < 4 || link.length > 10) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "提交了错误的信息");
        return;
    }

    var re_data = await mysql.update_apk_Hashids(id, link);

    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

//更新应用说明

var fn_updateIOSAppInfo = async (ctx, next) => {
    var id = ctx.request.body.id;
    var introduce = ctx.request.body.introduce;
    var introduce_image = ctx.request.body.introduce_image;
    var user_id = ctx.session.user;
    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_app(user_id, id);
    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    var re_data = await mysql.update_ipa_Introduce(id, introduce,JSON.stringify(introduce_image));
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

var fn_updateAppInfo = async (ctx, next) => {
    var id = ctx.request.body.id;
    var introduce = ctx.request.body.introduce;
    var introduce_image = ctx.request.body.introduce_image;
    var user_id = ctx.session.user;
    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_apk(user_id, id);
    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    var re_data = await mysql.update_apk_Introduce(id, introduce,JSON.stringify(introduce_image));
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};
//设置app短链
var fn_setAppShortLink = async (ctx, next) => {
    var id = ctx.request.body.id;
    var link = ctx.request.body.link;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //判断应用是否属于本用户
    var check_Info = await mysql.check_user_app(user_id, id);
    if (check_Info.length < 1) {
        //拒绝访问
        ctx.status = 403;
        return;
    }
    //检查短连接是否已经存在
    var check_Link = await mysql.check_app_shortLink(link);

    if (check_Link.length > 0) {
        //拒绝访问
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "该短链已经存在！请更换其他短链");
        return;
    }

    if (link.length < 4 || link.length > 10) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "提交了错误的信息");
        return;
    }

    var re_data = await mysql.update_app_Hashids(id, link);

    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};


var fn_resignBsApp = async (ctx, next) => {
    var bs_id = ctx.request.body.bs_id;
    var user_id = ctx.session.user;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    //查询对应的企业证书信息
    var cerInfo = await mysql.get_bus_account_info(bs_id);
    if (cerInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "对应企业证书不存在");
        return;
    }
    var p12Path = cerInfo[0].p12_path;
    var p12Password = cerInfo[0].password;
    var mpPath = cerInfo[0].mobileprovision_path;

    //查询企业证书签名的app列表
    var appInfoList = await mysql.get_app_info_bs_id(id);
    if (appInfoList.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "没有可重签名的应用");
        return;
    }

    //循环重签名
    for(var i = 0;i<appInfoList.length;i++){
        var appInfo = appInfoList[i];
        
        console.log("开始重签应用 -- " + appInfo.app_name)
         //执行重签名操作 //ipaId, p12Path, p12Password, mpPath, ipa_path
         var resignRes = await resignBsIPA(appInfo.id, p12Path, p12Password, mpPath, appInfo.ipa_path);
         if (resignRes != "0") {
             ctx.response.body = pbRes.resoponeError(200, ctx, 999, "包处理失败!");
             return;
         }
    }

  
    var re_data = await mysql.update_app_Hashids(id, link);

    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data);
};

function resignBsIPA(ipaId, p12Path, p12Password, mpPath, ipa_path) {
    return new Promise(function (resolve, reject) {
        cmd_span.resignBs(ipaId, p12Path, p12Password, mpPath, ipa_path, function (data) {
            console.log(data);
            if (data = "0") {
                //执行重签名
                resolve("0");
            }
            else {
                reject(data);
            }
        });

    });
}

module.exports = {
    'GET /getAppInfo': fn_getAppInfo,                           //获得应用信息 -id
    'GET /getApkInfo': fn_getApkInfo,                           //获得应用信息 -id
    'GET /getApkInfoReleate': getApkInfoReleate,                //获得应用信息 -id

    'GET /getAppInfoHashids': fn_getAppInfoHashids,             //获得ipa应用信息 -Hashids
    'GET /getApkInfoHashids': fn_getApkInfoHashids,             //获得apk应用信息 -Hashids

    'GET /getAppInfoListAdmin': fn_getAppInfoList_admin,        //超管获得应用信息列表
    'GET /getApkInfoListAdmin': fn_getApkInfoList_admin,        //超管获得安卓应用信息列表

    'GET /getBusAppInfoListAdmin': fn_getBusAppInfoList_admin,  //获得企业签名应用列表
    'GET /getAppDownCount': fn_getAppInfoList_admin,            //获得app下载数量
    'GET /getAppCount': fn_getAppCount,                         //获得app数量
    'GET /getExpiredAppCount': fn_getExpiredAppCount,           //获得app过期时间
    'GET /getAppInfoListUser': fn_getAppInfoList,               //获得应用信息列表 -用户
    'GET /getAndroidAppInfoListUser': fn_getAndroidAppInfoList,               //获得应用信息列表 -用户
    'GET /getRelatedAppInfoListUser': fn_getRelatedAppInfoListUser,               //查找可关联应用

    'GET /getAppStatu': fn_getAppStatu,                        //注入包获得APP是否可用

    'POST /setAppStatu': fn_setAppStatu,                        //设置app状态
    'POST /setApkStatu': fn_setApkStatu,                        //设置apk状态
    'POST /setAppTip': fn_setAppTip,                            //设置app备注
    'POST /setApkTip': fn_setApkTip,                            //设置app备注
    'POST /setAppShortLink': fn_setAppShortLink,                //设置app短链
    'POST /setApkShortLink': fn_setApkShortLink,                //设置app短链
    'POST /updateReleatedApp': fn_updateReleatedApp,            //解除关联应用
    'POST /updateAppIntroduceInfo': fn_updateAppInfo,            //更新应用说明
    'POST /updateIOSAppIntroduceInfo': fn_updateIOSAppInfo,      //更新应用说明
    'POST /updateApkDcount': fn_updateApkDcount,            //更新应用说明

    'POST /setAppStatuAdmin': fn_setAppStatuAdmin,              //超管设置app状态
    'POST /setApkStatuAdmin': fn_setApkStatuAdmin,              //超管设置apk状态

    'POST /setAppMaxUDID': fn_setAppMaxUDID,                    //设置app最大可用udid
    'POST /delAppInfo': fn_delApp,                              //删除app
    'POST /delApkInfo': fn_delApk,                              //删除app

    'POST /setBusAppExpiredTime': fn_setBusAppExpiredTime,      //设置过期时间
    'POST /renewApp': fn_renewApp,                              //app续费
    'POST /resignBsApp': fn_resignBsApp                         //一键重签名

};