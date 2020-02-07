const fs = require('fs');
const path = require('path');
var xmlreader = require("xmlreader");
var sd = require('silly-datetime');
const uuid = require('node-uuid');

const mysql = require('../DBConnet/DB_connet')
const cmd_span = require('../unit/cmd_spawn');
var config = require('../config/config.js')
var aliyunOSS = require('../unit/aliyunOSS')

//添加udid
var fn_getudid = async (ctx, next) => {
    var beginTimeTmp = +new Date();

    //解析苹果回传的UDID
    var data = await parseData(ctx);
    var index = data.lastIndexOf("<?xml");
    var index1 = data.lastIndexOf("</plist>");
    var xmlData = data.substring(index, index1 + 8);

    var xmlRespone = await readXmlFile(xmlData);

    //获取用户信息并存入数据库

    var IMEI, PRODUCT, SERIAL, UDID, VERSION;

    var keyData = xmlRespone.plist.dict.key.array;
    for (var i = 0; i < keyData.length; i++) {
        var key = keyData[i].text();

        if (key == "IMEI") {
            IMEI = xmlRespone.plist.dict.string.array[i].text();
        } else
            if (key == "PRODUCT") {
                PRODUCT = xmlRespone.plist.dict.string.array[i].text();
            } else
                if (key == "SERIAL") {
                    SERIAL = xmlRespone.plist.dict.string.array[i].text();
                } else
                    if (key == "UDID") {
                        UDID = xmlRespone.plist.dict.string.array[i].text();
                    } else
                        if (key == "VERSION") {
                            VERSION = xmlRespone.plist.dict.string.array[i].text();
                        }
    }

    var TIME = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    console.log("IMEI ：" + IMEI + "  PRODUCT" + PRODUCT + "  UDID" + UDID + "  VERSION" + VERSION);

    //udid插入数据库
    await mysql.update_udid_info(UDID, PRODUCT, IMEI, VERSION, TIME);


    //获取当前appleID
    console.log( unescape(ctx.req.url));
    //获取当前appleID
    var appId = getQueryString("id", unescape(ctx.req.url));
    var channel = getQueryString("channel", unescape(ctx.req.url));
    if (channel == null){
        channel = "Default";
    }

    //判断当前apple是否有权限继续下载

    var ipa_info = await mysql.get_app_udid_info(appId);

    if (ipa_info.length < 1) {
        showError301(ctx, "要下载的包不存在")
        console.log("要下载的包不存在!");
        return;
    }
    //检查app状态
    if (ipa_info[0].statu == 0 || ipa_info[0].admin_check == 0) {
        showError301(ctx, "应用被锁定，请联系管理员")
        console.log("应用被锁定，请联系管理员");
        return;
    }

    //获得要下载的包的信息
    var ipa_info_dic = ipa_info[0];
    var bundle_id = ipa_info_dic.bundle_id;
    var ipa_path = ipa_info_dic.ipa_path;
    var ipa_id = ipa_info_dic.id;

    var max_udid = ipa_info_dic.max_udid;
    var udid_inuse = ipa_info_dic.udid_inuse;

    if (max_udid <= udid_inuse) {
        //判断当前UDID是否在APP下
        var check_udid = await mysql.get_udid_in_app(appId, UDID);
        if (check_udid.length < 1) {
            showError301(ctx, "App可用数量已达最大限制，请联系管理员")
            console.log("App可用数量已达最大限制，请联系管理员");
            return;
        }
    }

    //判断用户是否还有能用的uuid
    var userinfo = await mysql.get_user_Info(ipa_info_dic.user_id);
    if (userinfo.length < 1) {
        showError301(ctx, "用户关系不存在")
        console.log("用户关系不存在");
        return;
    }

	

    console.log(userinfo[0])
    if (userinfo[0].statu != 0 || userinfo[0].is_delect != 0) {
        showError301(ctx, "用户状态异常，请联系超管")
        console.log("用户状态异常，请联系超管");
        return;
    }
    

    var userUDIDList = await mysql.get_user_udid_list(ipa_info_dic.user_id);
    console.log(userUDIDList.length);
    console.log(userinfo[0].udid_count < userUDIDList.length);
    if (userinfo[0].udid_count <= userUDIDList.length) {
        showError301(ctx, "App可用数量已达最大限制，请联系管理员")
        console.log("App可用数量已达最大限制，请联系管理员");
        return;
    }


    //查询udid 是否存在于某个appleID 下
    var udid_data = await mysql.check_udid_info(UDID);
    var appleInfo = udid_data[0].apple_id;


    //插入下载记录
    await mysql.insert_download_record(ipa_id, UDID,channel);

    console.log("查询用户关联的账号信息 -- " + appleInfo);

    //被查询的用户已经存在
    if (appleInfo != "" && appleInfo != null) {
        console.log("udid 已经存在");

        var appData = await mysql.get_appleid_info(appleInfo);

        if (appData.length < 1) {
            console.log("对应账号状态异常，重新挂靠账号");
            await newUdid(UDID, appId, ipa_path,beginTimeTmp,ctx);

            return;
        }

        if(appData[0].is_delect == 1 || appData[0].statu == 0){
            console.log("对应账号状态异常，重新挂靠账号");
            await newUdid(UDID, appId, ipa_path,beginTimeTmp,ctx);

        }

        console.log(appData);
        var apple_bundle = appData[0].bundle_id;
        console.log(ipa_path)

        //开始重签名
        var resignRes = await resignIPA(apple_bundle, appId, ipa_path,UDID);

        if (resignRes != "0") {
            console.log("重签名出错 --" + resignRes);
            showError301(ctx, "重签名出错" + resignRes);
            return;
        }
        //重签名后文件上传oss
        var FileName = apple_bundle.replace(/\./g, '');
        console.log(FileName)

        var beginTime = +new Date();

        var uploadFile = await aliyunOSS.OSSPutFile(FileName + appId + UDID + ".ipa", "www/resignIpa/" + apple_bundle + appId + UDID + ".ipa");

        var endTime = +new Date();
        console.log("上传" + (endTime - beginTime) + "ms");
        console.log("操作总耗时" + (endTime - beginTimeTmp) + "ms");

        console.log("重签名成功");
        ctx.status = 301;
        ctx.redirect(config.serviceUrl + '/down.html?id=' + appId + '&itemService=https%3a%2f%2fwww.n4n00.com%2fappservice%2finstallItms%3fid%3d'+bundle_id+'%26ck%3d' + FileName + appId +UDID);

        //ctx.redirect(config.serviceUrl + '/down.html?id=' + appId + '&itemService=itms-services%3A%2F%2F%3Faction%3Ddownload-manifest%26url%3Dhttps%3A%2F%2Fwww.n4n00.com%2Fappservice%2FinstallItms%3F' + FileName + appId +UDID);
        ctx.response.body = 'Moved Permanently';

    }
    else {
        console.log("udid 不存在");
        await newUdid(UDID, appId, ipa_path,beginTimeTmp,ctx);
    }

};
function getQueryString(name,url) {
    var $_GET = new Array();
    var u=url;
    u=u.split('?');
    if(typeof(u[1]) == 'string'){
        u=u[1].split('&');
        for(i=0;i<u.length;i++){
            s=u[i].split("=");
            eval('$_GET["' + s[0] + '"]' + '="' + s[1]+'"');
        }
    }
    return $_GET[name];
}

async function newUdid(UDID, appId, ipa_path,beginTimeTmp,ctx){

        //查找剩余数量不为0,且可用的的appleID
        var appData = await mysql.select_appleid_inUse();
        if (appData.length < 1) {
            console.log("没有可用的账号");
            showError301(ctx,"没有可用的账号");
            return;
        }

        var appDataDic = appData[0];
        var apple_account = appDataDic.apple_account;
        var apple_password = appDataDic.apple_password;
        var appid_bundle = appDataDic.bundle_id;

        console.log("当前用户使用账号:" + apple_account + "udud:" + UDID);

        var udidRes = await addUdidMsg(apple_account, apple_password, UDID, appid_bundle);
        if (udidRes != "0") {
            showError301(ctx,"更新UDID出错" + udidRes);
            return;
        }

        //更新udid
        await mysql.update_udid_account(apple_account, UDID);

        //检查剩余数量
        var res = await resignAppleId(apple_account, apple_password);
        console.log(res);

        console.log(res.statu != "1");

        if (res.statu = "1") {
            var device = 100 - ~~res.data;
            if (device<2){
            	device = 2;
            	}
            console.log(device);
            var data = await mysql.update_device_num(apple_account, device);
        }


        //开始重签名
        var resignRes = await resignIPA(appid_bundle, appId, ipa_path,UDID);
        if (resignRes != "0") {
            showError301(ctx,"重签名出错" + udidRes);
            return;
        }
        console.log("重签名成功");
        var beginTime = +new Date();

        //重签名后文件上传oss
        var FileName = appid_bundle.replace(/\./g, '');
        console.log(FileName)
        var uploadFile = await aliyunOSS.OSSPutFile(FileName + appId + UDID + ".ipa", "www/resignIpa/" + appid_bundle + appId + UDID + ".ipa");
        var endTime = +new Date();
        console.log("上传" + (endTime - beginTime) + "ms");
        console.log("操作总耗时" + (endTime - beginTimeTmp) + "ms");

        ctx.status = 301;
        ctx.redirect(config.serviceUrl + '/down.html?id=' + appId + '&itemService=https%3a%2f%2fwww.n4n00.com%2fappservice%2finstallItms%3fid%3d'+appid_bundle+'%26ck%3d' + FileName + appId +UDID);

        //ctx.redirect(config.serviceUrl + '/down.html?id=' + appId + '&itemService=itms-services%3A%2F%2F%3Faction%3Ddownload-manifest%26url%3Dhttps%3A%2F%2Fwww.n4n00.com%2Fappservice%2FinstallItms%3F' + FileName + appId + UDID);
        ctx.response.body = 'Moved Permanently';
}

function showError301(ctx, errMsg) {
    ctx.status = 301;
    ctx.redirect(config.serviceUrl + '/error.html?msg=' + encodeURI(encodeURI(errMsg)));
    ctx.response.body = errMsg;
}

function resignIPA(bundle_id, apple_id, ipa_path, udid) {
    return new Promise(function (resolve, reject) {
        cmd_span.resign(bundle_id, apple_id, ipa_path,udid, function (data) {
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

function addUdidMsg(apple_account, apple_password, UDID, bundle_id) {
    return new Promise(function (resolve, reject) {
        cmd_span.add_udid(apple_account, apple_password, UDID, bundle_id, function (data) {
            console.log(data);
            if (data = "0") {
                //
                resolve("0");
            }
            else {
                reject(data);
            }
        });

    });
}

function readXmlFile(xmlData) {
    return new Promise(function (resolve, reject) {
        xmlreader.read(xmlData, async function (errors, response) {
            if (null !== errors) {
                reject(errors);
                return;
            }
            resolve(response);
        });
    });
}

function resignAppleId(name, password) {
    return new Promise(function (resolve, reject) {
        cmd_span.check_device(name, password, function (data) {
            console.log(data);
            resolve(data);
        });

    });
}

function parseData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let str = ''
            ctx.req.on('data', (data) => {
                str += data
            })
            ctx.req.addListener('end', () => {
                resolve(str)
            })
        } catch (err) {
            reject(err)
        }
    });
}


module.exports = {
    'POST /getudid': fn_getudid,



};