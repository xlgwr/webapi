/* File Created: May 5, 2015 */
var users = {
    domain: '',
    userid: '',
    username: '',
    dept: '',
    userrole: ''
};
//remote host set
//gobal define                                          
var rooturl = '';
var remoteHost = 'http://172.16.122.61/webapiECNDev/';
var rmSet = {
    apiGetUserInfoUrl: remoteHost + 'api/Account/UserInfo',
    headers: {},
    remoteLoginUrl: remoteHost + 'Home/Login/',
    setLoginhref: '',
    tokenKey: 'accessToken',
    topcurrUrl: top.location.protocol + '//' + top.location.host + location.pathname//top.location.href;
}
var loginApi = {
    apiUri: 'api/domains/getDomains',
    apiUriDomain: 'api/domains/getDomains',
    apiUrionRegister: 'api/Account/Register',
    apiUrionLogout: 'api/Account/Logout',
    apiUrionLogin: 'Token',
    rooturl: rooturl
}
//custom function
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}