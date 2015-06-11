$(function () {
    //
    $('#browserupdator').fadeIn(800);
    $('#aclose').click(function () {
        $('#browserupdator').fadeOut(800);
    })
    //login
    var tmpwidth = $('#loginbody').width();
    $('#domain,#userid,#password,#confirmpassword')
        .width(tmpwidth * 0.85, 0)
    $('#domain')
        .height(20, 20);
    $('#userid,#password,#confirmpassword')
        .height(0, 30);
})