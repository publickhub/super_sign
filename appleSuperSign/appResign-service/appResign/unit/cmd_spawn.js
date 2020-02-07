var iconv = require("iconv-lite");
var spawn = require("child_process").spawn;
const uuid = require('node-uuid');
var shell = require('shelljs');
const mysql = require('../DBConnet/DB_connet');

global.processObjList = {};

class cmdSpawn {
    constructor () {

    }

    check_cer_statu(bundleID,callback){
        var processObj = spawn("./ausign", ["--cert","fastlane/"+bundleID+".p12","-p","123456"]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            console.log(output);
            callback (output);

        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));

            callback ("-1");
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            //callback (code);
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
    }

  
    add_apple_id(userName,userPassword,bundle,digitCode,callback) {


        var processObj = spawn("fastlane", ["login","user:"+userName,"pwd:"+userPassword,"bundleid:"+bundle]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..
        processObjList[userName] = processObj;
        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");

            //判断是否需要二次验证
            if (output.indexOf('Please enter the 6 digit code:') != -1) {
                    console.log("触发二次验证");
                    console.log(processObj.pid);
                    callback ("999");
            }

            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));
            callback (iconv.decode(data, "gbk"));
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback ("0");
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
}

    //更新UDID
    add_udid(userName,userPassword,udidInfo,bundle,callback) {
        console.log(udidInfo)
        var processObj = spawn("fastlane", ["addUDID","user:"+userName,"pwd:"+userPassword,"udid:"+udidInfo, "bundleid:"+bundle,"cid:"+uuid.v4()]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));
            callback (data);
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback (code);
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
}



    resign(bundleID,apple_id,ipa_path,udid,callback) {
        var processObj = spawn("./ausign", ["--sign",ipa_path,"-c","fastlane/"+bundleID+".p12","-m","fastlane/"+bundleID+".mobileprovision","-o","www/resignIpa/"+bundleID+apple_id+udid+ ".ipa","-p","123456"]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..
		//var processObj = spawn("../../home/zsign/zsign", ["-k","fastlane/"+bundleID+".p12","-m","fastlane/"+bundleID+".mobileprovision","-o","www/resignIpa/"+bundleID+apple_id+udid+ ".ipa","-p","123456","-z","9",ipa_path]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));

            callback ("-1");
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback ("0");
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
            //callback ("0");

        });
    }

    resignBs(ipaId,p12Path,p12Password,mpPath,ipa_path,callback) {

        var processObj = spawn("./ausign", ["--sign",ipa_path,"-c",p12Path,"-m",mpPath,"-o","www/resignIpa/"+ipaId+ ".ipa","-p",p12Password]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));

            callback ("-1");
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback (code);
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
    }

    check_device(userName,userPassword,callback){
        var processObj = spawn("fastlane", ["updateDeviceNum","user:"+userName,"pwd:"+userPassword]); 

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            
            if( output.indexOf("devicenum") >= 0){
                var arr=output.split('--');
                callback ({
                    statu:"1",
                    message:"执行完成",
                    data:arr[1]
                });
            }
            
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));

            callback ({
                statu:"-1",
                message:"执行失败",
                data:iconv.decode(data, "gbk")
            });
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
    }

    pem_to_p12(bundle,callback){ 
        var processObj = spawn("openssl", ["pkcs12","-passout","pass:123456","-export","-inkey","fastlane/ios.key","-in","fastlane/" + bundle +".pem","-out","fastlane/"+bundle+".p12"]);

        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
        
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));
            callback("-1")
          
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback("0")

        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
    }

    resignMobileConfig(id,callback){
        if (shell.exec('openssl smime -sign -in  fastlane/'+id+'.mobileconfig -out www/itms/'+id+'.mobileconfig -signer  fastlane/ssl.crt -inkey fastlane/ssl.key  -certfile fastlane/bundle.crt -outform der -nodetach').code !== 0) {
            shell.echo('Error:mobileConfig签名失败');
            shell.exit(1);
            callback("-1")

        }
        else
        {
            callback("0")
        }
    }

    //注入包
    injectDylib(ipa_path,callback) {
        var processObj = spawn("./ausign", ["--alib",ipa_path,"-i","public/dylib/libWJHook.dylib"]); // 这个方法后面有个参数可以指定编码, 我这设置没有用..


        // 监听执行命令输出内容事件
        processObj.stdout.on("data", function(thunk) {
            var output = iconv.decode(thunk, "utf-8");
            console.log(output);
        });

        processObj.stderr.on("data", function(data) {
            console.log("stderr: ", iconv.decode(data, "gbk"));

            callback ("-1");
        });

        processObj.on("close", function(code) {
            console.log("close: ", code);
            callback (code);
        });

        processObj.on("exit", function(code) {
            console.log("exit: ", code);
        });
    }
}



module.exports = new cmdSpawn()