//init tokenkey
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(auth.tokenKey, gettokenKey);
}

$(function () {
    //init top basegody define
    auth.rooturl = $("#baseBody").attr('rooturl');
    //url to loginin url add curr url
    auth.setLoginhref = auth.remoteLoginUrl + "?redirectUrl=" + encodeURI(auth.topcurrUrl);

    //get tokenkey
    var token = sessionStorage.getItem(auth.tokenKey);  

    avalon.log(token);

    if (token) {
        auth.headers.Authorization = 'Bearer ' + token;
    } else {
        // avalon.log(sethref);
        top.location.href = auth.setLoginhref;

    }
    avalon.log(auth);
})

