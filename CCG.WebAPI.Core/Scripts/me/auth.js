//init tokenkey
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(top.auth.tokenKey, gettokenKey);
}

$(function () {
    //init top basegody define
    top.auth.rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    top.auth.setLoginhref = top.auth.remoteLoginUrl + "?redirectUrl=" + top.auth.topcurrUrl + "&domain=" + top.users.domain + "&userid=" + top.users.userid;

    //get tokenkey
    var token = sessionStorage.getItem(top.auth.tokenKey);

    avalon.log(token);

    if (token) {
        top.auth.headers.Authorization = 'Bearer ' + token;
    } else {
        // avalon.log(sethref);
        top.location.href = encodeURI(top.auth.setLoginhref);

    }
    avalon.log("auth:25");
    avalon.log(top.auth);
    avalon.log(top.users);

    $.ajax({
        type: 'GET',
        url: encodeURI(top.auth.apiGetvUserInfoRoles),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: top.auth.headers
    }).done(function (data) {
        avalon.log("auth:token is success.");
    }).error(showerrAuth);
                     
    //test get manageinfo
    //?returnUrl={returnUrl}&generateState={generateState}
    $.ajax({
        type: 'GET',
        url: encodeURI(top.loginApi.rooturl+ top.loginApi.apiUriManageInfo + '?returnUrl=/&generateState=false'),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: top.auth.headers
    }).done(function (data) {
        avalon.log("auth manage:44");
        avalon.log(data);
        //self.result(data);
    }).fail(function (err) {
        //showError
        avalon.log(err);
    });
})

function showerrAuth(err) {

    //avalon.log(this);
    avalon.log(err);

    //alert(err.status);

    switch (err.status) {
        case 0:
            return;
            break;
        case 401:
            avalon.log(messages.n5);
            top.location.href = encodeURI(top.auth.setLoginhref + "&msg=" + messages.n5);
            break;
        case 404:
            avalon.log("this URL:" + this.url + " was not found.Please check that.");
            return;
            break;
        default:

    }
    //{Message:'',responseText:[],responseJSON}

    if (!err.responseJSON) {
        return;
    }

    var vdata = err.responseJSON;//JSON.parse(err.responseText);//   

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