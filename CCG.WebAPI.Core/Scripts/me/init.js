/* File Created: May 5, 2015 */
//remote host set
//gobal define                                          
var currrooturl = '/';

//for develop test                              
//var remoteHost = 'http://localhost:9539/';
//var remoteHost = 'http://localhost/webapicore/';
//var remoteHost = 'http://172.16.122.60/webapicore/';
//tab
var height = 0;

//define users all site page
var users = {
    domain: '',
    dept: '',
    userid: '',
    username: '',
    userrole: [],
    rd_msg: ''
};
//defin auth.js
var auth = {
    apiGetUserInfoUrl: remoteHost + 'api/Account/UserInfo',
    apiGetvUserInfoRoles: remoteHost + 'api/Account/vUserInfoRoles',
    headers: { Authorization: '' },
    remoteLoginUrl: remoteHost + 'Home/Login/',
    setLoginhref: '',
    tokenKey: 'accessToken',
    topcurrUrl: top.location.protocol + '//' + top.location.host + location.pathname//top.location.href;
}

//login of api
var loginApi = {
    apiUri: remoteHost + 'api/domains/getDomains',
    apiUriDomain: remoteHost + 'api/domains/getDomains',
    apiUrionRegister: remoteHost + 'api/Account/Register',
    apiUrionChangePassword: remoteHost + 'api/Account/ChangePassword',
    apiUrionSetPassword: remoteHost + 'api/Account/reSetPassword',
    apiUrionSetnoPassword: remoteHost + 'api/Account/SetPassword',
    apiUriManageInfo: remoteHost + 'api/Account/ManageInfo', //?returnUrl={returnUrl}&generateState={generateState}
    apiUrionLogout: remoteHost + 'api/Account/Logout',
    apiUrionLogs: remoteHost + 'api/domains/saveLogs',
    apiUrionLogin: remoteHost + 'Token',
    rooturl: remoteHost,   //rooturl
    redirectUrl: ''
}
//menu of api
var menusApi = {
    apiUri: remoteHost + 'api/domains/getmenus',
    rooturl: remoteHost
}
var mailApi = {
    apiUrl: remoteHost + 'api/Mail',
    mailDomain: 'cclmotors.com',
    rooturl: remoteHost
}
//mail set
var mailSet =
 {
     id: 0,
     smtpServer: "172.16.10.25",
     portNumber: 25,
     mailname: "",
     mailpasswd: "",
     mailFrom: "notification@ccg.net",
     mailTo: ["xielg@cclmotors.com", "test@cclmotors.com"],
     mailCC: ["xielg@cclmotors.com", "test@cclmotors.com"],
     mailBCC: ["xielg@cclmotors.com"],
     mailSubject: "test mail",
     mailContent: "test mail",
     mailpriority: 0,
     isAnonymous: true
 };
//init users                        
users.domain = (GetQueryString('domain') || '').toUpperCase();
users.userid = GetQueryString('userid') || '';
users.rd_msg = GetQueryString('msg') || '';
//init auth
var gettokenKey = GetQueryString('tokenkey');
if (gettokenKey) {
    sessionStorage.setItem(auth.tokenKey, gettokenKey);
    auth.headers.Authorization = 'Bearer ' + gettokenKey;
}
//init loginapi          
loginApi.redirectUrl = GetQueryString('redirectUrl') || '';
