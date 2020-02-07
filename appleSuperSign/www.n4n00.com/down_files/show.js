$(document).ready(function () {
    onCreate();

    $('.open-btn').on('click', function () {
        var $this = $(this);
        if ($this.html() == '展开') {
            $this.html('收起');
            $('.comment-con,.information-box').removeClass('hidden');
        } else {
            $('.comment-con,.information-box').addClass('hidden');
            $this.html('展开');
        }


    })

    var copyBtn = new ClipboardJS('#copy-btn');
    copyBtn.on('success', function (e) {
        alert('链接复制成功，快去打开吧~');
        $('.safari-tips').hide();
    });
    copyBtn.on('error', function (e) {
        console.log(e);
    });
    $('.copy-url input').val(location.href)


})


var servicePath = "https://www.n4n00.com/appservice"
var appleId = "";
var ua = navigator.userAgent;
var apkPath = ""

function stopVideo() {
    $('.playvideo').hide();
    $('#modelView').hide();
}

function playVideo() {
    $('.playvideo').show();
    $('#modelView').show();

    zymedia('video', { autoplay: true, preload: 'auto', videoWidth: '250px', videoHeight: ' 541.761px', aspectRation: '(2 / 1)' });
}

function onCreate() {
    $('.no_safar').hide();
    var deviceType = "";
    var deviceTag = "";
    var id = window.location.pathname;
	




    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        deviceType = "sr";
        if ((/Safari/.test(ua) && !/Chrome/.test(ua) && !/baidubrowser/.test(ua))) {

        } else {
            var ual = ua.toLowerCase();
            var isWeixin = ual.indexOf('micromessenger') != -1;
            if (isWeixin) {
                $('.mask').show();
                $("html").add("body").css({
                    "overflow": "hidden"
                })
            } else {
                $('.safari-tips').show();
            }
        }
    } else if (/(Android|Linux)/i.test(ua)) {
        deviceType = "ad";
    } else {
        deviceType = "ad";
    }

    if (id.length > 3) {
        deviceTag = id.substring(1, 3);
        id = id.substring(3, id.length);
    }

    //请求链接
    if (deviceTag == "sr") {
        //查询对应ipa信息
        $.getJSON(servicePath + "/getAppInfoHashids?id=" + id, function (result) {
            if (result.statu == 0) {
                var ipaInfoData = result.data;
                if (ipaInfoData.length < 1) {
                    showPcBox();
                }
                else {
                    //判断当前设备
                    initPcBox(ipaInfoData);
                    if (deviceType == "sr") {
                        initView(ipaInfoData)
                    }
                    else {
                        //查询对应的安卓应用
                        $.getJSON(servicePath + "/getApkInfoReleate?id=" + ipaInfoData[0].id, function (result) {
                            if (result.statu == 0) {
                                var data = result.data;
                                if (data.length < 1) {
                                    showPcBox();
                                }
                                else {
                                    initView(data)
                                    apkPath = data[0].ipa_path
                                }
                            }
                            else
                            {
                                window.location = "/error.html?msg=" + escape(result.message)
                            }
                        });
                    }
                }
            }
        });
    }
    else {
        //查询对应apk信息
        $.getJSON(servicePath + "/getApkInfoHashids?id=" + id, function (result) {
            if (result.statu == 0) {
                var data = result.data;
                if (data.length < 1) {
                    showPcBox();
                }
                else {
                    //判断当前设备
                    initPcBox(data);
                    if (deviceType == "ad") {
                        apkPath = data[0].ipa_path
                        initView(data)
                    }
                    else {
                        //查询对应的ios应用
                        $.getJSON(servicePath + "/getAppInfo?id=" + data[0].related, function (result) {
                            if (result.statu == 0) {
                                var data = result.data;
                                if (data.length < 1) {
                                    showPcBox();
                                }
                                else {
                                    initView(data)
                                }
                            }
                        });
                    }
                }
            }
            else
            {
                window.location = "/error.html?msg=" + escape(result.message)
            }
        });
    }
}

function initPcBox(data) {
    $("#pc-box-title").text(data[0].app_name);
    $("#pc-box-img").attr("src", data[0].icon_base64);
}

function showPcBox() {
    $("#app").hide();
    $(".pc-box").show();
}

function updateMsg(){
   $.post(servicePath + "/updateApkDcount", { id: appleId }, function (text, status) { });
}

function initView(data) {
    var appInfo = data[0];
    appleId = appInfo.id;
    var appName = appInfo.app_name;
    var iconData = appInfo.icon_base64;
    $("#apple_title").text(appName);
    $("#app-icon").attr("src", iconData);
    var banner = $.parseJSON(appInfo.introduce_image);
    if (banner == null) {
        $(".intro-swiper").hide = true
    }
    else {
        var htmlTmp = "";
        for (var i = 0; i < banner.length; i++) {
            var item = banner[i];
            if (i == 0) {
                htmlTmp += '<div class="swiper-slide swiper-slide-active">' +
                    '<img src="' + item.url + '" alt=""></div>';
            }
            else if (i == 1) {
                htmlTmp += '<div class="swiper-slide swiper-slide-next">' +
                    '<img src="' + item.url + '" alt=""></div>';
            } else {
                htmlTmp += '<div class="swiper-slide">' +
                    '<img src="' + item.url + '" alt=""></div>';
            }
        }
        $("#intro-swiper").append(htmlTmp)

        var swiper = new Swiper('.imgs-box', {
            scrollbar: '.imgs-box .swiper-scrollbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            grabCursor: true
        });
    }

    var introduce = appInfo.introduce;
    if (introduce == null) {
        $("#introInfo").text("无")
    }
    else {
        $("#introInfo").text(introduce)
    }

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var time = 1;
var times = 1;

function down() {
	var channel = window.GetQueryString("channel");
	if(channel == null){
		channel ="Default";
	}
    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        if ((/Safari/.test(ua) && !/Chrome/.test(ua) && !/baidubrowser/.test(ua))) {
            if (time > 0) {
                window.location = "https://www.n4n00.com/appservice/installXml?channel="+channel+"&id=" + appleId;
                time--;
            }
            setInterval('jump()', 2000);
        } else {
            var ual = ua.toLowerCase();
            var isWeixin = ual.indexOf('micromessenger') != -1;
            if (isWeixin) {
                $('.no_safar').show();
                $("html").add("body").css({
                    "overflow": "hidden"
                })
            } else {
                $('.safari-tips').show();
            }
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


