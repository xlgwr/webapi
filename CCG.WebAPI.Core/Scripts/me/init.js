/* File Created: May 5, 2015 */
//remote host set
//gobal define                                          
var rooturl = '/';
//var remoteHost = 'http://localhost:9539/';     //for develop test
var remoteHost = 'http://localhost/webapicore/';
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
    apiUri: 'api/domains/getDomains',
    apiUriDomain: 'api/domains/getDomains',
    apiUrionRegister: 'api/Account/Register', 
    apiUrionChangePassword: 'api/Account/ChangePassword',
    apiUrionChangePassword: 'api/Account/SetPassword',
    apiUrionLogout: 'api/Account/Logout',  
    apiUrionLogs: 'api/domains/saveLogs',
    apiUrionLogin: 'Token',
    rooturl: rooturl,
    redirectUrl: ''
}
//menu of api
var menusApi = {
    apiUri: 'api/domains/getmenus',
    rooturl: rooturl
}
var mailApi = {
    apiUrl: 'api/Mail',
    mailDomain: 'cclmotors.com',
    rooturl: rooturl
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
