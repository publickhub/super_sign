
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')
const uuid = require('node-uuid');
const cmd_span = require('../unit/cmd_spawn');
var config = require('../config/config.js')


//获得企业账号列表
var fn_getBusAccountInfoList = async (ctx, next) => {

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var account = ctx.request.query.account;

    if(pageSize == undefined){
        pageSize = 10;
    }
    if(pageNum == undefined){
        pageNum = 1;
    }

    var size = await mysql.get_bus_account_info_list_size(account,beginTime,endTime);
    var data = await mysql.get_bus_account_info_list(account,beginTime,endTime,pageSize,pageNum);

    if(size.length < 1){
        var resData = {
            size:0,
            data:[]
        }
        ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
        return;
    }

    var resData = {
        size:size[0].size,
        data:data
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};

//重签名列表
var fn_resignIpaList = async (ctx, next) => {
    var id = ctx.request.body.id;
    var cer_id = ctx.request.body.cer_id;

    //查询证书
    var tmpBsInfo = await mysql.get_bus_account_info(cer_id);
    if (tmpBsInfo.length < 1) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "未能查询到证书，请联系技术支持");
        return;
    }
    var p12Path = tmpBsInfo[0].p12_path;
    var p12Password = tmpBsInfo[0].password;
    var mpPath = tmpBsInfo[0].mobileprovision_path;

    var data = await mysql.get_bus_account_app_list(id);

    console.log("开始执行重签名操作，本次操作app " + data.length + "个");

    for (var i=0;i<data.length;i++){
        var appid = uuid.v4();

        var appInfo = data[i];
        var ipaPath = appInfo.ipa_path.replace("https://www.n4n00.com/appservice/" ,"")
        //执行重签名操作 //ipaId, p12Path, p12Password, mpPath, ipa_path
        var resignRes = await resignBsIPA(appid, p12Path, p12Password, mpPath, "./www/"+ipaPath);

        console.log("将使用证书id为 " + cer_id + "的证书进行重签名")

        var resData = await mysql.update_ipa_info_bs_account(appInfo.id,config.serviceUrl + '/appservice/resignIpa/' + appid + '.ipa',cer_id);

        console.log(appInfo.app_name +"重签名完成!");
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx,[])
};


//获得可用的企业账号列表
var fn_getUsableBusAccountInfoList = async (ctx, next) => {

    var data = await mysql.get_bus_account_info_usable();
    ctx.response.body = pbRes.resoponeSuccess(ctx,data)
};

var fn_getResignAppList = async (ctx, next) => {
    var cer_id = ctx.request.query.cer_id;

    var data = await mysql.get_bus_account_app_list(cer_id);


    ctx.response.body = pbRes.resoponeSuccess(ctx,data)
};





//修改企业账号状态
var fn_changeBusAccountStatu = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        statu = ctx.request.body.statu || '';

    var resData = await mysql.update_bus_account_statu(id,statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};

//修改企业账号的备注
var fn_changeBusAccountTip = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        tip = ctx.request.body.tip || '';

    var resData = await mysql.update_bus_account_tip(id,tip);
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};



//增加企业账号
var fn_addBusAccount = async (ctx, next) => {

    var
        p12Path = ctx.request.body.p12Path || '',
        mpPath = ctx.request.body.mpPath || '',
        tip = ctx.request.body.tip || '',
        password = ctx.request.body.password || '';

    var tag_name = 'sr-' + uuid.v4();
    var createrTime = (new Date()).getTime();
    var statu = 0;
    var resData = await mysql.insert_bus_account(tag_name,tip,statu,createrTime,p12Path,mpPath,password);
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};

//重签名
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
    'GET /getBusAccountInfoList': fn_getBusAccountInfoList, //获得企业账号的信息列表
    'GET /getUsableBusAccountInfoList': fn_getUsableBusAccountInfoList,  //获得可用的企业签名列表
    'GET /getResignAppList': fn_getResignAppList,  //获得账号签名的app列表

    'POST /changeBusAccountStatu': fn_changeBusAccountStatu, //修改企业账号的状态
    'POST /changeBusAccountTip': fn_changeBusAccountTip, //修改企业账号的备注
    'POST /addBusAccount': fn_addBusAccount, //添加企业账号
    'POST /resignIpaList': fn_resignIpaList //一键重签名
};