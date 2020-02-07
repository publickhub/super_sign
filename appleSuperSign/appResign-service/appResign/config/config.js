const config = {
    // 启动端口
    port: 8090,
  
    database: {
      DATABASE: 'app_sr_test',
      USERNAME: 'app_sr_test',
      PASSWORD: 'YtG2Lk6Bii8KHCyb',
      PORT: '3306',
      HOST: '39.108.136.185'
    },
     serviceUrl:'https://www.n4n00.com',//服务器地址

    defualt_ex_time:30, //默认过期时间30天
    default_max_udid:10,//默认单应用最大udid
    //oss配置项
    ossKey:'DDGM7TGAAFBJTXPDFQUP',
    ossKeySecret:'dfC8yPKPNc5bsnivEHwuj7yX1VYeBNzCh4svTo59',
    region:'oss-cn-shenzhen',
    bucket:'xxsign',
    secure:'true',
    ossDomain:'https://xxsign.obs.cn-south-1.myhuaweicloud.com/',
    endPotin:'obs.cn-south-1.myhuaweicloud.com'
  };


  module.exports = config;

