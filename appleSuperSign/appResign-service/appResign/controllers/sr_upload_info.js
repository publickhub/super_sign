
const fs = require('fs');
const path = require('path');
const pbRes = require('../unit/publicResponse')
var config = require('../config/config.js')

//上传文件
var fn_uploadFile = async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    if (file.size == 0){
        ctx.response.body = pbRes.resoponeError(200,ctx,901);
        return;
    }
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    var uploadTime = (new Date()).getTime();

    let filePath = path.join(__dirname, '../public/upload') + `/${uploadTime}${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    await reader.pipe(upStream);

    var data = filePath

    ctx.response.body = pbRes.resoponeSuccess(ctx,data)
};

var fn_uploadAppImage = async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    if (file.size == 0){
        ctx.response.body = pbRes.resoponeError(200,ctx,901);
        return;
    }
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    var uploadTime = (new Date()).getTime();

    let filePath = path.join(__dirname, '../www/img') + `/${uploadTime}${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    await reader.pipe(upStream);

    var imgPath = config.serviceUrl +"/appservice/img" +  `/${uploadTime}${file.name}`;

    ctx.response.body = pbRes.resoponeSuccess(ctx,imgPath)
};

module.exports = {
    'POST /uploadFile': fn_uploadFile,
    'POST /uploadAppImage': fn_uploadAppImage


};

