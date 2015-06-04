//gobal define
if (!tokenKey) {
    var tokenKey = 'accessToken';
}
var rooturl = '';
var topcurrUrl = top.location.href;

var apiGetUserInfoUrl = 'api/Account/UserInfo';
var redirLogin = 'Home/Login/';

$(function () {
    //init top basegody define
    rooturl = $("#baseBody").attr('rooturl');
    //get curr url
    //get userinfo api use tokenKey     

    var token = sessionStorage.getItem(tokenKey);
    var headers = {};

    avalon.log(token);

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    } else {
        //url to loginin url add curr url
        var sethref = 'http://' + top.location.hostname + rooturl + redirLogin + "?redirectUrl=" + encodeURI(topcurrUrl);
        // avalon.log(sethref);
        top.location.href = sethref;

    }
    avalon.log(headers);

    var tmpurl = rooturl + apiGetUserInfoUrl; //"api/values/1";
    $.ajax({
        type: 'GET',
        url: tmpurl,
        headers: headers
    }).done(function (data) {
        avalon.log(data);
        //self.result(data);
    }).fail(function (err) {
        //showError
        avalon.log(err);
    });
})
