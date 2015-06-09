﻿//init tokenkey
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(auth.tokenKey, gettokenKey);
}

$(function () {
    //init top basegody define
    auth.rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    auth.setLoginhref = auth.remoteLoginUrl + "?redirectUrl=" + auth.topcurrUrl + "&domain=" + top.users.domain + "&userid=" + top.users.userid;

    //get tokenkey
    var token = sessionStorage.getItem(auth.tokenKey);

    avalon.log(token);

    if (token) {
        auth.headers.Authorization = 'Bearer ' + token;
    } else {
        // avalon.log(sethref);
        top.location.href = encodeURI(auth.setLoginhref);

    }
    avalon.log("auth:");
    avalon.log(auth);
    avalon.log(top.users);

    $.ajax({
        type: 'GET',
        url: encodeURI(auth.apiGetUserInfoUrl),
        headers: auth.headers
    }).done(function (data) {
        avalon.log("auth:token is success.");
    }).error(showerrAuth);

})

function showerrAuth(err) {

    //avalon.log(this);
    avalon.log(err);

    switch (err.status) {
        case 401:
            avalon.log(messages.n5);
            top.location.href = encodeURI(auth.setLoginhref + "&msg=" + messages.n5);
            break;
        case 404:
            avalon.log("this URL:" + this.url + " was not found.Please check that.");
            return;
            break;
        default:

    }
    //{Message:'',responseText:[],responseJSON}
    var vdata = err.responseJSON//JSON.parse(err.responseText);

    //avalon.log(vdata);

    //{error:'',error_description:''}
    if (vdata.error) {
        avalon.log(vdata.error + "<br/>" + vdata.error_description);
    }
    //{Message:'',ModelState:[]}
    if (vdata.Message) {
        //ModelState              
        var errarr = [];
        var icount = 1;

        if (vdata.ModelState) {
            for (var i in vdata.ModelState) {
                errarr.push(icount + "." + vdata.ModelState[i][0]);
                icount++;
            }
            avalon.log(vdata.Message + "<br/>" + errarr.join("<br/><br/>"));
        } else {
            avalon.log(vdata.Message)
        }

    }


}