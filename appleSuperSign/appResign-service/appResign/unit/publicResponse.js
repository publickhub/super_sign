
var pool  = {};

class pbResponese {
    constructor () {

    }

    resoponeError (status,ctx,code,info,data) {
        var msg = '';
        switch (code) {
            case 901: msg = '请求错误'; break
            case 902: msg = '未授权，请登录'; break
            case 903: msg = '拒绝访问'; break
            case 904: msg = '请求地址出错'; break
            case 905: msg = '账号或密码错误'; break

            default:  msg = info;break
        }
        return  JSON.stringify({
            code:code,
            msg:msg,
            data: data
        });
    };


    resoponeSuccess (ctx,data) {

        return JSON.stringify({
            code:0,
            msg:'操作成功',
            data: data
        });

    };

}

module.exports = new pbResponese()