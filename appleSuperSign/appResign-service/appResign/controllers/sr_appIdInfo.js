
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')
const cmd_span = require('../unit/cmd_spawn');

//获得appId
var fn_getAppIdInfoList = async (ctx, next) => {
    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var account = ctx.request.query.account;

    if (pageSize == undefined) {
        pageSize = 10;
    }
    if (pageNum == undefined) {
        pageNum = 1;
    }

    var size = await mysql.get_appid_info_size(account, beginTime, endTime);
    var data = await mysql.get_appid_info_list(account, beginTime, endTime, pageSize, pageNum);

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

//检查appid证书状态-超管
var fn_checkAppIdCer = async (ctx, next) => {
    //获得需要检查的appleId
    var data = await mysql.get_incheck_appid_info_list();

    for (var i = 0; i < data.length; i++) {
        var appleIdTmp = data[i];
        var bundleId = appleIdTmp.bundle_id;
        var appleId = appleIdTmp.apple_account;
        var id = appleIdTmp.id;
        console.log("正在执行账号 -" + appleId + "证书状态检查");

        var result = await check_cer_statu(bundleId);

        if (result != "-1") {
            var jsonData = JSON.parse(result);
            var isOk = jsonData.message.isOK;
            var CertStatus = jsonData.message.CertStatus;

            console.log(isOk);
            console.log(isOk == true);
            console.log(CertStatus);
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();

            await mysql.update_appleId_statu_cert(id, year+"/"+month+"/"+day+" "+hour+":"+minute+" " + CertStatus, isOk == true ? 1 : 0)
        }
        else {
            console.log(appleId + "检测证书状态失败")
        }

    }
    ctx.response.body = pbRes.resoponeSuccess(ctx, [])

};

function check_cer_statu(bundle_id) {
    return new Promise(function (resolve, reject) {
        cmd_span.check_cer_statu(bundle_id, function (data) {
            console.log(data);
            if (data != "-1") {
                //执行重签名
                resolve(data);
            }
            else {
                resolve("-1");
            }
        });

    });
}


//设置appid状态-超管
var fn_setAppIDStatu = async (ctx, next) => {
    var id = ctx.request.body.id;
    var statu = ctx.request.body.statu;

    var re_data = await mysql.update_appleId_statu(id, statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};

var fn_setAppIdErrorStatu = async (ctx, next) => {
    var id = ctx.request.body.id;

    var re_data = await mysql.update_appleId_error_statu(id);
    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};

//删除appId
var fn_delAppIdInfo = async (ctx, next) => {
    var appleId = ctx.request.body.id;

    if (appleId == undefined || appleId == "") {
        //无权限
        ctx.status = 401;
        return;
    }

    var re_data = await mysql.del_appId_info(appleId);

    ctx.response.body = pbRes.resoponeSuccess(ctx, re_data)
};


module.exports = {
    'GET /getAppIdInfoList': fn_getAppIdInfoList,   //获得appleId信息列表

    'POST /setAppIdStatu': fn_setAppIDStatu,      //获得appleId状态
    'POST /setAppIdErrorStatu': fn_setAppIdErrorStatu, //设置appleId错误状态
    'POST /delAppIdInfo': fn_delAppIdInfo,       //删除appleId信息
    'POST /checkAppIdCer': fn_checkAppIdCer       //检查appleId证书状态

};