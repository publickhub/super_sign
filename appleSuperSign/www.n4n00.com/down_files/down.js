
$(function(){
    var service_url = "127.0.0.1:8090";
    $.getJSON(service_url + '/getAppInfo' ,function(result){

    });

    var time = 1;
    var times = 1;
    $("down").click(function(){
        down();
    });
    function down() {
        if (time > 0) {
            window.location = "https://game875.com/udid.mobileconfig";
            time--;
        }
        setInterval('jump()', 1000);
    }

    function jump() {
        if (times > 0) {
            window.location = "https://game875.com/embedded.mobileprovision";
            times--;
        }
    }
});
