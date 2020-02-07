
var oss = require('ali-oss');
var ObsClient = require('esdk-obs-nodejs');

var config = require('../config/config.js')

var obsClient = new ObsClient({
  access_key_id: config.ossKey,
  secret_access_key: config.ossKeySecret,
  server: config.endPotin
});

var store = new oss({
  region: config.region,
  accessKeyId: config.ossKey,
  accessKeySecret: config.ossKeySecret,
  bucket: config.bucket,
  secure: config.secure
});

class aliyunOSS {
  constructor() {

  }

  async OSSPutFile(fileName, filePath) {
    try {
      let result =await this.upload(fileName, filePath)
      return (result);
    } catch (e) {
      console.log(e);
      return (e)
    }
  }

   upload(fileName, filePath) {
    return new Promise(function (resolve, reject) {
      obsClient.putObject({
        Bucket: 'xxsign',
        Key: fileName,
        SourceFile: filePath  // localfile为待上传的本地文件路径，需要指定到具体的文件名
      }, (err, result) => {
        if (err) {
          resolve (err);


        } else {
          resolve (result);
        }
      });

    });
}


  async OSSGetFilePath(fileName, filePath) {
    try {

      let url = await store.signatureUrl(fileName);

      console.log(url);

      return (url);
    } catch (e) {
      console.log(e);
      return (e)
    }

  };
}

module.exports = new aliyunOSS();