
const pbRes = require('../unit/publicResponse')
const os = require('os');
const mysql = require('../DBConnet/DB_connet')

var fn_sysInfo = async (ctx, next) => {
    var resData = [
        {
            id:1,
            name:'处理器架构',
            arg:os.arch()	
        },
        {
            id:2,
            name:'cpu信息',
            arg:os.cpus()[0].model + '*' + os.cpus().length
        },
        {
            id:3,
            name:'字节顺序',
            arg:os.endianness()	
        },
        {
            id:4,
            name:'空闲内存字节',
            arg: (parseInt(os.freemem())/1000/1000).toFixed(2) + 'MB'	
        },
        {
            id:5,
            name:'操作系统主机名',
            arg:os.hostname()	
        },
        {
            id:6,
            name:'系统最近5、10、15分钟的平均负载',
            arg:'5分钟 ->' + os.loadavg()[0].toFixed(2) +'%  ' + '10分钟 ->' + os.loadavg()[1].toFixed(2) +'%  ' + '15分钟 ->' + os.loadavg()[2].toFixed(2) +' %  '	
        },
        {
            id:7,
            name:'操作系统版本',
            arg:os.release()	
        },
        {
            id:8,
            name:'系统总内存',
            arg: (parseInt(os.totalmem())/1000/1000).toFixed(2) + 'MB'	
        },
        {
            id:9,
            name:'计算机正常运行时间',
            arg:os.uptime()	
        },
    ]    
    ctx.response.body = pbRes.resoponeSuccess(ctx,resData);
};

var fn_getSysConfig = async (ctx, next) => {
    var data = await mysql.get_sys_config_info();

    ctx.response.body = pbRes.resoponeSuccess(ctx,data[0]);
};

var fn_updateSysCoinConfig = async (ctx, next) => {
    var coin_name = ctx.request.body.coin_name || '',
        coin_to_udid = ctx.request.body.coin_to_udid || '',
        coin_to_resign = ctx.request.body.coin_to_resign || '',
        coin_to_update = ctx.request.body.coin_to_update || '',
        coin_to_dcount = ctx.request.body.coin_to_dcount || '';

    var data = await mysql.update_sys_coin_config_info(coin_name,coin_to_udid,coin_to_resign,coin_to_update,coin_to_dcount);
    ctx.response.body = pbRes.resoponeSuccess(ctx,data);
};

var fn_updateSysUsConfig = async (ctx, next) => {
    var kf_qq_info = ctx.request.body.kf_qq_info || '',
        kf_weixin_info = ctx.request.body.kf_weixin_info || '',
        kf_phone_info = ctx.request.body.kf_phone_info || '';

    var data = await mysql.update_sys_us_config_info(kf_qq_info,kf_weixin_info,kf_phone_info);
    ctx.response.body = pbRes.resoponeSuccess(ctx,data);
};


module.exports = {
    'GET /getSysInfo': fn_sysInfo,
    'GET /getSysConfig': fn_getSysConfig,
    'POST /updateSysCoinConfig': fn_updateSysCoinConfig,
    'POST /updateSysUsConfig': fn_updateSysUsConfig

};