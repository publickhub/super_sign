
const mysql = require('../DBConnet/DB_connet')
const pbRes = require('../unit/publicResponse')

var fn_getRechargeInfo = async (ctx, next) => {

    var
        name = ctx.request.query.account || '',
        beginTime = ctx.request.query.beginTime || '',
        endTime = ctx.request.query.endTime || '',
        pageSize = ctx.request.query.size || '',
        pageNum = ctx.request.query.num || '';

        if(pageSize == ''){
            pageSize = 10;
        }
        if(pageNum == ''){
            pageNum = 1;
        }
    

    var size = await mysql.get_recharge_record_size(name,beginTime,endTime);
    var data = await mysql.get_recharge_record(name,beginTime,endTime,pageSize,pageNum);
    
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
    'GET /getRechargeInfo': fn_getRechargeInfo, 
};