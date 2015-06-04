//gobal define
if (!tokenKey) {
    var tokenKey = 'accessToken';
}
var rooturl = '';
var setLoginhref = '';
var topcurrUrl = top.location.href;

var apiGetUserInfoUrl = 'api/Account/UserInfo';
var redirLogin = 'Home/Login/';


$(function () {
    //init top basegody define
    rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    setLoginhref = 'http://' + top.location.hostname + rooturl + redirLogin + "?redirectUrl=" + encodeURI(topcurrUrl);  

    //get tokenkey
    var token = sessionStorage.getItem(tokenKey);
    var headers = {};

    avalon.log(token);

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    } else {
        // avalon.log(sethref);
        top.location.href = setLoginhref;

    }
    avalon.log(headers);

    var tmpurl = rooturl + apiGetUserInfoUrl; //"api/values/1";
    $.ajax({
        type: 'GET',
        url: tmpurl,
        headers: headers
    }).done(function (data) {
        avalon.log(data);
        $('#lUserID').text(data.Email);
        //self.result(data);
    }).fail(function (err) {
        //showError
        avalon.log(err);
    });
})

