/* File Created: May 5, 2015 */
var users = {
    domain: '',
    dept: '',
    userid: '',
    username: '',
    userrole: '',
    rd_msg: ''
};
//remote host set
//gobal define                                          
var rooturl = '';

//var remoteHost = 'http://127.0.0.1:8081/';     //for develop test
var remoteHost = 'http://127.0.0.1/webapiECNDev/';

var auth = {
    apiGetUserInfoUrl: remoteHost + 'api/Account/UserInfo',
    headers: {},
    remoteLoginUrl: remoteHost + 'Home/Login/',
    setLoginhref: '',
    tokenKey: 'accessToken',
    topcurrUrl: top.location.protocol + '//' + top.location.host + location.pathname//top.location.href;
}
//login of api
var loginApi = {
    apiUri: 'api/domains/getDomains',
    apiUriDomain: 'api/domains/getDomains',
    apiUrionRegister: 'api/Account/Register',
    apiUrionLogout: 'api/Account/Logout',
    apiUrionLogin: 'Token',
    rooturl: rooturl,
    redirectUrl: ''
}

//init users                        
users.domain = GetQueryString('domain') || '';
users.userid = GetQueryString('userid') || '';
users.rd_msg = GetQueryString('msg') || '';

//init loginapi          
loginApi.redirectUrl = GetQueryString('redirectUrl') || '';
