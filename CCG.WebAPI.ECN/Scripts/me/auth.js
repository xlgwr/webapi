﻿//gobal define

if (!tokenKey) {
    var tokenKey = 'accessToken';
}

var rooturl = '';
var setLoginhref = '';
var topcurrUrl = top.location.protocol + '//' + top.location.host + location.pathname;//top.location.href;

var remoteHost = 'http://172.16.122.61/webapiECNDev/'
var apiGetUserInfoUrl = remoteHost + 'api/Account/UserInfo';
var remoteLoginUrl = remoteHost + 'Home/Login/';
//init tokenkey
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(tokenKey, gettokenKey);
}

$(function () {


    //init top basegody define
    rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    setLoginhref = remoteLoginUrl + "?redirectUrl=" + encodeURI(topcurrUrl);

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

    $.ajax({
        type: 'GET',
        url: apiGetUserInfoUrl,
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
