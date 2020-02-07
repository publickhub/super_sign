
var aliyunOSS = require('../unit/aliyunOSS')
var ObsClient = require('esdk-obs-nodejs');

var config = require('../config/config.js')

var obsClient = new ObsClient({
    access_key_id: config.ossKey,
    secret_access_key: config.ossKeySecret,
    server: config.endPotin
  });
uploadFile();


async function uploadFile() {
    console.log('111')

    obsClient.putObject({
        Bucket: 'xxsign',
        Key: 'testfile.jpg',
        SourceFile: "../www/resignIpa/1.jpg"  // localfile为待上传的本地文件路径，需要指定到具体的文件名
      }, (err, result) => {
        if (err) {
          console.error('Error-->' + err);
          console.log('1233')

        } else {
          console.log('111')
          return (result);
        }
      });
return;
    var beginTime = +new Date();

    var uploadFile = await aliyunOSS.OSSPutFile("testfile.jpg", "../www/resignIpa/1.jpg");
    console.log(uploadFile);
    var endTime = +new Date();
    console.log("上传" + (endTime - beginTime) + "ms");
}
