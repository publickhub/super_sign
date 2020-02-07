const fs = require('fs');
const path = require('path');
const IpaParser = require('app-info-parser/src/ipa')
const ApkParser = require('app-info-parser/src/apk')

const uuid = require('node-uuid');
var config = require('../config/config.js')
const mysql = require('../DBConnet/DB_connet')
const cmd_span = require('../unit/cmd_spawn');
const pbRes = require('../unit/publicResponse')
var zipper = require("zip-local");
const Hashids = require('hashids/cjs');
const hashids = new Hashids()
var config = require('../config/config.js')
var aliyunOSS = require('../unit/aliyunOSS')

//上传文件
var fn_uploadApp = async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    if (file.size == 0) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "没有选择文件");
        return;
    }
    const reader = fs.createReadStream(file.path);
    var uploadTime = (new Date()).getTime();

    let filePath = path.join(__dirname, '../public/upload') + `/${uploadTime}${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    await reader.pipe(upStream);
    const parser = new IpaParser(filePath);

    //这里不延时执行会出现诡异的问题
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500);
    try {
        var ipa_info = await readIpaInfo(parser);
        var app_name = ipa_info.CFBundleDisplayName;
        var bundleId = ipa_info.CFBundleIdentifier;
        var MinimunOS = ipa_info.MinimumOSVersion;
        var iconBase64 = ipa_info.icon;
        var createrTime = (new Date()).getTime();
        var exTime = createrTime + 24 * 60 * 60 * 1000 * config.defualt_ex_time;
        var statu = "1";
        var ipaPath = path.join('public/upload') + `/${uploadTime}${file.name}`;
        var user_id = user_id;
        //数据插入到数据库 ipa临时表
        var re_data = await mysql.insert_ipa_info_tmp(app_name, bundleId, MinimunOS, statu, createrTime, iconBase64, ipaPath);

        //查询应用数据并返回
        var resData = await mysql.get_ipa_info_tmp(re_data.insertId);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData[0])
    }
    catch (e) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "App解析错误");

    }

};


//上传文件
var fn_uploadAndroidApp = async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    if (file.size == 0) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "没有选择文件");
        return;
    }
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    var uploadTime = (new Date()).getTime();

    let filePath = path.join(__dirname, '../www/apk') + `/${uploadTime}${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    await reader.pipe(upStream);

    const parser = new ApkParser(filePath);

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await delay(500);
    try {
        var ipa_info = await readApkInfo(parser);
        var app_name = ipa_info.application.label;
        var bundleId = ipa_info.package;
        var version = ipa_info.versionName;
        var iconBase64 = ipa_info.icon;
        var createrTime = (new Date()).getTime();
        var statu = "1";
        var ipaPath = path.join('apk') + `/${uploadTime}${file.name}`;
        //数据插入到数据库 ipa临时表
        var re_data = await mysql.insert_apk_info_tmp(app_name, bundleId, version, statu, createrTime, iconBase64, ipaPath);

        //查询应用数据并返回
        var resData = await mysql.get_apk_info_tmp(re_data.insertId);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData[0])
    }
    catch (e) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "App解析错误");

    }

};

//保存应用
var fn_saveAndroidAppInfo = async (ctx, next) => {

    var user_id = ctx.session.user;

    //要更新的appID
    var appId = ctx.request.body.id;
    //app信息 - 临时表id
    var tmpId = ctx.request.body.tmpId;
    var tip = ctx.request.body.tip;
    var actionType = ctx.request.body.actionType;  //1:更新  2：新包

    if (tip == null) {
        tip = "";
    }

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //常规校验
    if (actionType == undefined) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
        return;
    }

    //处理插入操作
    if (actionType == 2) {
        //从临时表读取app信息
        var tmpAppInfo = await mysql.get_apk_info_tmp(tmpId);
        if (tmpAppInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
            return;
        }

        var fileName = uuid.v4() + ".apk";

        //上传到阿里云
        var uploadFile = await aliyunOSS.OSSPutFile(fileName, "www/" + tmpAppInfo[0].ipa_path);


        //保存数据到数据库 // apple_name,bundle_id,minimun_OS,statu,creater_time,icon_Base64,ipa_path,tip
        var resData = await mysql.insert_apk_info(tmpAppInfo[0].app_name, tmpAppInfo[0].bundle_id, tmpAppInfo[0].app_version, tmpAppInfo[0].statu, tmpAppInfo[0].creater_time, tmpAppInfo[0].icon_base64, config.ossDomain+fileName, tip, user_id);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
    }
    else
    //处理更新操作
    {
        //检查应用是否存在
        var appInfo = await mysql.get_apk_info(appId);
        var tmpAppInfo = await mysql.get_apk_info_tmp(tmpId);

        if (appInfo.length < 1 || tmpAppInfo.length < 1) {
            //拒绝访问
            ctx.status = 403;
            return;
        }

        //检查是否有权限操作
        if (appInfo[0].user_id != user_id) {
            //无权限
            ctx.status = 401;
            return;
        }

        var fileName = uuid.v4() + ".apk";
        //上传到阿里云
        var uploadFile = await aliyunOSS.OSSPutFile(fileName, "www/" + tmpAppInfo[0].ipa_path);

        var update_time = (new Date()).getTime();

        //执行更新操作 //apple_name,minimun_OS,update_time, icon_Base64, ipa_path, tip,app_id
        var resData = await mysql.update_apk_info(tmpAppInfo[0].app_name, tmpAppInfo[0].app_version, update_time, tmpAppInfo[0].icon_base64,config.ossDomain+fileName, tip, appId);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
    }
};


//保存应用
var fn_saveAppInfo_sr = async (ctx, next) => {

    var user_id = ctx.session.user;

    //要更新的appID
    var appId = ctx.request.body.id;
    //app信息 - 临时表id
    var tmpId = ctx.request.body.tmpId;
    var tip = ctx.request.body.tip;
    var actionType = ctx.request.body.actionType;  //1:更新  2：新包

    if (tip == null) {
        tip = "";
    }

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //常规校验
    if (actionType == undefined) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
        return;
    }

    //处理插入操作
    if (actionType == 2) {
        //从临时表读取app信息
        var tmpAppInfo = await mysql.get_ipa_info_tmp(tmpId);
        if (tmpAppInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
            return;
        }
        //保存数据到数据库 // apple_name,bundle_id,minimun_OS,statu,creater_time,icon_Base64,ipa_path,tip
        var resData = await mysql.insert_ipa_info_superResign(tmpAppInfo[0].app_name, tmpAppInfo[0].bundle_id, tmpAppInfo[0].minimun_OS, tmpAppInfo[0].statu, tmpAppInfo[0].creater_time, tmpAppInfo[0].icon_base64, tmpAppInfo[0].ipa_path, tip, user_id);

        // //写入特殊文件
        // var tmpData = await injectFileToIpa(tmpAppInfo[0].ipa_path, resData.insertId)
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        // await delay(500);
        // //注入套路包
        // var tmpData1 = await injectDylib(tmpAppInfo[0].ipa_path)

        var appInfo = await mysql.get_app_info(resData.insertId);
        //制作XML文件
        var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n" +
            "<plist version=\"1.0\">\n" +
            "    <dict>\n" +
            "        <key>PayloadContent</key>\n" +
            "        <dict>\n" +
            "            <key>URL</key>\n" +
            "            <string>" + "https://www.n4n00.com/appservice/getudid?id=" + appInfo[0].id + "</string>" +
            "            <key>DeviceAttributes</key>\n" +
            "            <array>\n" +
            "                <string>SERIAL</string>\n" +
            "                <string>MAC_ADDRESS_EN0</string>\n" +
            "                <string>UDID</string>\n" +
            "                <string>IMEI</string>\n" +
            "                <string>ICCID</string>\n" +
            "                <string>VERSION</string>\n" +
            "                <string>PRODUCT</string>\n" +
            "            </array>\n" +
            "        </dict>\n" +
            "        <key>PayloadOrganization</key>\n" +
            "        <string>" + "授权安装进入下一步" + "</string>  <!--组织名称-->\n" +
            "        <key>PayloadDisplayName</key>\n" +
            "        <string>" + appInfo[0].app_name + "--[点击安装]" + "</string>  <!--安装时显示的标题-->\n" +
            "        <key>PayloadVersion</key>\n" +
            "        <integer>1</integer>\n" +
            "        <key>PayloadUUID</key>\n" +
            "        <string>" + uuid.v1() + "</string>  <!--自己随机填写的唯一字符串-->\n" +
            "        <key>PayloadIdentifier</key>\n" +
            "        <string>online.iizvv.profile-service</string>\n" +
            "        <key>PayloadDescription</key>\n" +
            "        <string>Apple Authorized Mobile Service Design</string>   <!--描述-->\n" +
            "        <key>PayloadType</key>\n" +
            "        <string>Profile Service</string>\n" +
            "    </dict>\n" +
            "</plist>";

        var w_data = new Buffer(xml);

        //签名xml文件，需要在正式服务器上才能运行
        await writeConfig(appInfo[0].id, w_data);
        await resignAppleId(appInfo[0].id);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, appInfo)


    }
    else
    //处理更新操作
    {
        //检查应用是否存在
        var appInfo = await mysql.get_app_info(appId);
        var tmpAppInfo = await mysql.get_ipa_info_tmp(tmpId);

        if (appInfo.length < 1 || tmpAppInfo.length < 1) {
            //拒绝访问
            ctx.status = 403;
            return;
        }

        //检查是否有权限操作
        if (appInfo[0].user_id != user_id) {
            //无权限
            ctx.status = 401;
            return;
        }

        //判断是否同bundleID
        if (appInfo[0].bundle_id != tmpAppInfo[0].bundle_id) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "不同bundleID的应用无法更新! 请选择新增应用");
            return;
        }

        var update_time = (new Date()).getTime();

        //执行更新操作 //apple_name,minimun_OS,update_time, icon_Base64, ipa_path, tip,app_id
        var resData = await mysql.update_ipa_info_superResign(tmpAppInfo[0].app_name, tmpAppInfo[0].minimun_OS, update_time, tmpAppInfo[0].icon_base64, tmpAppInfo[0].ipa_path, tip, appId);

        // //写入特殊文件
        // var tmpData = await injectFileToIpa(tmpAppInfo[0].ipa_path, appId)
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        // await delay(500);
        // //注入套路包
        // var tmpData1 = await injectDylib(tmpAppInfo[0].ipa_path)

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
    }
};


function writeConfig(id, w_data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile("./fastlane/" + id + ".mobileconfig", w_data, { flag: 'a' }, function (err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log('写入成功');
                resolve();
            }
        });
    });
}


function resignAppleId(id) {
    return new Promise(function (resolve, reject) {
        cmd_span.resignMobileConfig(id, function (data) {
            console.log(data);
            resolve(data);
        });

    });
}

function readIpaInfo(parser) {
    return new Promise(function (resolve, reject) {
        parser.parse().then(result => {
            resolve(result);
        }).catch(err => {
            console.log('err ----> ', err)
            reject(data);
        })
    });
}

function readApkInfo(parser) {
    return new Promise(function (resolve, reject) {
        parser.parse().then(result => {
            resolve(result);
        }).catch(err => {
            console.log('err ----> ', err)
            reject(data);
        })
    });
}


//保存企业应用
var fn_saveAppInfo_bs = async (ctx, next) => {

    var user_id = ctx.session.user;

    //要更新的appID
    var appId = ctx.request.body.id;
    //app信息 - 临时表id
    var tmpId = ctx.request.body.tmpId;
    var tip = ctx.request.body.tip;
    var actionType = ctx.request.body.actionType;  //1:更新  2：新包

    if (tip == null) {
        tip = "";
    }

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }
    //常规校验
    if (actionType == undefined) {
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
        return;
    }

    //处理插入操作
    if (actionType == 2) {
        //从临时表读取app信息
        var tmpAppInfo = await mysql.get_ipa_info_tmp(tmpId);
        if (tmpAppInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "信息提交错误");
            return;
        }

        //读取可用的企业证书
        var tmpBsInfo = await mysql.get_bus_account_info_usable();
        if (tmpBsInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "当前没有可用的企业证书，请联系超管获得帮助");
            return;
        }
        var p12Path = tmpBsInfo[0].p12_path;
        var p12Password = tmpBsInfo[0].password;
        var mpPath = tmpBsInfo[0].mobileprovision_path;
        var appid = uuid.v4();

        //保存数据到数据库 // apple_name, bundle_id, minimun_OS, statu, creater_time, icon_Base64, ipa_path, tip, user_id
        var resData = await mysql.insert_ipa_info_bs(tmpAppInfo[0].app_name, tmpAppInfo[0].bundle_id, tmpAppInfo[0].minimun_OS, tmpAppInfo[0].statu, tmpAppInfo[0].creater_time, tmpAppInfo[0].icon_base64, config.serviceUrl + '/appservice/resignIpa/' + appid + '.ipa', tip, user_id,tmpBsInfo[0].id);

        // //写入特殊文件
        // var tmpData = await injectFileToIpa(tmpAppInfo[0].ipa_path, resData.insertId)
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        // await delay(500);
        // //注入套路包
        // var tmpData1 = await injectDylib(tmpAppInfo[0].ipa_path)

        console.log("写入套路文件")

        //执行重签名操作 //ipaId, p12Path, p12Password, mpPath, ipa_path
        var resignRes = await resignBsIPA(appid, p12Path, p12Password, mpPath, tmpAppInfo[0].ipa_path);
        if (resignRes != "0") {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "包处理失败!");
            return;
        }

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData)

    }
    else
    //处理更新操作
    {
        //检查应用是否存在
        var appInfo = await mysql.get_app_info(appId);
        var tmpAppInfo = await mysql.get_ipa_info_tmp(tmpId);

        if (appInfo.length < 1 || tmpAppInfo.length < 1) {
            //拒绝访问
            ctx.status = 403;
            return;
        }

        //检查是否有权限操作
        if (appInfo[0].user_id != user_id) {
            //无权限
            ctx.status = 401;
            return;
        }

        //判断是否同bundleID
        if (appInfo[0].bundle_id != tmpAppInfo[0].bundle_id) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "不同bundleID的应用无法更新! 请选择新增应用");
            return;
        }

        //查询用户余额
        var userInfo = await mysql.get_user_Info(user_id);
        if (userInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "用户不存在");
            return;
        }

        var userCoin = userInfo[0].coin;

        //查询续费单价
        var sysData = await mysql.get_sys_config_info();
        var updateApp = sysData[0].coin_to_update;

        //判断用户是否有钱购买
        if (updateApp > userCoin) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "余额不足");
            return;
        }

        //执行购买流程
        var user_coin_new = userCoin - updateApp;
        var ipaddr = ctx.request.ip;
        var time = (new Date()).getTime();

        //插入操作记录 //userId, amount,amount_early,creater_time,type,app_id,ip_addr
        var consumeData = await mysql.insert_consume_record(user_id, updateApp, userCoin, time, "2", "", ipaddr);

        //更新用户余额
        var tmpData = await mysql.update_user_amount(user_id, user_coin_new);


        //读取可用的企业证书
        var tmpBsInfo = await mysql.get_bus_account_info_usable();
        if (tmpBsInfo.length < 1) {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "当前没有可用的企业证书，请联系超管获得帮助");
            return;
        }
        var p12Path = tmpBsInfo[0].p12_path;
        var p12Password = tmpBsInfo[0].password;
        var mpPath = tmpBsInfo[0].mobileprovision_path;
        var appid = uuid.v4();


        var update_time = (new Date()).getTime();

        // //写入特殊文件
        // var tmpData = await injectFileToIpa(tmpAppInfo[0].ipa_path, appInfo[0].id)
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        // await delay(500);
        // //注入套路包
        // var tmpData1 = await injectDylib(tmpAppInfo[0].ipa_path)
        console.log("写入套路文件")

        //执行重签名操作 //ipaId, p12Path, p12Password, mpPath, ipa_path
        var resignRes = await resignBsIPA(appid, p12Path, p12Password, mpPath, tmpAppInfo[0].ipa_path);
        if (resignRes != "0") {
            ctx.response.body = pbRes.resoponeError(200, ctx, 999, "包处理失败!");
            return;
        }
        //执行更新操作 //apple_name, minimun_OS, update_time, icon_Base64, ipa_path, tip, app_id
        var resData = await mysql.update_ipa_info_bs(tmpAppInfo[0].app_name, tmpAppInfo[0].minimun_OS, update_time, tmpAppInfo[0].icon_base64, config.serviceUrl + '/appservice/resignIpa/' + appid + '.ipa', tip, appId,tmpBsInfo[0].id);

        return ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
    }
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



//渠道包安装配置文件
var fn_installXml = async (ctx, next) => {

    //获得渠道参数
    var channel = ctx.request.query.channel;
    var appId = ctx.request.query.id;

    if(channel.length<1 || appId.length<1){
        ctx.response.body = pbRes.resoponeError(200, ctx, 999, "参数错误");
        return;
    }

    var appInfo = await mysql.get_app_info(appId);

    //写入渠道文件
   // var tmpData = await injectChannelFileToIpa(appInfo[0].ipa_path, channel)
    var link = escape("id=" + appInfo[0].id + "&channel="+ channel);

    //制作XML文件
    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n" +
        "<plist version=\"1.0\">\n" +
        "    <dict>\n" +
        "        <key>PayloadContent</key>\n" +
        "        <dict>\n" +
        "            <key>URL</key>\n" +
        "            <string>" + "https://www.n4n00.com/appservice/getudid?"+ link +"</string>" +
        "            <key>DeviceAttributes</key>\n" +
        "            <array>\n" +
        "                <string>SERIAL</string>\n" +
        "                <string>MAC_ADDRESS_EN0</string>\n" +
        "                <string>UDID</string>\n" +
        "                <string>IMEI</string>\n" +
        "                <string>ICCID</string>\n" +
        "                <string>VERSION</string>\n" +
        "                <string>PRODUCT</string>\n" +
        "            </array>\n" +
        "        </dict>\n" +
        "        <key>PayloadOrganization</key>\n" +
        "        <string>" + "授权安装进入下一步" + "</string>  <!--组织名称-->\n" +
        "        <key>PayloadDisplayName</key>\n" +
        "        <string>" + appInfo[0].app_name + "--[点击安装]" + "</string>  <!--安装时显示的标题-->\n" +
        "        <key>PayloadVersion</key>\n" +
        "        <integer>1</integer>\n" +
        "        <key>PayloadUUID</key>\n" +
        "        <string>" + uuid.v1() + "</string>  <!--自己随机填写的唯一字符串-->\n" +
        "        <key>PayloadIdentifier</key>\n" +
        "        <string>online.iizvv.profile-service</string>\n" +
        "        <key>PayloadDescription</key>\n" +
        "        <string>Apple Authorized Mobile Service Design</string>   <!--描述-->\n" +
        "        <key>PayloadType</key>\n" +
        "        <string>Profile Service</string>\n" +
        "    </dict>\n" +
        "</plist>";

    var w_data = new Buffer(xml);
    var nonStr = uuid.v1();

    //签名xml文件，需要在正式服务器上才能运行
    await writeConfig(appInfo[0].id+nonStr, w_data);
    await resignAppleId(appInfo[0].id+nonStr);

    var data = await readFile('www/itms/'+appInfo[0].id+nonStr+'.mobileconfig');

    ctx.set('Content-Type', 'application/octet-stream')
    ctx.set('content-disposition',`attachment;filename*=UTF-8''app.mobileconfig`);

    ctx.status = 200;
    ctx.response.body = data;
};



var fn_installItms = async (ctx, next) => {

    var checkId = ctx.request.query.ck;

    var id = ctx.request.query.id;
    //获得下载链接

    // var fileUrl =await aliyunOSS.OSSGetFilePath(checkId + ".ipa");

    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>  \n" +
        "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">  \n" +
        "<plist version=\"1.0\">  \n" +
        "<dict>  \n" +
        "    <key>items</key>  \n" +
        "    <array>  \n" +
        "        <dict>  \n" +
        "            <key>assets</key>  \n" +
        "            <array>  \n" +
        "                <dict>  \n" +
        "                    <key>kind</key>  \n" +
        "                    <string>software-package</string>  \n" +
        "                    <key>url</key>  \n" +
        // "                    <string>"+ config.serviceUrl +"/appservice/resignIpa/" + checkId + ".ipa</string>  \n" +
        "                    <string>" + config.ossDomain + checkId + ".ipa" + "</string>  \n" +
        "                </dict>  \n" +
        "            </array>  \n" +
        "            <key>metadata</key>  \n" +
        "            <dict>  \n" +
        "                <key>bundle-identifier</key>  \n" +
        "                <string>" + id +"</string>  \n" +
        "                <key>bundle-version</key>  \n" +
        "                <string>1.0</string>  \n" +
        "                <key>kind</key>  \n" +
        "                <string>software</string>  \n" +
        "                <key>title</key>  \n" +
        "                <string>app</string>\n" +
        "            </dict>  \n" +
        "        </dict>  \n" +
        "    </array>  \n" +
        "</dict>  \n" +
        "</plist>";
    //ctx.set('Content-disposition','attachment;filename=1.plist');
    ctx.set('Content-Type', 'application/octet-stream')


    ctx.response.body = xml;
};


function readFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject(errors);
                return;
            } else {
                resolve(data);
            }
        });

    });
}

function writeConfig(id, w_data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile("./fastlane/" + id + ".mobileconfig", w_data, { flag: 'a' }, function (err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log('写入成功');
                resolve();
            }
        });
    });
}


function resignAppleId(id) {
    return new Promise(function (resolve, reject) {
        cmd_span.resignMobileConfig(id, function (data) {
            console.log(data);
            resolve(data);
        });

    });
}

function injectDylib(ipa_path) {
    return new Promise(function (resolve, reject) {
        cmd_span.injectDylib(ipa_path, function (data) {
            console.log(data);
            resolve(data);
        });

    });
}


async function injectFileToIpa(filePath, channel) {
    var fileRes = await checkFile(filePath+ "tmp");
    if (!fileRes){
        await fs.mkdirSync(filePath + "tmp");

    }
    await zipper.sync.unzip(filePath).save(filePath + "tmp");
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await delay(500);
    //读取文件目录
    var floder = await getFileList(filePath + "tmp/Payload/");
    console.log(floder);
    var appPath = "";
    //取出目标文件夹
    for (var i = 0; i < floder.length; i++) {
        var pathTmp = floder[i];
        if (pathTmp.indexOf(".app") != -1) {
            appPath = pathTmp;
        }
    }
    if (appPath == "") {
        console.log("读取app文件失败");
        return;
    }

    //写入文件
    fs.writeFile(filePath + "tmp/Payload/" + appPath + "/app.txt", id, function (err) {
        if (err) {
            throw err;
        }
        //重新压缩一下
        zipper.sync.zip(filePath + "tmp").compress().save(filePath);
    });
}

async function injectChannelFileToIpa(filePath, channel) {
    var fileRes = await checkFile(filePath+ "tmp");
    if (!fileRes){
        await fs.mkdirSync(filePath + "tmp");

    }

    await zipper.sync.unzip(filePath).save(filePath + "tmp");
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await delay(500);
    //读取文件目录
    var floder = await getFileList(filePath + "tmp/Payload/");
    console.log(floder);
    var appPath = "";
    //取出目标文件夹
    for (var i = 0; i < floder.length; i++) {
        var pathTmp = floder[i];
        if (pathTmp.indexOf(".app") != -1) {
            appPath = pathTmp;
        }
    }
    if (appPath == "") {
        console.log("读取app文件失败");
        return;
    }

    //写入文件
    fs.writeFile(filePath + "tmp/Payload/" + appPath + "/appChannel", channel, function (err) {
        if (err) {
            throw err;
        }
        //重新压缩一下
        zipper.sync.zip(filePath + "tmp").compress().save(filePath);
    });
}

function unzipIpa(path) {
    return new Promise(function (resolve, reject) {
        zipper.sync.unzip(path).save(path + "tmp");
        console.log("解压完成!");
        resolve();
    });
}


function checkFile(filePath) {
    return new Promise(function (resolve, reject) {

        fs.exists(filePath,function(exists){
        if(exists){
            resolve(true);
        }
        if(!exists){
            resolve(false);

        }
    })
    });

}
function getFileList(path) {
    //return new Promise(function (resolve, reject) {

    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function (item, index) {
        let stat = fs.lstatSync(path + "/" + item)
        if (stat.isDirectory() === true) {
            components.push(item)
        }
    })
    return components
    //});
}
module.exports = {
    'POST /uploadApp': fn_uploadApp,
    'POST /uploadAndroidApp': fn_uploadAndroidApp,

    'POST /saveAppInfo_sr': fn_saveAppInfo_sr,

    'POST /saveAppInfo_bs': fn_saveAppInfo_bs,

    'POST /saveApkInfo': fn_saveAndroidAppInfo,

    'GET /installItms': fn_installItms,

    'GET /installXml': fn_installXml,

};