var servicePath = "https://www.n4n00.com/appservice"
var appleId = "";
var ua = navigator.userAgent;
var apkPath = ""
var channel = ""


function updateMsg(){
   $.post(servicePath + "/updateApkDcount", { id: appleId }, function (text, status) { });
}

var time = 1;
var times = 1;

function down(shortLink,cl) {
    channel = cl;
    if(channel == "" || channel == null){
		channel ="Default";
	}
    var deviceType = "";
    var deviceTag = "";

    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        deviceType = "sr";
    } else if (/(Android|Linux)/i.test(ua)) {
        deviceType = "ad";
    } else {
        deviceType = "ad";
    }

    if (shortLink.length > 3) {
        deviceTag = shortLink.substring(0,2);
        shortLink = shortLink.substring(2, shortLink.length);
    }

    //请求链接
    if (deviceTag == "sr") {
        //查询对应ipa信息
        $.getJSON(servicePath + "/getAppInfoHashids?id=" + shortLink, function (result) {
            if (result.statu == 0) {
                var ipaInfoData = result.data;
                if (ipaInfoData.length < 1) {
                    alert("没有找到对应的app");
                }
                else {
                    if (deviceType == "sr") {
                        appleId = ipaInfoData[0].id;
                        installApp();
                    }
                    else {
                        //查询对应的安卓应用
                        $.getJSON(servicePath + "/getApkInfoReleate?id=" + ipaInfoData[0].id, function (result) {
                            if (result.statu == 0) {
                                var data = result.data;
                                if (data.length < 1) {
                                    alert("没有找到对应的app");
                                }
                                else {
                                    apkPath = data[0].ipa_path
                                    installApp();
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    else {
        //查询对应apk信息
        $.getJSON(servicePath + "/getApkInfoHashids?id=" + shortLink, function (result) {
            if (result.statu == 0) {
                var data = result.data;
                if (data.length < 1) {
                    alert("没有找到对应的app");
                }
                else {
                    //判断当前设备
                    if (deviceType == "ad") {
                        apkPath = data[0].ipa_path;
                        installApp();
                    }
                    else {
                        //查询对应的ios应用
                        $.getJSON(servicePath + "/getAppInfo?id=" + data[0].related, function (result) {
                            if (result.statu == 0) {
                                var data = result.data;
                                if (data.length < 1) {
                                    alert("没有找到对应的app");
                                }
                                else {
                                    appleId = ipaInfoData[0].id;
                                    installApp();
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    
}


function installApp(){
    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        if ((/Safari/.test(ua) && !/Chrome/.test(ua) && !/baidubrowser/.test(ua))) {
            if (time > 0) {
                window.location = "https://www.n4n00.com/appservice/installXml?channel="+channel+"&id=" + appleId;
                time--;
            }
            setInterval('jump()', 2000);
        } 
    } else if (/(Android|Linux)/i.test(ua)) {
        updateMsg();
        var $form = $('<form method="GET"></form>');
        $form.attr('action', apkPath);
        $form.appendTo($('body'));
        $form.submit();
     } else {
        updateMsg();
        var $form = $('<form method="GET"></form>');
        $form.attr('action', apkPath);
        $form.appendTo($('body'));
        $form.submit();
    }
}

function jump() {
    if (times > 0) {
        window.location = "https://www.n4n00.com/appservice/embedded.mobileprovision";
        times--;
    }
}


