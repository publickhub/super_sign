
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')

//获得UDIDinfo
var fn_getUDIDInfoList = async (ctx, next) => {
    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    if(pageSize == undefined){
        pageSize = 10;
    }
    if(pageNum == undefined){
        pageNum = 1;
    }


    var totalNum = await mysql.get_udid_info_size();
    
    var re_data = await mysql.get_udid_info_list(parseInt(pageSize),parseInt(pageNum));

    ctx.response.body =
        JSON.stringify({
            statu:"0",
            message:"查询成功",
            size:totalNum[0].size,
            data:re_data
        });
};

var fn_getSurplusUDID = async (ctx, next) => {
    var totalNum = await mysql.get_Surplus_size();
    var resData = {size:totalNum[0].size}
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData);
};

var fn_changeUDIDStatuAdmin = async (ctx, next) => {

    var
        id = ctx.request.body.id || '',
        statu = ctx.request.body.statu || '';

    var resData = await mysql.update_udid_statu(id,statu);
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData)
};




//获得UDIDinfo
var fn_getUDIDInfoListAdmin = async (ctx, next) => {
    var pageSize = ctx.request.query.size;
    var pageNum = ctx.request.query.num;
    var beginTime = ctx.request.query.beginTime;
    var endTime = ctx.request.query.endTime;
    var udid = ctx.request.query.udid;
    var appleId = ctx.request.query.appleId;

    if(pageSize == undefined){
        pageSize = 10;
    }
    if(pageNum == undefined){
        pageNum = 1;
    }

    var size = await mysql.get_udid_info_list_size_admin(udid,beginTime,endTime,appleId);
    
    var data = await mysql.get_udid_info_list_admin(udid,beginTime,endTime,pageSize,pageNum,appleId);

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


module.exports = {
    'GET /getUDIDInfoList': fn_getUDIDInfoList,
    'GET /getSurplusUDID': fn_getSurplusUDID,
    'GET /getUDIDInfoListAdmin': fn_getUDIDInfoListAdmin,
    'POST /changeUDIDStatuAdmin': fn_changeUDIDStatuAdmin,

};