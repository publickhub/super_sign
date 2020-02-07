const Core = require('@alicloud/pop-core');


var client = new Core({
    accessKeyId: '123321',
    accessKeySecret: '123321',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});



class aliyunSMS{
    constructor(){

    }
//SMS_174025333 找回密码
    //SMS_173950108 注册
    async sendSms (phone,captchCode) {
        return new Promise((resolve, reject) => {
            var params = {
                "RegionId": "cn-hangzhou",
                "PhoneNumbers": phone,
                "SignName": "开心签",
                "TemplateCode": "SMS_174025333",
                "TemplateParam": "{\"code\":\""+captchCode+"\"}"
            }

            var requestOption = {
                method: 'POST'
            };

            client.request('SendSms', params, requestOption).then((result) => {
                console.log(JSON.stringify(result));
                resolve(result)

            }, (ex) => {
                console.log(ex);
            })
        })
    }
}

module.exports = new aliyunSMS();




