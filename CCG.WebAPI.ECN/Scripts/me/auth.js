//init tokenkey
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(rmSet.tokenKey, gettokenKey);
}

$(function () {
    //init top basegody define
    rmSet.rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    rmSet.setLoginhref = rmSet.remoteLoginUrl + "?redirectUrl=" + encodeURI(rmSet.topcurrUrl);

    //get tokenkey
    var token = sessionStorage.getItem(rmSet.tokenKey);  

    avalon.log(token);

    if (token) {
        rmSet.headers.Authorization = 'Bearer ' + token;
    } else {
        // avalon.log(sethref);
        top.location.href = rmSet.setLoginhref;

    }
    avalon.log(rmSet);
})

