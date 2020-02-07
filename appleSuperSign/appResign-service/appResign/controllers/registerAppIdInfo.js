const fs = require('fs');
const path = require('path');
const mysql = require('../DBConnet/DB_connet');
const cmd_span = require('../unit/cmd_spawn');
const IO = require('koa-socket')
const uuid = require('node-uuid');
var iconv = require("iconv-lite");
const pbRes = require('../unit/publicResponse')

//添加苹果账号
var fn_setAppleId = async (ctx, next) => {
    var
    name = ctx.request.body.account || '',
    password = ctx.request.body.pwd || '',
    tipMsg = ctx.request.body.tip || '',
    digitCode = ctx.request.body.code || '',
    appBundleId = ctx.request.body.bundle;

    //查询账号是否已经存在
    var checkApple = await mysql.check_appleid_info(name);
    if(checkApple.length>0){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,"账号已存在");
        return;
    }

    if (digitCode != ""){
        var processObj = processObjList[name];
        console.log(processObj.pid);
        console.log("写入验证码 --" + digitCode);
        var res = await input_digitCode(processObj,digitCode);

        if (res != "0"){
            ctx.response.body = pbRes.resoponeError(200,ctx,999,res);
            return;
        }
    }
    else
    {
        console.log(`添加苹果账号 with name: ${name}, password: ${password}`);
        appBundleId = "com.iosdeveloper.test" + uuid.v4();

        var res = await addAppleId(name,password,appBundleId,digitCode);
        console.log("res ===" +res);
        if (res == "999"){
            var resData = {code:999,bundle:appBundleId}
            ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
            return;
        }
        if (res != "0"){
            ctx.response.body = pbRes.resoponeError(200,ctx,999,res);
            return;
        }
    }

    //证书转换
    var data = await pemToP12(appBundleId);

    //检查剩余数量
    var res = await resignAppleId(name,password);
    console.log(res);

    console.log(res.statu != "1");

    if(res.statu != "1"){
        ctx.response.body = pbRes.resoponeError(200,ctx,999,res);
        return;
    }
    var device = 100 - ~~res.data;
    var createrTime = (new Date()).getTime();

    console.log(device);

    var data = await mysql.insert_appleid_info(name,password,device.toString(),createrTime,tipMsg,appBundleId);

    var resData = {code:0}
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
    return;
};

function input_digitCode(processObj,digitCode) {
    return new Promise(function(resolve,reject) {
        processObj.stdin.write(digitCode + '\n');

        processObj.stderr.on("data", function(data) {
        console.log("stderr: ", iconv.decode(data, "gbk"));
        reject (data);
     });

        processObj.on("close", function(code) {
        console.log("close: ", code);
        resolve("0");

      });
    });

}

function pemToP12(bundle) {
    return new Promise(function(resolve,reject) {
        cmd_span.pem_to_p12(bundle,function (data) {
            console.log(data);
                //执行重签名
                resolve(data);
        });

    });
}

function resignAppleId(name,password) {
    return new Promise(function(resolve,reject) {
        cmd_span.check_device(name,password,function (data) {
            console.log(data);
                //执行重签名
                resolve(data);
        });

    });
}

function addAppleId(name,password,bundle,digitCode) {
    return new Promise(function(resolve,reject) {
        cmd_span.add_apple_id(name,password,bundle,digitCode,function (data) {
            console.log("cmd_span" + data == "999");
            if (data == "0") {
                //执行重签名
                resolve("0");
            }
            else if (data == "999") {
                //执行重签名
                resolve("999");
            }
            else
            {
                resolve(data);
            }
           
        });

    });
}


module.exports = {
    'POST /registerAppId': fn_setAppleId,
};