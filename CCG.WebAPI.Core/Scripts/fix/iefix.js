$(function () {
    //
    $('#browserupdator').fadeIn(800);
    $('#aclose').click(function () {
        $('#browserupdator').fadeOut(800);
    })

    //login
    var tmpwidth = $('#loginbody').width();

    var browser = getBrowserInfo(); //浏览器名字+版本字符串

    var verinfo = (browser + "").replace(/[^0-9.]/ig, "");//版本号

    avalon.log(verinfo);

    if (verinfo < 8) {
        var tmpwindowwidth = $(window).width();
        if ($(this).width() <= 765) {
            $('#domain,#userid,#password,#confirmpassword')
               .width(tmpwidth * 0.75, 0);
        }

        $(window).resize(function () {
            avalon.log($(this).width());
            if ($(this).width() <= 765) {
                $('#domain,#userid,#password,#confirmpassword')
                   .width(tmpwidth * 0.75, 0);
            } else {
                $('#domain,#userid,#password,#confirmpassword')
                 .width(tmpwidth * 0.90, 0);
            }
        });
    }


    //if (verinfo >= 8) {
    //    $('#domain,#userid,#password,#confirmpassword')
    //           .width(tmpwidth * 0.5, 0)
    //} else {
    //    $('#domain,#userid,#password,#confirmpassword')
    //          .width(tmpwidth * 0.85, 0)
    //}

    //$('#domain')
    //    .height(20, 25);
    //$('#userid,#password,#confirmpassword')
    //    .height(15, 25);

})
function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if (agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }

    //firefox
    if (agent.indexOf("firefox") > 0) {
        return agent.match(regStr_ff);
    }

    //Chrome
    if (agent.indexOf("chrome") > 0) {
        return agent.match(regStr_chrome);
    }

    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return agent.match(regStr_saf);
    }

}