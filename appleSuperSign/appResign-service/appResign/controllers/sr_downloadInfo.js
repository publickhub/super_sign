
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')


//获得本日下载数
var fn_getDownloadSize = async (ctx, next) => {

    var size = await mysql.get_download_size_today();
    var resData = { size: size[0].size }

    ctx.response.body = pbRes.resoponeSuccess(ctx, resData);

};

var fn_getDownLoadRecord = async (ctx, next) => {
    var user_id = ctx.session.user;
    var appid = ctx.request.query.appId;
    var channel = ctx.request.query.channel;

    //判断session
    if (user_id == undefined) {
        //无权限
        ctx.status = 401;
        return;
    }

    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;

    //获得渠道列表
    var channelData = await mysql.get_download_record_channel_list(appid);


    var data = await mysql.get_download_record(channel,appid,parseInt(pageNum),parseInt(pageSize));
    var size = await mysql.get_download_record_size(channel,appid);

    if (size.length < 1) {
        var resData = {
            size: 0,
            data: [],
            channelData:[]
        }
        ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
        return;
    }

    var resData = {
        size: size[0].size,
        data: data,
        channelData:channelData
    }
    ctx.response.body = pbRes.resoponeSuccess(ctx, resData)
};



module.exports = {
    'GET /getDownloadSizeToday': fn_getDownloadSize,
    'GET /getDownLoadRecord': fn_getDownLoadRecord,

};